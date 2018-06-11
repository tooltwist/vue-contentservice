import Contentservice from './Contentservice.js'
import CrowdhoundMinimal from './components/CrowdhoundMinimal.vue'
import ContentLayoutPane from './components/ContentLayoutPane.vue'
import ContentTriplePane from './components/ContentTriplePane.vue'
import ContentToolbox from './components/ContentToolbox.vue'
import ContentPane from './components/ContentPane.vue'


import ContentElement from './components/ContentElement.vue'
import ContentElementProps from './components/ContentElementProps.vue'
import ContentChildren from './components/ContentChildren.vue'
//import ContentChildrenProps from './components/ContentChildrenProps.vue'


import ContentText from './components/ContentText.vue'
import ContentTextProps from './components/ContentTextProps.vue'
import ContentFroala from './components/ContentFroala.vue'
import ContentFroalaProps from './components/ContentFroalaProps.vue'
import ContentField from './components/ContentField.vue'
import ContentFieldProps from './components/ContentFieldProps.vue'
import ContentForm from './components/ContentForm.vue'
import ContentFormProps from './components/ContentFormProps.vue'
import ContentSection from './components/ContentSection.vue'
import ContentSectionProps from './components/ContentSectionProps.vue'
import ContentContent from './components/ContentContent.vue'
import ContentContentProps from './components/ContentContentProps.vue'
import ContentContainer from './components/ContentContainer.vue'
import ContentContainerProps from './components/ContentContainerProps.vue'
import ContentColumns from './components/ContentColumns.vue'
import ContentColumnsProps from './components/ContentColumnsProps.vue'



import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from './lib/hierarchy'
import * as _contentLayoutStore from './contentLayoutStore.js'

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

  Vue.component('content-triple-pane', ContentTriplePane)
  Vue.component('content-toolbox', ContentToolbox)

  Vue.component('content-pane', ContentPane)//ZZZZZ ???
  Vue.component('content-layout-pane', ContentLayoutPane)

  Vue.component('content-content', ContentContent)
  Vue.component('content-content-props', ContentContentProps)
  Vue.component('content-children', ContentChildren)

  // Register the layout element types
  _content.registerLayoutType(Vue, 'element', 'content-element', ContentElement, ContentElementProps)
  _content.registerLayoutType(Vue, 'text', 'content-text', ContentText, ContentTextProps)
  _content.registerLayoutType(Vue, 'froala', 'content-froala', ContentFroala, ContentFroalaProps)
  _content.registerLayoutType(Vue, 'html', 'content-html', ContentFroala, ContentFroalaProps)
  _content.registerLayoutType(Vue, 'field', 'content-field', ContentField, ContentFieldProps)
  _content.registerLayoutType(Vue, 'form', 'content-form', ContentForm, ContentFormProps)
  _content.registerLayoutType(Vue, 'section', 'content-section', ContentSection, ContentSectionProps)
  _content.registerLayoutType(Vue, 'container', 'content-container', ContentContainer, ContentContainerProps)
  _content.registerLayoutType(Vue, 'columns', 'content-columns', ContentColumns, ContentColumnsProps)

  return _content
} //- install()

const obj = {
  install: install,
//  layoutStore,

  // hierarchy manipulation
  sanitizeLayout,
  safeJson,
  layoutRoot,
  layoutChanged,
}

Object.defineProperty(obj, '_content', {
  get: function() {
      return _content
  }
});

Object.defineProperty(obj, '_contentLayoutStore', {
  get: function() {
    console.error('getting _contentLayoutStore')
    return _contentLayoutStore
  }
});

export default obj
