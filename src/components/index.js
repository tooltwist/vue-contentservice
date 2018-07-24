
// External libraries
import Vuex from 'vuex'
import VueHotkey from 'v-hotkey'
import VueSplit from 'vue-split-panel'
import VueFroala from 'vue-froala-wysiwyg'
import VueDragDrop from 'vue-drag-drop';
import Clipboard from 'v-clipboard'

// Our main class
import ContentService from '../lib/ContentService.js'

// Editing-related stuff.
import CrowdhoundMinimal from './CrowdhoundMinimal.vue'
import ContentContent from './ContentContent.vue'
import ContentLayoutEditor from './ContentLayoutEditor.vue'
import ContentToolbox from './ContentToolbox.vue'
import ContentPane from './ContentPane.vue'

import ContentElement from './ContentElement.vue'
import ContentElementProps from './ContentElementProps.vue'
import ContentChildren from './ContentChildren.vue'
//import ContentChildrenProps from './ContentChildrenProps.vue'

// Widgets
import ContentLayout from './widgets/ContentLayout.vue'
import ContentLayoutProps from './widgets/ContentLayoutProps.vue'
import ContentText from './widgets/ContentText.vue'
import ContentTextProps from './widgets/ContentTextProps.vue'
import ContentFroala from './widgets/ContentFroala.vue'
import ContentFroalaProps from './widgets/ContentFroalaProps.vue'
import ContentField from './widgets/ContentField.vue'
import ContentFieldProps from './widgets/ContentFieldProps.vue'
import ContentForm from './widgets/ContentForm.vue'
import ContentFormProps from './widgets/ContentFormProps.vue'
import ContentSection from './widgets/ContentSection.vue'
import ContentSectionProps from './widgets/ContentSectionProps.vue'
import ContentContentProps from './ContentContentProps.vue'
import ContentContainer from './widgets/ContentContainer.vue'
import ContentContainerProps from './widgets/ContentContainerProps.vue'
import ContentColumns from './widgets/ContentColumns.vue'
import ContentColumnsProps from './widgets/ContentColumnsProps.vue'

import ContentGoogleSlides from './widgets/ContentGoogleSlides.vue'
import ContentGoogleSlidesProps from './widgets/ContentGoogleSlidesProps.vue'
import ContentGoogleSheets from './widgets/ContentGoogleSheets.vue'
import ContentGoogleSheetsProps from './widgets/ContentGoogleSheetsProps.vue'
import ContentGoogleDocs from './widgets/ContentGoogleDocs.vue'
import ContentGoogleDocsProps from './widgets/ContentGoogleDocsProps.vue'


import ContentAdminBlogList from './ContentAdminBlogList.vue'
import ContentAdminBlogDetails from './ContentAdminBlogDetails.vue'

// Property Types
import StringProperty from './propertyTypes/StringProperty.vue'


// import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from '../lib/hierarchy'

// Our store
import ContentLayoutStore from '../store/contentLayoutStore.js'




let _Vue = null
let _content = null
let _store = null


function install (Vue, options) {
  console.log('Contentservice.install()', options)

  if (_content) {
    console.error("Vue.use(ContentService) has already been called.")
    return
  }
  _Vue = Vue

  // Create ourselves a ContentService Object
  console.log('Getting our _content')
  _content = new ContentService(options)
  console.log('Have our _content', _content)
  //_content.checkInitialLoginStatus(false)
  //console.log('Finished checking status')

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
  _content.registerLayoutType(Vue, 'layout', 'content-layout', ContentLayout, ContentLayoutProps)

  _content.registerLayoutType(Vue, 'google-slides', 'content-google-slides', ContentGoogleSlides, ContentGoogleSlidesProps)
  _content.registerLayoutType(Vue, 'google-sheets', 'content-google-sheets', ContentGoogleSheets, ContentGoogleSheetsProps)
  _content.registerLayoutType(Vue, 'google-docs', 'content-google-docs', ContentGoogleDocs, ContentGoogleDocsProps)


  // Set up external libraries
  // hotkey
  Vue.use(VueHotkey)

  // Vue-split-panel
  Vue.use(VueSplit)

  // Froala. Unfortunately requires jQuery.
  // https://github.com/froala/vue-froala-wysiwyg
  if (window) {
    window.$ = require('jquery');
  }
  require('froala-editor/js/froala_editor.pkgd.min.js')
  require('froala-editor/css/froala_editor.pkgd.min.css')
  require('font-awesome/css/font-awesome.css')
  require('froala-editor/css/froala_style.min.css')
  Vue.use(VueFroala)

  // vue-drag-drop
  Vue.use(VueDragDrop);

  // v-clipboard
  Vue.use(Clipboard)


  return _content
} //- install()

const obj = {
  install: install,
//  layoutStore,

  // hierarchy manipulation
  // sanitizeLayout,
  // safeJson,
  // layoutRoot,
  // layoutChanged,
}

Object.defineProperty(obj, '_content', {
  get: function() {
      return _content
  }
});

Object.defineProperty(obj, 'storeDefinition', {
  get: function() {
    console.error('storeDefinition getter')
    return ContentLayoutStore
  }
});

Object.defineProperty(obj, 'store', {
  get: function() {
    console.error('store getter')
    if (_store) {
      console.error('already have store')
      return _store
    }

    // Create a new store object
    console.error('creating new store')
    _Vue.use(Vuex)
    _store = new Vuex.Store({
      modules: {
        contentLayout: ContentLayoutStore
      }
    });
    return _store;
  }
});

export default obj
