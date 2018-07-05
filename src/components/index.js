
// External libraries
import Vuex from 'vuex'
import VueHotkey from 'v-hotkey'
import VueSplit from 'vue-split-panel'
import VueFroala from 'vue-froala-wysiwyg'
import VueDragDrop from 'vue-drag-drop';

// Our main class
import ContentService from '../lib/ContentService.js'

// Our components
import CrowdhoundMinimal from './CrowdhoundMinimal.vue'
import ContentContent from './ContentContent.vue'
import ContentLayoutEditor from './ContentLayoutEditor.vue'
import ContentToolbox from './ContentToolbox.vue'
import ContentPane from './ContentPane.vue'

import ContentElement from './ContentElement.vue'
import ContentElementProps from './ContentElementProps.vue'
import ContentChildren from './ContentChildren.vue'
//import ContentChildrenProps from './ContentChildrenProps.vue'

// Editing-related stuff.
import ContentText from './ContentText.vue'
import ContentTextProps from './ContentTextProps.vue'
import ContentFroala from './ContentFroala.vue'
import ContentFroalaProps from './ContentFroalaProps.vue'
import ContentField from './ContentField.vue'
import ContentFieldProps from './ContentFieldProps.vue'
import ContentForm from './ContentForm.vue'
import ContentFormProps from './ContentFormProps.vue'
import ContentSection from './ContentSection.vue'
import ContentSectionProps from './ContentSectionProps.vue'
import ContentContentProps from './ContentContentProps.vue'
import ContentContainer from './ContentContainer.vue'
import ContentContainerProps from './ContentContainerProps.vue'
import ContentColumns from './ContentColumns.vue'
import ContentColumnsProps from './ContentColumnsProps.vue'

import ContentAdminBlogList from './ContentAdminBlogList.vue'
import ContentAdminBlogDetails from './ContentAdminBlogDetails.vue'



import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from '../lib/hierarchy'

// Our store
import ContentLayoutStore from '../store/contentLayoutStore.js'





export let _Vue
let _content = null
let _store = null


function install (Vue, options) {
  console.log('Contentservice.install()', options)

  if (_content) {
    console.error("Vue.use(ContentService) has already been called.")
    return
  }

  // Create ourselves a ContentService Object
  console.log('Getting our _content')
  _content = new ContentService(options)
  console.log('Have our _content', _content)
  //_content.checkInitialLoginStatus(false)
  //console.log('Finished checking status')


  _Vue = Vue

  const isDef = v => v !== undefined

  // Vue.mixin adds an additional 'beforeCreate' function to it's
  // list of functions to be called when new Vue is created. We'll
  // use it to look for new Vue({ ContentService }). If found, we'll
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
        this._contentRoot = this.$parent._contentRoot
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


  /*
   *  Set up the Vuex store for ContentService.
   */
  Vue.use(Vuex)
  _store = new Vuex.Store({
    modules: {
      contentLayout: ContentLayoutStore
    }
  });

  /*
   *  Define the components
   */
  Vue.component('crowdhound-minimal', CrowdhoundMinimal)

  // Vue.component('content-triple-pane', ContentTriplePane)
  Vue.component('content-layout-editor', ContentLayoutEditor)
  Vue.component('content-toolbox', ContentToolbox)

  Vue.component('content-pane', ContentPane)//ZZZZZ ???
  
  Vue.component('content-content', ContentContent)
  Vue.component('content-content-props', ContentContentProps)
  Vue.component('content-children', ContentChildren)

  Vue.component('content-admin-blog-list', ContentAdminBlogList)
  Vue.component('content-admin-blog-details', ContentAdminBlogDetails)

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



  // Set up external libraries
  // hotkey
  Vue.use(VueHotkey)

  // Vue-split-panel
  Vue.use(VueSplit)

  // Froala. Unfortunately requires jQuery.
  // https://github.com/froala/vue-froala-wysiwyg
  window.$ = require('jquery');
  require('froala-editor/js/froala_editor.pkgd.min.js')
  require('froala-editor/css/froala_editor.pkgd.min.css')
  require('font-awesome/css/font-awesome.css')
  require('froala-editor/css/froala_style.min.css')
  Vue.use(VueFroala)

  // vue-drag-drop
  Vue.use(VueDragDrop);

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

Object.defineProperty(obj, 'store', {
  get: function() {
    // console.error('store getter')
    return _store
  }
});

export default obj
