/*
 *  Keep details of the Element being displayed
 *  in the properties pane.
 */
//import { sanitizeLayout, safeJson } from '~/lib/Tooltwist.js'
// import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from '../lib/hierarchy'

//export const namespaced = true


const CLEAN = ''
const DIRTY = 'waiting to save'
const SAVING = 'saving'
const SAVED = 'your changes have been saved'
const ERROR = 'warning: your changes have not been saved'
const SAVE_INTERVAL = 2000

// Handle returned by setTimeout.
let saveTimer = null

// initial state
//export const state = () => ({
export const state = () => {
  return {
    // Edit mode
    mode: 'view', // { view | edit | layout | debug }}
    previousEditMode: 'edit',
    extraDebug: false,
    dragging: false,

    // An element from Crowdhound with the layout as JSON in the description field.
    // This is only set if we were given an anchor.
    // If it is null we don't save here.
    anchor: null,
    crowdhoundElement: null,

    // Currently loaded layout.
    // = hierarchy of element Objects
    layout: null,

    // Element currently being edited
    // = element Object
    //propertyElement: null,
    pathToSelectedElement: [ ], // elements, from root to currently selected element

    // Element with properties being shown.
    // This will be within 'pathToSelectedElement'
    expandedElement: null,

    // Message shown at top of screen
    selectError: '',
    saveMsg: CLEAN,

    // Triple pane stuff
    showLeftPane: true,
    showRightPane: true,

    // Refresh is activated by incrementing a counter
    refreshCounter: 1
  }
}
//})

/********************************************
 *
 *                 GETTERS
 *
 ********************************************/
export const getters = {

  propertyElement: (state) => {
    if (state.pathToSelectedElement) {
      let len = state.pathToSelectedElement.length
      let element = (len > 0) ? state.pathToSelectedElement[len - 1] : null
      console.log(`propertyElement=`, element)
      return element
    }
    return null
  },

  layoutAsJson: (state) => {
    return safeJson(state.layout, false/*not compressed*/)
    // let json = JSON.stringify(state.layout, jsonReplacerCallback, 4);
    // return json;
  },


  propertyElementAsJson: (state) => {
    if (state.pathToSelectedElement && state.pathToSelectedElement.length > 0) {
      let element = state.pathToSelectedElement[state.pathToSelectedElement - 1]
      return safeJson(element, false/*not compressed*/)
    }
    return null
  },

}


/********************************************
 *
 *                 ACTIONS
 *
 ********************************************/
// see https://vuex.vuejs.org/guide/actions.html
export const actions = {

  setContent ({ commit, state }, { vm, type, layout, anchor}) {
    console.log(`In Action contentLayout/setContent(type=${type}, layout=${layout?'yes':'no'}, anchor=${anchor})`)
    if (layout) {
      commit('setLayout', { vm, layout: layout, crowdhoundElement: null, editable: false })
    } else if (anchor) {
      loadLayoutFromAnchor(commit, vm, anchor)
    } else {
      console.error(`Action contentLayout/setContent should be passed either anchor or layout`)
    }
  },


  // Delete an element from the current layout.
  deleteElementAction({ commit, state }, { vm, element}) {
    console.log('Action contentLayout/deleteElementAction()', element)

    // Ok, let's do it
    commit('deleteElementMutation', { vm, element })

    // Start the timer, to save after a short delay
    rememberToSave(commit, state, vm)
  },
  // insertChildAction', { vm: this, element, child: newchild, position: -1 })

  insertLayoutAction({ commit, state }, { vm, parent, position, layout}) {
    console.log('Action contentLayout/insertLayoutAction()', parent, position, layout)
    console.log(`state=`, state)

console.log(`ok 1`)
    let data
    switch (typeof(layout)) {
      case 'string':

        // Parse the layout
        console.log(`ok 1a`)
        try {
          data = JSON.parse(layout);
          console.log(`ok 1b`)
        } catch(e) {
          console.log(`ok 1c`)
          console.error('Error while pasting:', e);
          console.log(`ok 1d`)
          return handleError(vm, `Invalid paste object (not JSON).`)
        }
        break;

      case 'object':
      console.log(`ok 1e`)
        data = layout
        break;

      default:
        return handleError(`Invalid paste object`)
    }
    console.log(`ok 2`)
    console.log(`data=`, data)

    // Do basic checks, to ensure something unrelated isn't being pasted
    if (data.type !== 'contentservice.io') {
      return handleError(`Invalid paste object (not from contentservice.io).`)
    }
    console.log(`ok 3`)

    // Check the data, according to the version
    let toInsert
    if (data.version === '1.0') {

      // Check it complies to version 1.0
      if (typeof(data.layout) === 'undefined') {
        return handleError(`Invalid paste object (missing layout).`)
      }
      toInsert = data.layout
    } else {
      return handleError(`Invalid paste object (unknown version ${data.version}).`)
    }
    console.log(`ok 4`)

    // Check we have all the required dependencies
    //ZZZZ

    console.log(`Will insert `, toInsert)
    console.log(`Position is`, position)

    // Ok, let's do it
    commit('insertLayoutMutation', { vm, parent, position, layout: toInsert })

    // Start the timer, to save after a short delay
    rememberToSave(commit, state, vm)
  },


  // setPropertyElement ({ commit }, { element }) {
  //   console.log(`setPropertyElement(${element.id})`)
  //   commit(types.SET_PROPERTY_ELEMENT, { element })
  // },
  setProperty ({ commit, state }, { vm, element, name, value }) {
    console.log(`action setProperty(${element.id}, ${name}, ${value})`)

    /*
     *  Two possibilities here:
     *    1. We are trying to update a fixed layout - error.
     *    2. We are updating an element within a layout - save the layout.
     */
    // Check that we are updating an element in a layout that is being edited.
    if (state.crowdhoundElement === null) {
      // Should not be trying to update this.
    }

    commit('updateElementProperty', { vm, element, name, value })

    //ZZZZ Timer should probably be set in the mutation?
    // There is a potential timing problem.
    // - the commit might not be instantaneous (is that correct), so
    // a timeout created here might run before the commit occurs.
    commit('setSaveMsg', { msg: DIRTY })

    // Start the timer, to save after a short delay
    rememberToSave(commit, state, vm)
  },

}




/********************************************
 *
 *                 MUTATIONS
 *
 ********************************************/
export const mutations = {

  // Set the current layout, displayed in the middle panel.
  setLayout (state, { vm, layout, anchor, crowdhoundElement, /*tenant, elementId, */ editable /*, element */ } ) {
    //console.log('In Mutation contentLayout/setLayout()', state)
    console.log('In Mutation contentLayout/setLayout()', layout)

    if (layout) {
      state.layout = addAnyMissingValues(vm, layout)
      console.log(`sanitized layout:`, state.layout)
      state.crowdhoundElement = crowdhoundElement
    } else {
      console.error(`Mutation contentLayout/setLayout requires 'layout' parameter`)
      state.layout = null
      state.anchor = null
      state.crowdhoundElement = null
      state.editable = false

      // Hack
      if (element) {
        console.error(`We do have 'element'`)
      }
      return
    }

    if (crowdhoundElement) {
      state.crowdhoundElement = crowdhoundElement
      state.anchor = anchor
    } else {
      state.crowdhoundElement = null
      state.anchor = null
    }

    if (editable) {
      state.editable = editable
    } else {
      state.editable = false
    }
  },

  // Set the element shown in the properties panel.
  // This *should* be an element in the current layout
  setPropertyElement (state, { element } ) {
    console.log('In Mutation contentLayout/setPropertyElement()', element)
    //return
    // console.log('State is ', state)
    // Clone the element
    //let duplicate = JSON.parse(JSON.stringify(data.element));
    // console.log(`Before`)
    // state.propertyElement = element
    //console.log(`After`)

    // console.log(`LOOKING FOR ${element.id}`)
    let path = trackDownElementInLayout(state, element.id)
    //console.log(`path to selected element=`, path)
    state.pathToSelectedElement = path ? path : [ ]
    state.expandedElement = path ? path[path.length-1] : null

    console.log(`Path to selected element=`, path)
    path.forEach((element) => {
      console.log(`  ${element.type}: ${element.id}`)
    })
  },

  // Set the element currently expanded in the properties panel.
  // This *must* be an element in pathToSelectedElement.
  setExpandedElement (state, { element } ) {
    console.log('In Mutation contentLayout/setPropertyElement()', element)
    //return
    // console.log('State is ', state)
    // Clone the element
    //let duplicate = JSON.parse(JSON.stringify(data.element));
    // console.log(`Before`)

    // Check this element is in the path to the current property element.
    for (let i = 0; i < state.pathToSelectedElement.length; i++) {
      if (state.pathToSelectedElement[i].id === element.id) {
        // Found it
        state.expandedElement = element
        return
      }
    }
    console.error(`setExpandedElement: element not in pathToSelectedElement`)
  },

  // Set the screen mode [view | edit | layout | debug]
  setEditMode (state, { mode, previousEditMode }) {
    //ZZZZ Check the parameters
    // console.log(`mutation contentLayout/setEditMode(${mode}, ${previousEditMode})`)
    state.mode = mode
    if (previousEditMode) {
      state.previousEditMode = previousEditMode
    }
  },

  // Start dragging. This should temporarily switch to layout mode.
  dragStart (state, { }) {
    // console.log(`mutation contentLayout/dragStart()`)
    state.dragging = true
  },
  dragStop (state, { }) {
    // console.log(`mutation contentLayout/dragStop()`)
    state.dragging = false
  },

  // Set the screen mode [view | edit | layout | debug]
  //ZZZZ deprecate this
  setMode (state, { mode }) {
    //ZZZZ Check the parameters
    // console.log(`mutation contentLayout/setMode(${mode})`)
    state.mode = mode
  },

  // Set the message shown above the page (CLEAN | DIRTY | SAVING, etc).
  setSaveMsg (state, { msg }) {
    //ZZZZ Check the parameters
    // console.log(`mutation contentLayout/setSaveMsg(${msg})`)
    state.saveMsg = msg
  },

  // Set the value of a property in an element.
  // The element is not necessarily the 'propertyElement',
  // it *should* be an element in the current layout.
  updateElementProperty (state, { vm, element, name, value }) {
    //ZZZZ Check the parameters
    console.log(`mutation contentLayout/updateElementProperty(${element.id}, ${name}, ${value})`, element)

    // Do this such that a new reactive property is created.
    // https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
    // NOT: element[name] = value
    vm.$set(element, name, value)
  },

  // Clone an element hierarchy and insert it as a child
  // into an element in the current layout.
  // insertChild(state, { vm, element, child, position}) {
  //   console.log('In Mutation contentLayout/insertChild()', element)
  //   console.log('In Mutation insertChild()', child)
  //
  //   //console.log(`insertChild, parent before:`, safeJson(element));
  //   console.log(`insertChild, child:`, safeJson(child));
  //
  //   // Clone the hierarchy (this is the cheat's way)
  //   //let newchild = JSON.parse(JSON.stringify(child));
  //   let newchild = JSON.parse(safeJson(child));
  //
  //   // Overwrite any element IDs
  //   overwriteElementIDs(newchild)
  //
  //   // Check it is sane
  //   // newchild._parent = element //ZZKOP
  //   addAnyMissingValues(vm, newchild)
  //
  //   // Plug it in as a child of the element
  //   // The inserted item will become reactive, because the layout is already reactive.
  //   // See https://vuejs.org/v2/guide/list.html#Array-Change-Detection
  //   if (position >= 0) {
  //     element.children.splice(position, 0, newchild)
  //   } else {
  //     element.children.push(newchild)
  //   }
  //   //console.log(`insertChild, parent after:`, safeJson(element));
  // },

  insertLayoutMutation (state, { vm, parent, position, layout }) {
    console.log('In Mutation contentLayout/insertLayoutMutation()', parent, position, layout)
    //let toInsert = layout

    // if (position === 'last' || position < 0) {
    //   position = parent.children.length
    // }

    // Clone the hierarchy (this is the cheat's way)
    //let newchild = JSON.parse(JSON.stringify(child));
    let toInsert = JSON.parse(safeJson(layout));

    // Before inserting, check we have unique IDs for all elements in the
    // layout. By preference we will retain the IDs, so when a user cuts and
    // pastes any existing references will be retained. However if they copy
    // and paste, we don't want duplicate IDs already in our parent's layout.
    replaceIdsAlreadyInLayout(state, toInsert)

    console.log(`ok 5`)

    // Check it is sane
    addAnyMissingValues(vm, toInsert)

    // For other element types, we insert the actual element.
    if (toInsert.type === 'layout') {
      // If an entire 'layout' is being inserted, we insert the children one by one.
      console.log(`Inserting layout element. ${toInsert.children.length} items.`)

    } else {
      // For non-layout elements, we insert the actual element
      console.log(`Inserting non-layout element: ${toInsert.type} at position ${position}`)
      if (position === 'last' || position < 0) {
        // Add to the end
        parent.children.push(toInsert)
        console.log(`ok 6a`)
      } else if (position <= parent.children.length) {
        // Insert at a specific position
        parent.children.splice(position, 0, toInsert);
        console.log(`ok 6b`)
      } else {
        // Invalid position
        alert('insertLayoutMutation: Internal error #2963 (invalid position)')
        return
      }
    }
  },

  // Delete an element from the current layout.
  deleteElementMutation(state, { vm, element}) {
    console.log(`In Mutation contentLayout/deleteElementMutation(${element.id} (${element.type}))`)

    // Find the path down to this element, so we know the parent.
    let path = trackDownElementInLayout(state, element.id)
    if (path && path.length >= 2) {
      let parent = path[path.length - 2]
      console.log(`Parent is ${parent.id} (${parent.type})`)

      for (let index = 0; index < parent.children.length; index++) {
        if (parent.children[index].id == element.id) {
          // We've found it, so remove it
          console.log(`Found item to delete in position ${index}`)
          parent.children.splice(index, 1)
          return
        }
      }
    }

  },

  // Set the element shown in the properties panel.
  // This *should* be an element in the current layout
  setMode (state, { mode } ) {
    console.log(`In Mutation setMode(${mode})`)
    console.log('State is ', state)

    state.mode = mode
  },

  // Call this method to trigger redrawing of components that monitor
  // the value of 'refreshCounter'.
  refreshMutation (state, { }) {
    console.log('In Mutation refreshMutation()', state.refreshCounter)
    state.refreshCounter++
  }

}//- mutations


// function overwriteElementIDs(element) {
//   element.id = Math.floor(Math.random() * 10000000000)
//   console.log('New Id is ', element.id)
//
//   if (element.children) {
//     element.children.forEach((child) => overwriteElementIDs(child))
//   }
// }


// Prepare a hierarchy of elements that will be used to lay out a page.
function addAnyMissingValues (vm, element) {

  // Create a new element ID, but do not modify an existing ID.
  if (!element.id) {
    vm.$set(element, 'id', Math.floor(Math.random() * 10000000000))
    // console.log('New Id is ', element.id)
  }

  // Make sure we have a 'children' element
  if (!element.children) {
    vm.$set(element, 'children', [ ])
  }

  // Now sanitize any children
  for (let i = 0; i < element.children.length; ) {
    let child = element.children[i]
    if (child) {
      addAnyMissingValues(vm, child)
      i++
    } else {
      // null child?
      // This should not happen, but it does on delete
      // console.error(`Child ${i} of element ${element.id} is null.`)
      // let a1 = element.children[i-1]
      // let a2 = element.children[i]
      // let a3 = element.children[i+1]
      // let l1 = element.children.length
      // console.log(`a1:`, a1)
      // console.log(`a2:`, a2)
      // console.log(`a3:`, a3)
      // console.log(`l1:`, l1)
      element.children.splice(i, 1)
      // let b1 = element.children[i-1]
      // let b2 = element.children[i]
      // let b3 = element.children[i+1]
      // let l2 = element.children.length
      // console.log(`b1:`, b1)
      // console.log(`b2:`, b2)
      // console.log(`b3:`, b3)
      // console.log(`l2:`, l2)
      // i++
    }
  }

  return element
}



function safeJson (element, compressed/*boolean,optional*/) {
  let spaces = (compressed ? 0 : 4)

  // Custom replacer function - gets around "TypeError: Converting circular structure to JSON"
  // Modified from http://www.johnantony.com/pretty-printing-javascript-objects-as-json/
  var replacer = function(key, value) {
    // ignore any circular links (they are circular)
    // if (key === '_parent') {
    //   return
    // }
    return value
  }
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  let json = JSON.stringify(element, jsonReplacerCallback, spaces);

  return json;
}


//ZZKOP
// function ZlayoutRoot (element) {
//   while (element._parent) {
//     element = element._parent
//   }
//   return element
// }

// function ZlayoutChanged (element) {
//   let root = layoutRoot(element)
//   root.tt_counter++
// }

function loadLayoutFromAnchor (commit, vm, anchor, editable) {
  console.log(`store.loadlayout(${anchor})`)

  // We select the content from crowdhound
  //console.log(`ContentTriplePane.loadLayout`)
  if (typeof(vm.$content) === 'undefined') {
    console.error('this.$content not defined. Remember to us Contentservice.use(Vue).')
    return
  }
  if (vm.$content.disabled) {
    console.error('Contentservice disabled')
    return
  }

  let canEdit = false
  if (typeof(editable) === 'undefined') {
    canEdit = true // Default to editable ZZZ
  } else if (editable) {
    canEdit = true
  }

  //- let anchor = '$testpage.text1'
  //let shortAnchor = `$testpage.${this.anchorPrefix}.${this.anchorSuffix}`
  let shortAnchor = anchor.startsWith('$') ? anchor.substring(1) : anchor
  let fullAnchor = `$`  + shortAnchor
  let elementType = 'layout'
  console.error(`>>> anchor is ${anchor}.`)

  //- let params = {
  //-   elementId: anchor,
  //-   withChildren: true
  //- }
  vm.$content.select(this, fullAnchor, elementType)
    //- this.$content.select(this, params)
    .then(result => {
      // Use the elements
      // console.log(`>>> result=`, result)
      if (result.elements.length < 1) {
        // Should not be possible
        console.error(`Selecting layout returned no element. How is this possible?`)
        return
      }

      // See if the description contains a valid layout
      // console.log(`result=`, result)
      let elementContainingLayout = result.elements[0]
      let json = elementContainingLayout.description
      // console.log('json=', json)
      let layout = null
      if (json === shortAnchor) {
        // console.error(`>>> NOT parsing json (it's the anchor)`)
        // New element/layout
      } else {
        // console.error(`>>> parsing JSON`)
        try {
          layout = JSON.parse(json)
        } catch (e) {
          console.error(`Broken JSON: `, e)
          console.log(`json=${json}`)
        }
        // console.log('parsed JSON layout=', layout)
        // Check for errors
      }
      console.log(`>>> layout=`, layout)

      // If we don't already have a layout, create an initial layout now.
      if (layout === null) {

        console.error(`>>> Creating default layout`)

        // Word out a heading, based on the anchor
        let heading = anchor
        if (heading.startsWith('$')) {
          heading = heading.substring(1)
        }
        if (heading.startsWith('page-')) {
          heading = heading.substring(5)
        }
        let arr = heading.split('-')
        heading = ''
        arr.forEach((word, index) => {
          if (index > 0) {
            heading += ' '
          }
          switch (word.toLowerCase()) {
            case 'the':
            case 'to':
            case 'by':
            case 'of':
            case '&':
            case 'and':
            case 'for':
            case 'with':
              // Do not capitalize the word
              heading += word
              break

            default:
              // Capitalise the word
              heading += word.substring(0, 1).toUpperCase() + word.substring(1)
          }
        })

        // Create an initial layout
        layout = {
          type: 'layout',
          children: [
            {
              type: 'section',
              children: [
                {
                  type: 'container',
                  children: [
                    {
                        "type": "froala",
                        "text": `<h1 style=\"text-align: center;\"><span style=\"font-size: 48px;\">${heading}</span></h1>`,
                        "id": 2,
                        "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }

      }

      // Save the layout in our state store.
      let sanitized = addAnyMissingValues(vm, layout)
      commit('setLayout', {
        vm,
        anchor: fullAnchor,
        layout: layout,
        crowdhoundElement: elementContainingLayout, // NOT an element in the layout
        // tenant: elementContainingLayout.tenant,
        // elementId: elementContainingLayout.id,
        editable: canEdit })

    })
    .catch(e => {
      let desc = `Error loading comments`
      console.log(`Dirty rotten error: `, e)
      /* handleError(this, desc, params, e) */
      state.selectError = true
    })//- select
}

// If any of the IDs in the specified element or it's descendants exist
// in our currently-being-edited layout, replace them. This is
// typically used before pasting stuff into the current layout.
function replaceIdsAlreadyInLayout(state, layoutToInsert) {
  console.log(`replaceIdsAlreadyInLayout(element: ${layoutToInsert.id}, elementType: ${layoutToInsert.type})`)

  // Create a hash of all the element IDs already in use
  let ids = getCurrentlyUsedIds(state)
  // console.log(`ids=`, ids)

  // Recursively look at every element and it's children,
  // replacing element Ids that are already used.
  let recurse = (element) => {
    // console.log(`  - check element ${element.id}`)
    let initialId = element.id
    while (ids[element.id]) {
      element.id = Math.floor(Math.random() * 10000000000)
      console.log(`  replacing id of element ${initialId} (${element.type}) -> ${element.id}`)
    }
    if (element.children) {
      element.children.forEach(child => recurse(child))
    }
  }

  // Check, from the top down.
  recurse(layoutToInsert)
}

/*
 *  Create a has of all the element IDs in the current layout.
 *  returns [] of Id -> true
 */
function getCurrentlyUsedIds(state) {
  // console.log(`getCurrentlyUsedIds()`)
  // Recursive through the layout hierarchy, remembering the ids
  let hash = [ ] // id -> true
  let recurse = (element) => {
    // console.log(` - ${element.id}`)
    hash[element.id] = true
    if (element.children) {
      element.children.forEach(child => recurse(child))
    }
  }
  recurse(state.layout)
  return hash
}

/*
 *  We have changes, but we don't want to save every little keystroke.
 *  Delay a few seconds and then save.
 */
function rememberToSave (commit, state, vm) {

  // We'll need to save changes to Crowdhound. Don't save every
  // change, but rather wait a few seconds to batch up changes.
  console.log( `save to Crowdhound (not yet)`)
  //this.crowdhoundElement.description = value
  if (saveTimer) {
    // Already set the timeout to save
  } else {
    // Save after five seconds
    commit('setSaveMsg', { msg: DIRTY })
    //state.saveMsg = DIRTY
    saveTimer = setTimeout(() => {
      // Save the changes
      saveTimer = null
      //state.saveMsg = SAVING
      commit('setSaveMsg', { msg: SAVING })
      //saveToCrowdhound(vm)

      // Squeeze the layout into a single Crowdhound element
      let crowdhoundElement = {
        tenant: state.crowdhoundElement.tenant,
        rootId: state.crowdhoundElement.rootId,
        parentId: state.crowdhoundElement.parentId,
        id: state.crowdhoundElement.id,
        description: safeJson(state.layout, true/*compressed*/)
      }
      console.log(`saveToCrowdhound() in Store`, crowdhoundElement)
      console.log( `safeJson length is ${safeJson(state.layout, true/*compressed*/).length}`)

      // Update the element (should already exist)
      commit('setSaveMsg', { msg: SAVED })

      vm.$content.update(vm, crowdhoundElement)
        .then(result => {
          setTimeout(() => {
            if (state.saveMsg === DIRTY) {
              commit('setSaveMsg', { msg: CLEAN })
            }
          }, 1700)
          console.log(`result of save:`, result)
          console.log(`result of save:`, result.data)
        })
        .catch(e => {
          let desc = `Error saving html content`
          console.log(desc, e)
          //state.saveMsg = ERROR
          commit('setSaveMsg', { msg: ERROR })
          /* handleError(this, desc, params, e) */
          //this.selectError = true
        })//- axios
    }, SAVE_INTERVAL)
  }
}

/*
 *  Display an error message, by whatever means is possible.
 */
function handleError(vm, msg) {
  // alert(msg)
  if (vm && vm.$toast) {
    vm.$toast.open({ message: `${msg}`, type: 'is-danger' })
  } else {
    alert(msg)
  }
  return false
}

/*
 *  Recursively find this element within the current layout.
 *  (We don't use parent links, because it's simpler
 *  if we avoid cyclic links in the hierarchy)
 */
function trackDownElementInLayout(state, requiredID) {
  console.log(`trackDownElementInLayout(state, requiredID:${requiredID})`)
  console.log(`state=`, state)
  console.log(`state.layout=`, state.layout)

  let recurse = (elementInLayout) => {
    console.log(`  - ${elementInLayout.id} (${elementInLayout.type})`)
    if (elementInLayout.id === requiredID) {
      return [ elementInLayout ]
    }
    if (elementInLayout.children) {
      for (let i = 0; i < elementInLayout.children.length; i++) {
        let child = elementInLayout.children[i]
        let path = recurse(child)
        if (path) {
          return [ elementInLayout, ...path]
        }
      }
    }
    return null
  }
  return recurse(state.layout)
}

// function trackDownElement_recursive(elementInLayout, requiredID) {
//   console.log(`  trackDownElement_recursive(${elementInLayout.id}, ${requiredID})`)
//   if (elementInLayout.id === requiredID) {
//     // console.log(`found leaf`, element)
//     return [ elementInLayout ]
//   }
//   for (let i = 0; i < elementInLayout.children.length; i++) {
//     let child = elementInLayout.children[i]
//     let path = trackDownElement_recursive(child, requiredID)
//     if (path) {
//       // console.log(`found child path`, path)
//       return [ elementInLayout, ...path]
//     }
//   }
//   return null
// }

// Function to avoid circular dependencies while "stringify"ing objects to JSON.
// Gets around "TypeError: Converting circular structure to JSON"
// See http://www.johnantony.com/pretty-printing-javascript-objects-as-json/
function jsonReplacerCallback (key, value) {
  // ignore any circular links
  // if (key === '_parent') {
  //   return
  // }
  return value
}


export const namespaced = true




export default {
  "namespaced": true,
  state,
  mutations,
  getters,
  actions,
}
