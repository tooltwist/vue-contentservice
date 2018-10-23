/* @flZZow */

/*
 *  Client API for Contentservice.io
 *  See https://contentservice.io
 */
//import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

//import { install } from './install'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import axiosError from './axiosError.js'
import QueryString from 'query-string'
import { assert, inBrowser } from '../components/misc'

// import { safeJson } from './hierarchy.js'
// import * as util from './hierarchy.js'



// const debug = process.env.NODE_ENV !== 'production'

//const JWT_COOKIE_NAME = 'contentservice-jwt'
//const LOGIN_TIMEOUT_DAYS = 3
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
    this.host = options.host ? options.host : 'api.contentservice.io'
    this.port = options.port ? options.port : 80
    this.version = options.version ? options.version : '2.0'
    this.apikey = options.apikey

    this.knownElementTypes = [ ]

    // // See if we are supporting email login (default to yes)
    // if (options.login && typeof(options.login.email) !== 'undefined' && !options.login.email) {
    //   console.log(`Contentservice(): Email is NOT supported`);
    //   this.emailSupported = false;
    // } else {
    //   console.log(`Contentservice(): Email IS supported`);
    //   this.emailSupported = true;
    // }

    //ZZZZZ Temporarily here from docservice
    //DSZZ
    console.log('&&& Contentservice constructor', options)
    this.docservice = { }
    if (options.docservice) {
      this.dshost = options.docservice.host ? options.docservice.host : 'api.docservice.io'
      this.dsport = opdsdocservice.version = options.docservice.version ? options.docservice.version : '2.0'
      this.dsapikey = options.docservice.apikey
    }


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




    // // See if registration is allowed
    // if (!this.emailSupported) {
    //   // login.email: false
    //   console.log(`Contentservice(): Registration is NOT supported`);
    //   this.registrationSupported = false;
    // } else if (options.hints && typeof(options.hints.register) !== 'undefined' && !options.hints.register) {
    //   // Check for hints.register: false
    //   console.log(`Contentservice(): Registration is NOT supported`);
    //   this.registrationSupported = false;
    // } else {
    //   // We WILL allow registration. Check we have what we need.
    //   if (typeof(options.hints.register) !== 'object') {
    //     this.registrationSupported = false;
    //     console.error('options.hints.register must be false, or an object')
    //   } else if (!options.hints.register.resumeURL) {
    //     this.registrationSupported = false;
    //     console.log(`Contentservice(): Registration is NOT supported`);
    //     console.error('options.hints.register.resumeURL must be provided')
    //   } else if (typeof(options.hints.register.resumeURL) !== 'string') {
    //     this.registrationSupported = false;
    //     console.log(`Contentservice(): Registration is NOT supported`);
    //     console.error('options.hints.register.resumeURL must be a string')
    //   } else {
    //     // All good for registration
    //     this.registrationSupported = true
    //     //this.registerResume = options.hints.register.resumeURL
    //     console.log(`Contentservice(): Registration IS supported`);
    //   }
    // }

    // // See if forgotten password is allowed
    // if (!this.emailSupported) {
    //   // Email is not used (options.login.email is false)
    //   console.log(`Contentservice(): Forgotten password is NOT supported`);
    //   console.log(`(because email is not supported)`)
    //   this.forgottenPasswordSupported = false;
    // } else if (options.hints && typeof(options.hints.forgot) !== 'undefined' && !options.hints.forgot) {
    //   // Forgot password is specifically disallowed (options.hints.register is false)
    //   this.forgottenPasswordSupported = false;
    // } else {
    //   // We WILL allow forgot password. Check we have what we need.
    //   if (typeof(options.hints.forgot) !== 'object') {
    //     this.forgottenPasswordSupported = false;
    //     console.log(`Contentservice(): Forgotten password is NOT supported`);
    //     console.error('options.hints.forgot must be false, or an object')
    //   } else if (!options.hints.forgot || !options.hints.forgot.resumeURL) {
    //     this.forgottenPasswordSupported = false;
    //     console.log(`Contentservice(): Forgotten password is NOT supported`);
    //     console.error('options.hints.forgot.resumeURL must be provided')
    //   }
    //   else if (typeof(options.hints.forgot.resumeURL) !== 'string') {
    //     this.forgottenPasswordSupported = false;
    //     console.log(`Contentservice(): Forgotten password is NOT supported`);
    //     console.error('options.hints.forgot.resumeURL must be a string')
    //   } else {
    //     // All good for forgotten password
    //     this.forgottenPasswordSupported = true;
    //     this.forgotResume = options.hints.forgot.resumeURL
    //   }
    // }

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
    // console.log('endpoint():', this)
    const protocol = this.protocol ? this.protocol : 'http'
    const endpoint = `${protocol}://${this.host}:${this.port}/api/${this.version}/${this.apikey}`
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
    console.log(`registering ${componentName}`)
    vm.component(componentName, component)
    vm.component(propertyComponentName, propertyComponent)
  }

  // -> { component, propertyComponent }
  getLayoutType (layoutType) {
    //console.error(`getLayoutType(${layoutType})`)
    return this.knownElementTypes[layoutType]
  }

  registerWidget (vm, { name, label, category, iconClass, iconClass5, componentName, component, propertyComponent, data}) {
    console.error(`registerWidget(${name}, ${category})`)

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
    console.log(`registering widget ${componentName}`)
    vm.component(componentName, component)
    vm.component(propertyComponentName, propertyComponent)
  }

  toolboxCategories () {
    let categories = [ ] // category -> { type[] }
    for (var name in this.knownElementTypes) {
      if (this.knownElementTypes.hasOwnProperty(name)) {
        let type = this.knownElementTypes[name]
        console.error(`Add tool ${name}`, type);
        let categoryRec = categories[type.category]
        console.log(`category = ${type.category}`, categoryRec);
        if ( !categoryRec) {
          categoryRec = {
            name: type.category,
            types: [ ]
          }
          console.error(`Add category ${type.category}`);
          categories[type.category] = categoryRec
        }
        categoryRec.types[name] = type
      }
    }
    console.error(`Toolbox Types - `, categories);

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


  // safeJSON (json) {
  //   return util.safeJson(json)
  // }

  //----------------------------------------------------------------------------//
  //                          NEW STUFF FROM CROWDHOUND                         //
  //----------------------------------------------------------------------------//




	/**
	 *	Select may be in various formats:
	 *		select(vm, '$my-anchor', 'user-list', callback) - select a thread by it's anchor and anchorType.
	 *		select(vm, rootId, callback) - select a thread. Anchor will not be created if it doesn't exist.
	 *		select(vm, params, callback)
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


    	// var API_URL = '//' + CROWDHOUND_HOST + ':' + CROWDHOUND_PORT + '/api/' + CROWDHOUND_VERSION + '/' + CROWDHOUND_TENANT;
    	// var url = API_URL + '/element';
    	// var url = Curia.addAuthenticationToken(url);
      //
    	// console.log('url   =' + url);
    	// console.log('element=', element);
      //
    	// $.ajax({
    	// 	type : 'PUT',
    	// 	url : url,
    	// 	data : element,
    	// 	success : function(response) {
      //
    	// 		return callback(null);
    	// 	},
    	// 	error : function(jqxhr, textStatus, errorThrown) {
    	// 		// Failed AJAX call
    	// 		console.log('An error occurred while updating an element.\n  status: ' + jqxhr.status + "\n  responseText: ", qXHR.responseText);
    	// 		return callback(niceError(jqxhr, textStatus, errorThrown));
    	// 	}
    	// });

    })//- promise
  }// update()

}

// Add the hierarchy manipulation functions
// Contentservice.prototype.util = util

Contentservice.version = '__VERSION__'
if (inBrowser && window.Vue) {
  window.Vue.use(Contentservice)
}

export default Contentservice
