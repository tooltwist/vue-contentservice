//import Vue from 'vue'
// export default Vue => Vue.component(Component.name, Component)

import Contentservice from './Contentservice'
import CrowdhoundMinimal from './components/CrowdhoundMinimal.vue'

export let _Vue

let _content = null


function install (Vue, options) {
  console.log('Contentservice.install()', options)

  if (_content) {
    console.error("Vue.use(Contentservice) has already been called.")
    return
  }

  // Create ourselves an Contentservice Object
  console.log('Getting our _content')
  _content = new Contentservice(options)
  console.log('Have our _content', _content)
  //_content.checkInitialLoginStatus(false)
  //console.log('Finished checking status')


  _Vue = Vue

  const isDef = v => v !== undefined

  // Vue.mixin adds an additional 'beforeCreate' function to it's
  // list of functions to be called when new Vue is created. We'll
  // use it to look for new Vue({ contentservice }). If found, we'll
  // consider this to be the root. If it is not found, then we will
  // assume this is a child of the root, and create pointers back
  // to the root.
  //Vue.mixin({
  Vue.mixin({
    beforeCreate () {
      // console.log('vue-contentservice: index.js - beforeCreate()')

      if (!this.$parent) {
      //if (isDef(this.$options.contentservice)) {
        // console.error('Initializing ROOT *********')
        // This must be the root, since we found contentservice in it's options.
        this._contentRoot = this
        this._content = _content
        // this._content.init(this)
        Vue.util.defineReactive(this, '_content', this.$content)
        // Vue.util.defineReactive(this, '_content', this._content.jwt)
        // Vue.util.defineReactive(this, '_content', this._content.fromCache)
      } else {
        //console.log('Initialise new child')
        this._contentRoot = (this.$parent && this.$parent._contentRoot) || this
      }

      /*
      // this.$options is the options passed to new Vue({ })
      if (isDef(this.$options.contentservice)) {
        console.log('Initialise the root')
        // This must be the root, since we found contentservice in it's options.
        this._contentRoot = this
        this._content = this.$options.contentservice
        // this._content.init(this)
        Vue.util.defineReactive(this, '_content', this.$content)
        // Vue.util.defineReactive(this, '_content', this._content.jwt)
        // Vue.util.defineReactive(this, '_content', this._content.fromCache)

        console.log('Checking login status from beforeCreate()')
        this._content.checkInitialLoginStatus(false)
      } else {
        console.log('Initialise new child')
        this._contentRoot = (this.$parent && this.$parent._contentRoot) || this
      }
      // registerInstance(this, this)
      */
    },
    destroyed () {
      // registerInstance(this)
    }
  })

  // As described above, the Vue instances form a hierachy. The mixin
  // above ensures that each instance has an '_contentRoot' field
  // that points to the instance where 'contentservice' was passed to new Vue({  }).
  // Note that it's _contentRoot might actually point to itself.
  Object.defineProperty(Vue.prototype, '$content', {
    get () { return this._contentRoot._content }
  })

  // Define the components
  Vue.component('crowdhound-minimal', CrowdhoundMinimal)


  return _content
}

const obj = {
  install: install
}

Object.defineProperty(obj, '_content', {
  get: function() {
      return _content;
  }
});

export default obj
