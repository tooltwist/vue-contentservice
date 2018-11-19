
// External libraries
import Vuex from 'vuex'
import VueHotkey from 'v-hotkey'
import VueSplit from 'vue-split-panel'
import VueFroala from 'vue-froala-wysiwyg'
import VueDragDrop from 'vue-drag-drop';
import Clipboard from 'v-clipboard'

// Our main class
//import { ContentService }  from '../lib/ContentService.js'
import ContentService  from '../lib/ContentService.js'

// Editing-related stuff.
import CrowdhoundMinimal from './CrowdhoundMinimal.vue'
import ContentContent from './ContentContent.vue'
import ContentLayoutEditor from './ContentLayoutEditor.vue'
import ContentToolbox from './ContentToolbox.vue'
import ContentPane from './ContentPane.vue'

import ContentElement from './ContentElement.vue'
import ContentElementProps from './ContentElementProps.vue'
import ContentPropertiesHeader from './ContentPropertiesHeader.vue'
import ContentChildren from './ContentChildren.vue'
import ContentContentProps from './ContentContentProps.vue'

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
import ContentContainer from './widgets/ContentContainer.vue'
import ContentContainerProps from './widgets/ContentContainerProps.vue'
import ContentFixedPositionContainer from './widgets/ContentFixedPositionContainer.vue'
import ContentFixedPositionContainerProps from './widgets/ContentFixedPositionContainerProps.vue'
import ContentColumns from './widgets/ContentColumns.vue'
import ContentColumnsProps from './widgets/ContentColumnsProps.vue'

import ContentCard from './widgets/ContentCardProps.vue'
import ContentCardProps from './widgets/ContentCardProps.vue'

// Video widgets
import ContentYoutube from './widgets/ContentYoutube.vue'
import ContentYoutubeProps from './widgets/ContentYoutubeProps.vue'
import ContentVimeo from './widgets/ContentVimeo.vue'
import ContentVimeoProps from './widgets/ContentVimeoProps.vue'

import EditBarIcons from './EditBarIcons.vue'


import ContentAdminBlogList from './ContentAdminBlogList.vue'
import ContentAdminBlogDetails from './ContentAdminBlogDetails.vue'

// Property Types
import StringProperty from './propertyTypes/StringProperty.vue'


// import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from '../lib/hierarchy'

// Our store
import ContentLayoutStore from '../store/contentLayoutStore.js'


let _Vue = null
let _content = null


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

  Vue.component('content-layout-editor', ContentLayoutEditor)
  Vue.component('content-toolbox', ContentToolbox)

  Vue.component('content-pane', ContentPane)//ZZZZZ ???

  Vue.component('content-content', ContentContent)
  Vue.component('content-content-props', ContentContentProps)
  Vue.component('content-children', ContentChildren)

  Vue.component('content-admin-blog-list', ContentAdminBlogList)
  Vue.component('content-admin-blog-details', ContentAdminBlogDetails)

  Vue.component('edit-bar-icons', EditBarIcons)

  // Register the layout element types
  // _content.registerLayoutType(Vue, 'section', 'content-section', ContentSection, ContentSectionProps)

  // Section Widget
  _content.registerWidget(Vue, {
    name: 'section',
    label: 'Section',
    category: '',
    iconClass: 'fa fa-arrows-v fas fa-arrows-alt-v contentservice-section-icon',
    iconClass5: 'fas fa-arrows-alt-v contentservice-section-icon',
    dragtype: 'component',

    // Registering for native Vue templates
    componentName: 'content-section',
    component: ContentSection,
    propertyComponent: ContentSectionProps,

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'section',
      }
    }
  })

  // Container Widget
  _content.registerWidget(Vue, {
    name: 'container',
    label: 'Container',
    category: '',
    iconClass: 'fa-arrows-h fa',
    iconClass5: 'fas fa-arrows-alt-h',
    dragtype: 'component',

    // Register native Vue templates
    componentName: 'content-container',
    component: ContentContainer,
    propertyComponent: ContentContainerProps,

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'container',
      }
    }
  })


  // Columns Widget
  _content.registerWidget(Vue, {
    name: 'columns',
    label: 'Columns',
    category: '',
    iconClass: 'fa-columns fa',
    iconClass5: 'fas fa-columns',
    dragtype: 'component',

    // Register native Vue templates
    componentName: 'content-columns',
    component: ContentColumns,
    propertyComponent: ContentColumnsProps,

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'columns',
        children: [
          {
            // Column 1
            children: [ ]
          },
          {
            // Column 2
            children: [ ]
          }
        ]
      }
    }
  })


  // Text Widget
  _content.registerWidget(Vue, {
    name: 'text',
    label: 'Text',
    category: '',
    iconClass: 'fa-font fa',
    iconClass5: 'fas fa-font',
    dragtype: 'component',

    // Register native Vue templates
    componentName: 'content-text',
    component: ContentText,
    propertyComponent: ContentTextProps,

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'froala',
        text: 'Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.',
      }
    }
  })


  // Youtube Widget
  _content.registerWidget(Vue, {
    name: 'youtube',
    label: 'Youtube',
    category: 'Video',
    iconClass: 'fa fa-youtube',
    iconClass5: 'fab fa-youtube',
    dragtype: 'component',

    // Register native Vue templates
    componentName: 'content-youtube',
    component: ContentYoutube,
    propertyComponent: ContentYoutubeProps,

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'youtube',
        //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
      }
    }
  })


  // Vimeo Widget
  _content.registerWidget(Vue, {
    name: 'vimeo',
    label: 'Vimeo',
    category: 'Video',
    iconClass: 'fa fa-vimeo',
    iconClass5: 'fab fa-vimeo',
    dragtype: 'component',

    // Register native Vue templates
    componentName: 'content-vimeo',
    component: ContentVimeo,
    propertyComponent: ContentVimeoProps,

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'vimeo',
        //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
      }
    }
  })



  // Register components that are toolbox widgets

  // _content.registerLayoutType(Vue, 'container', 'content-container', ContentContainer, ContentContainerProps)
  _content.registerLayoutType(Vue, 'element', 'content-element', ContentElement, ContentElementProps)
  // _content.registerLayoutType(Vue, 'text', 'content-text', ContentText, ContentTextProps)
  _content.registerLayoutType(Vue, 'froala', 'content-froala', ContentFroala, ContentFroalaProps)
  _content.registerLayoutType(Vue, 'html', 'content-html', ContentFroala, ContentFroalaProps)
  _content.registerLayoutType(Vue, 'field', 'content-field', ContentField, ContentFieldProps)
  _content.registerLayoutType(Vue, 'form', 'content-form', ContentForm, ContentFormProps)
  _content.registerLayoutType(Vue, 'fixed-position-container', 'content-fixed-position-container', ContentFixedPositionContainer, ContentFixedPositionContainerProps)
  // _content.registerLayoutType(Vue, 'columns', 'content-columns', ContentColumns, ContentColumnsProps)
  _content.registerLayoutType(Vue, 'layout', 'content-layout', ContentLayout, ContentLayoutProps)
  _content.registerLayoutType(Vue, 'card', 'card', ContentCard, ContentCardProps)

  // Components not in the toolbox
  Vue.component('edit-bar-icons', EditBarIcons)
  Vue.component('edit-properties-header', ContentPropertiesHeader)


  // Set up external libraries
  // hotkey
  Vue.use(VueHotkey)

  // Vue-split-panel
  Vue.use(VueSplit)

  // Froala. Unfortunately requires jQuery.
  // https://github.com/froala/vue-froala-wysiwyg
  if (typeof window != 'undefined') {
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

  // Initialise the store
  Vue.use(Vuex)
  let store = new Vuex.Store(ContentLayoutStore);
  _content.store = store

  return _content
} //- install()

const ContentServiceLib = {
  install: install,
}

//ZZZ Is this used?
Object.defineProperty(ContentServiceLib, '_content', {
  get: function() {
      return _content
  }
});


// Version 1:
// Works for full npm publish and import, but not for npm link because the
// ECM cannot import default exports, so results in errors when including
// this module in a Nuxt project:
//
//    "export 'default' (imported as 'ContentService') was not found in 'vue-contentservice'""
export default ContentServiceLib

// Version 2:
// This makes the build here decide this is ECM, which prevents
// it from importing defaults while compiling this module:
//
//    "export 'default' (imported as 'mod') was not found in '~entry'
// export const ContentServiceModule = ContentServiceLib
// export const yipyip = `yahoo`

// Version 3:
// Error :
//
//    "export 'ContentServiceModule3' was not found in 'vue-contentservice'"
// let ContentServiceModule3 = ContentServiceLib
//export default ContentServiceModule3

// Version 4
// Export as an object, containing our object.
// export default { ContentServiceModule4: ContentServiceLib }


// This is used when the npm package is included into an HTML page
if (typeof window !== "undefined" && window.Vue) {
  window.ContentService = ContentServiceLib
}
