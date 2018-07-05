/*
 *  Keep details of the Element being displayed
 *  in the properties pane.
 */
//import { sanitizeLayout, safeJson } from '~/lib/Tooltwist.js'
import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from '../lib/hierarchy'

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
    propertyElement: null,

    // Message shown at top of screen
    saveMsg: CLEAN,

    // Triple pane stuff
    showLeftPane: true,
    showRightPane: true
  }
}
//})

//export const getters = {
export const getters = {

  layoutAsJson: (state) => {
    return ZsafeJson(state.layout)
  }

}

// getters
// export const getters = {
//   propertyElement: state => state.propertyElement,
//   p: state => state.propertyElement
// }

// Actions
// see https://vuex.vuejs.org/guide/actions.html
export const actions = {

  setContent ({ commit, state }, { vm, type, layout, anchor}) {

    console.log(`In Action contentLayout/setContent(type=${type}, layout=${layout?'yes':'no'}, anchor=${anchor})`)

    if (layout) {
      //state.layout = element ? sanitizeLayout(element) : null
      commit('setLayout', { layout: layout, crowdhoundElement: null, editable: false })
    } else if (anchor) {
      loadLayoutFromAnchor(commit, vm, anchor)
    } else {
      console.error(`Action contentLayout/setContent should be passed either anchor or layout`)
    }
  },

  // setPropertyElement ({ commit }, { element }) {
  //   console.log(`setPropertyElement(${element.id})`)
  //   commit(types.SET_PROPERTY_ELEMENT, { element })
  // },
  setProperty ({ commit, state }, { vm, element, name, value }) {
    console.log(`action setProperty(${element.id})`)

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

    commit('setSaveMsg', { msg: DIRTY })


    //ZZZZ Timer should probably be set in the mutation?
    // There is a potential timing problem.
    // - the commit might not be instantaneous (is that correct), so
    // a timeout created here might run before the commit occurs.


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
        console.error(`saveToCrowdhound() in Store`, crowdhoundElement)

        // Update the element (should already exist)
        commit('setSaveMsg', { msg: SAVED })

        vm.$content.update(this, crowdhoundElement)
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

  },

}

// mutations
//export const mutations = {
export const mutations = {

  // Set the current layout, displayed in the middle panel.
  setLayout (state, { layout, anchor, crowdhoundElement, /*tenant, elementId, */ editable /*, element */ } ) {
    //console.log('In Mutation contentLayout/setLayout()', state)
    console.log('In Mutation contentLayout/setLayout()', layout)

    if (layout) {
      state.layout = sanitizeLayout(layout)
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
    // console.log('In Mutation contentLayout/setPropertyElement()', element)
    //return
    // console.log('State is ', state)
    // Clone the element
    //let duplicate = JSON.parse(JSON.stringify(data.element));
    // console.log(`Before`)
    state.propertyElement = element
    //console.log(`After`)
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
    console.log(`mutation contentLayout/setSaveMsg(${msg})`)
    state.saveMsg = msg
  },

  // Set the value of a property in an element.
  // The element is not necessarily the 'propertyElement',
  // it *should* be an element in the current layout.
  updateElementProperty (state, { vm, element, name, value }) {
    //ZZZZ Check the parameters
    console.log(`mutation contentLayout/updateElementProperty(${name})`, element)
    element[name] = value
  },

  // Clone an element hierarchy and insert it as a child
  // into an element in the current layout.
  insertChild(state, { element, child, position}) {
    console.log('In Mutation contentLayout/insertChild()', element)
    console.log('In Mutation insertChild()', child)

    console.log(`insertChild, parent before:`, safeJson(element));
    console.log(`insertChild, child:`, safeJson(child));

    // Clone the hierarchy (this is the cheat's way)
    //let newchild = JSON.parse(JSON.stringify(child));
    let newchild = JSON.parse(safeJson(child));

    // Overwrite any element IDs
    overwriteElementIDs(newchild)

    // Check it is sane
    newchild._parent = element
    sanitizeLayout(newchild, element)

    // Plug it in as a child of the element
    if (position >= 0) {
      element.children.splice(position, 0, newchild)
    } else {
      element.children.push(newchild)
    }
    console.log(`insertChild, parent after:`, safeJson(element));
  },

  // Set the element shown in the properties panel.
  // This *should* be an element in the current layout
  setMode (state, { mode } ) {
    console.log(`In Mutation setMode(${mode})`)
    console.log('State is ', state)

    state.mode = mode
  },
}//- mutations


function overwriteElementIDs(element) {
  element.id = Math.floor(Math.random() * 10000000000)
  console.log('New Id is ', element.id)

  if (element.children) {
    element.children.forEach((child) => overwriteElementIDs(child))
  }
}


// Prepare a hierarchy of elements that will be used to lay out a page.
function ZsanitizeLayout (element, parent) {

  // Work out this new level
  // let level = parent ? parent.level + 1 : 0;
  //console.log(`sanitizeLayout(element, ${parent?parent.id:'-'}, ${level})`, element)

  // Create a new element ID, but do not modify an existing ID.
  if (!element.id) {
    Vue.set(element, 'id', Math.floor(Math.random() * 10000000000))
    // console.log('New Id is ', element.id)
  }

  // Check we have a parent
  element._parent = parent

  // Make sure we have a 'children' element
  if (!element.children) {
    //Vue.$set(element, 'children', [ ])
    Vue.set(element, 'children', [ ])
  }

  // Now sanitize any children
  element.children.forEach(child => {
    sanitizeLayout(child, element)
  })
  return element
}

function ZsafeJson (element) {

  // Custom replacer function - gets around "TypeError: Converting circular structure to JSON"
  // Modified from http://www.johnantony.com/pretty-printing-javascript-objects-as-json/
  var replacer = function(key, value) {
    // ignore parent links (they are circular)
    if (key === '_parent') {
      return
    }
    return value
  }
  let json = JSON.stringify(element, replacer, 4);

  return json;
}

function ZlayoutRoot (element) {
  while (element._parent) {
    element = element._parent
  }
  return element
}

function ZlayoutChanged (element) {
  let root = layoutRoot(element)
  root.tt_counter++
}

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
      console.log(`>>> result=`, result)
      if (result.elements.length < 1) {
        // Should not be possible
        console.error(`Selecting layout returned no element. How is this possible?`)
        return
      }

      // See if the description contains a valid layout
      console.log(`result=`, result)
      let elementContainingLayout = result.elements[0]
      let json = elementContainingLayout.description
      console.log('json=', json)
      let layout = null
      if (json === shortAnchor) {
        console.error(`>>> NOT parsing json (it's the anchor)`)
        // New element/layout
      } else {
        console.error(`>>> parsing JSON`)
        layout = JSON.parse(json)
        console.log('parsed JSON layout=', layout)
        // Check for errors
      }
      console.log(`>>> layout=`, layout)

      if (layout === null) {
        console.error(`>>> Creating default layout`)
        // Create an initial layout
        layout = {
          type: 'layout',
          children: [
            {
              type: 'section',
              children: [
                {
                    "type": "froala",
                    "text": `<h1><span style=\"font-size: 48px;\">Example elemente for ${anchor}!</span></h1>`,
                    "id": 1664717185,
                    "children": []
                }
              ]
            }
          ]
        }

      }

      // Save the layout in our state store.
      let sanitized = vm.$content.util.sanitizeLayout(layout)
      commit('setLayout', {
        anchor: fullAnchor,
        layout: sanitized,
        crowdhoundElement: elementContainingLayout,
        // tenant: elementContainingLayout.tenant,
        // elementId: elementContainingLayout.id,
        editable: canEdit })

    })
    .catch(e => {
      let desc = `Error loading comments`
      console.log(`Dirty rotten error: `, e)
      /* handleError(this, desc, params, e) */
      this.selectError = true
    })//- axios
}

export const namespaced = true




export default {
  "namespaced": true,
  state,
  mutations,
  getters,
  actions,
}
