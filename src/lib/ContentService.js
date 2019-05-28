/* @flZZow */

/*
 *  Client API for Contentservice.io
 *  See https://contentservice.io
 */
import axios from 'axios'
import axiosError from './axiosError.js'
import QueryString from 'query-string'
import { assert, inBrowser } from '../components/misc'


// const debug = process.env.NODE_ENV !== 'production'

const NETWORK_ERROR_MSG = 'Could not contact authentication server'

class Contentservice {
  // static install: (Vue) => void;
  // static version: string;

  // static install (Vue) {
  //   alert('Install 2...')
  //   // Vue.prototype.$auth = new Contentservice()
  //   Vue.prototype.$auth = 123
  //
  //   Object.defineProperty(Vue.prototype, '$content', {
  //     get () { return 987 }
  //   })
  // }

  constructor (options) {

    if (!options) {
      console.error(`Contentservice was passed null options, so will be disabled.`)
      this.disabled = true
      return
    }
    this.disabled = false

    console.log('&&& Contentservice constructor', options)
    this.protocol = options.protocol ? options.protocol : 'https'
    this.host = options.host ? options.host : 'api.contentservice.io'
    if (options.port) {
      this.port = options.port
    } else if (this.protocol == 'http') {
      this.port = 80
    } else {
      this.port = 443
    }
    this.version = options.version ? options.version : '2.0'
    this.apikey = options.apikey

    this.knownElementTypes = [ ]


    // Decide which icon set to use with a defaultIconPack option.
    // Loosely based on:
    //    https://buefy.github.io/#/documentation/constructor-options
    //
    // Currently recognise:
    //    fa (font-awsome 4)
    //    fas (font-awsome 5)
    this.defaultIconPack = options.defaultIconPack ? options.defaultIconPack : 'fa'
    this.icons = (pack) => { return this.defaultIconPack === pack }

    if (options.defaultIconPack) {
      console.log(`Will use icon pack ${options.defaultIconPack}`);
    }
    console.log(`---> icons ---> ${this.defaultIconPack}`);

    // Remember the options
    this.options = options

    // Current user details
    // this.user = null
    // this.jwt = null
    // this.fromCache = false
  }

  // init (app: any /* Vue component instance */) {
  init (app /* Vue component instance */) {
    console.log('&&& ContentService.init')

    // VVVVV This does not seem to be called
    // alert('za init()')
    process.env.NODE_ENV !== 'production' && assert(
      install.installed,
      `not installed. Make sure to call \`Vue.use(Contentservice)\` ` +
      `before creating root instance.`
    )
  }

  endpoint () {
    const endpoint = `${this.protocol}://${this.host}:${this.port}/api/${this.version}/${this.apikey}`
    console.log(`endpoint(): ${endpoint}`)
    return endpoint
  }

  registerLayoutType (vm, layoutType, componentName, component, propertyComponent) {
    let propertyComponentName = `${componentName}-props`

    // Remember the component names used for this type of layout element.
    this.knownElementTypes[layoutType] = {
      layoutType,
      label: layoutType,
      name: layoutType,
      category: '',
      componentName,
      propertyComponentName,
      component,
      propertyComponent
    }

    // Define the components
    // console.log(`registering non-toolbox widget ${componentName}`)
    vm.component(componentName, component)
    vm.component(propertyComponentName, propertyComponent)
  }

  // -> { component, propertyComponent }
  getLayoutType (layoutType) {
    //console.error(`getLayoutType(${layoutType})`)
    return this.knownElementTypes[layoutType]
  }

  registerWidget (vm, { name, label, category, iconClass, iconClass5, componentName, component, propertyComponent, data}) {
    //console.error(`registerWidget(${name}, ${category})`)

    if (!label) {
      label = name
    }
    if (!category) {
      category = ''
    }

    let propertyComponentName = `${componentName}-props`

    // Remember the component names used for this type of layout element.
    this.knownElementTypes[name] = {
      layoutType: name,//ZZZ
      name,
      label,
      category,
      iconClass,
      iconClass5,

      componentName,
      propertyComponentName,
      component,
      propertyComponent,

      // The definition used when creating a new component.
      data,

      dragtype: 'component'
    }

    // Define the components
    // console.log(`registering toolbox widget ${componentName}`)
    vm.component(componentName, component)
    vm.component(propertyComponentName, propertyComponent)
  }

  toolboxCategories () {
    let categories = [ ] // category -> { type[] }
    for (var name in this.knownElementTypes) {
      if (this.knownElementTypes.hasOwnProperty(name)) {
        let type = this.knownElementTypes[name]
        //console.error(`Add tool ${name}`, type);
        let categoryRec = categories[type.category]
        //console.log(`category = ${type.category}`, categoryRec);
        if ( !categoryRec) {
          categoryRec = {
            name: type.category,
            types: [ ]
          }
          //console.error(`Add category ${type.category}`);
          categories[type.category] = categoryRec
        }
        categoryRec.types[name] = type
      }
    }
    //console.error(`Toolbox Types - `, categories);

    // Convert categories to an array and sort
    let arr = [ ]
    for (var categoryName in categories) {
      let category = categories[categoryName]
      arr.push(category)
    }
    categories = arr
    categories.sort((a,b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return +1
      return 0
    })

    // Sort categories

    // Convert the types in each category to an array
    categories.forEach(category => {
      let arr = [ ]
      for (var name in category.types) {
        if (category.types.hasOwnProperty(name)) {
          let type = category.types[name]
          arr.push(type)
        }
      }
      category.types = arr
    })

    return categories
  }


  //----------------------------------------------------------------------------//
  //                  WRAPPERS FOR STORE ACTIONS AND MUTATIONS                  //
  //----------------------------------------------------------------------------//
  // Same parameters as contentLayoutStore.setContent
  // Action
  setContent(params) {
    this.store.dispatch('setContentAction', params)
  }

  // Same parameters as contentLayoutStore.deleteElementAction
  // Action
  deleteElement(params) {
    this.store.dispatch('deleteElementAction', params)
  }

  // Same parameters as contentLayoutStore.insertLayoutAction
  // Action
  insertLayout(params) {
    this.store.dispatch('insertLayoutAction', params)
  }

  // Same parameters as contentLayoutStore.moveChildAction
  // Action
  moveChild(params) {
    this.store.dispatch('moveChildAction', params)
  }

  // Same parameters as contentLayoutStore.setProperty
  // Action
  setProperty({ vm, element, name, value, save }) {
    this.store.dispatch('setPropertyAction', { vm, element, name, value, save })
  }

  // Same parameters as contentLayoutStore.setPropertyInElement
  // Mutation
  setPropertyInElement ({ vm, element, name, value } ) {
    console.log(`$content.setPropertyInElement`, vm, element, name, value);
    this.store.commit('setPropertyInElementMutation', { vm, element, name, value })
  }

  // This is only here, to match the setProperty functions.
  getProperty({ element, name, defaultValue }) {
    if (element.hasOwnProperty(name)) {
      return element[name]
    }
    if (typeof(defaultValue) !== 'undefined') {
      return defaultValue
    }
    return undefined
  }

  // Same parameters as contentLayoutStore.setLayout
  // Mutation
  setLayout (params) {
    this.store.commit('setLayout', params)
  }

  // Same parameters as contentLayoutStore.setPropertyElement
  // Mutation
  setPropertyElement(params) {
    this.store.commit('setPropertyElementMutation', params)
  }

  // Same parameters as contentLayoutStore.setExpandedElement
  // Mutation
  setExpandedElement (params) {
    this.store.commit('setExpandedElementMutation', params)
  }

  // Same parameters as contentLayoutStore.setEditMode
  // Mutation
  setEditMode(params) {
    this.store.commit('setEditMode', params)
  }

  // Toggle between view and {edit|layout|debug}
  toggleEditMode() {
    // When we switch to view mode, we remember which of the edit modes
    // we were in, so we can toggle back to the same mode.
    let mode = this.store.state.mode
    let previousEditMode = this.store.state.previousEditMode
    if (mode === 'view') {
      // Switch to one of the edit modes
      console.log(` - toggle to ${previousEditMode}`)
      this.setEditMode({ mode: previousEditMode })

    } else {
      // Switch back to view mode
      console.log(` - toggle to view mode`)
      this.setEditMode({ mode: 'view', previousEditMode: mode })
    }
  }

  // Same parameters as contentLayoutStore.setSaveMsg
  // Mutation
  setSaveMsg(params) {
    this.store.commit('setSaveMsg', params)
  }

  // Same parameters as contentLayoutStore.updateElementPropertyMutation
  // Mutation
  updateElementProperty(params) {
    this.store.commit('updateElementProperty', params)
  }

  // Same parameters as contentLayoutStore.insertLayoutMutation
  // Mutation
  insertLayoutMutation(params) {
    this.store.commit('insertLayoutMutation', params)
  }

  // Same parameters as contentLayoutStore.deleteElement
  // Mutation
  deleteElementMutation(params) {
    this.store.commit('deleteElementMutation', params)
  }

  // Same parameters as contentLayoutStore.refresh
  // Mutation
  refresh() {
    this.store.commit('refreshMutation', { })
  }

  //----------------------------------------------------------------------------//
  //                          NEW STUFF FROM CROWDHOUND                         //
  //----------------------------------------------------------------------------//




	/**
   *	Select may be in various formats:
	 *		select(vm, '$my-anchor', 'user-list') - select a thread by it's anchor and anchorType.
	 *		select(vm, rootId) - select a thread. Anchor will NOT be created if it doesn't exist.
	 *		select(vm, params)
	 */
  select(vm, param1, param2) {

    return new Promise((resolve, reject) => {

      if (this.options.debug) {
        console.log('select()');
      }
      if (this.disabled) {
        return reject(new Error('contentservice disabled'));
      }

      // Work out what combination of parameters we've been passed
      var type1 = typeof(param1);
      var type2 = typeof(param2);
      var type3 = typeof(param3);

      if (arguments.length === 3) {

        // Short form:  select(vm, anchor, anchorType)
        // Check the anchor starts with $
        var anchor = param1;
        var anchorType = param2;
        if (typeof(anchor) != 'string') {
          console.log('CrowdHound.select: anchor must be a string: ' + anchor + ', ' + typeof(anchor));
          return reject(new Error('invalid anchor parameter'));
        }
        if (anchor.charAt(0) != '$') {
          console.log('CrowdHound.select: anchor must start with \'$\': ' + anchor);
          return reject(new Error('invalid anchor parameter - must start with \'$\''));
        }
        if (typeof(anchorType) != 'string') {
          console.log('CrowdHound.select: anchorType must be a string: ' + anchorType + ', ' + typeof(anchorType));
          return reject(new Error('invalid anchor parameter'));
        }
        console.log('select anchor')
        var params = {
          elementId: anchor,
          type: anchorType
        };
      } else if (arguments.length === 2) {

        if (type1 == 'object') {

          // select(vm, params)
          var params = param1
        } else {

          // select(vm, rootId) - select a thread. Anchor will NOT be created if it doesn't exist.
          var params = {
            elementId: '' + param1
          };
        }

      } else {
        reject('Unknown parameters to CrowdHound.select');
        // if (type1 == 'function') {
        //   var callback = param1;
        //   return callback(new Error('Invalid parameters'));
        // }
        // if (typeof(type4) == 'function') {
        //   var callback = param4;
        //   return callback(new Error('Invalid parameters'));
        // }
        // if (typeof(type5) == 'function') {
        //   var callback = param5;
        //   return callback(new Error('Invalid parameters'));
        // }
        return;
      }

      //var elementType = 'file';
      //		var url = _API_URL + '/elements?type=' + elementType;
      var url = `${this.endpoint()}/elements`;
      // url = addAuthenticationToken(url);
      if (this.options.debug) {
        console.log('URL= ' + url)
      }
      console.log('CrowdHound.select()')
      console.log('  url=' + url)
      console.log('  params=', params)



      axios({
        method: 'get',
        url,
        headers: {
          // 'Authorization': 'Bearer ' + this.$contentservice.jwt,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        params: params
      })
        .then(response => {
          // JSON responses are automatically parsed.
          //console.log(`RESPONSE IS`, response.data)
          let reply = response.data

          // If the first item in the array is the current user, pluck it off the array now.
          let userdata = null
          if ((reply instanceof Array) && reply.length > 0 && reply[0].__currentUser) {
            userdata = reply[0];
            reply.shift(); // remove from the array
          }

          let selection = {
            cooked: false,
            params: params,
            elements: reply,
          };
          return resolve(selection);
        })
        .catch(e => {
          axiosError(vm, url, params, e)
          reject(e)
        })
    })// new promise

  } //- select()



  /*
   *  Update an existing element.
   *	If an anchor and a type is provided, the element will be created
   *	if it does not already exist.
   */
  update (vm, element) {

    console.log(`ContentService.js:update()`, element)
    console.log(`element.description.length=`, element.description.length)

    return new Promise((resolve, reject) => {

      if (this.options.debug) {
        console.log('select()');
      }
      if (this.disabled) {
        return reject(new Error('contentservice disabled'));
      }

      let url = `${this.endpoint()}/element`;
      //let params = element
      axios({
        method: 'put',
        url,
        headers: {
          // 'Authorization': 'Bearer ' + this.$contentservice.jwt,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: element
      })
        .then(response => {
          // JSON responses are automatically parsed.
          //console.log(`RESPONSE IS`, response.data)
          // let reply = response.data
          return resolve('ok');
        })
        .catch(e => {
          axiosError(vm, url, element, e)
          reject(e)
        })
    })//- promise
  }// update()

}

export default Contentservice
