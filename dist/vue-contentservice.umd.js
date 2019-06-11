(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-contentservice"] = factory();
	else
		root["vue-contentservice"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "001a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var core_js_modules_es6_string_anchor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ab1a");
/* harmony import */ var core_js_modules_es6_string_anchor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_anchor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d036");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mixins_ContentMixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d116");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var SAVE_MANUAL = 1;
var SAVE_LAYOUT = 2;
var SAVE_INDIVIDUAL = 3; // Prevent double keypresses

var previousTimeStamp = 0;
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'content-layout-editor',
  props: {
    // The context provides a means for a container to pass information down to the
    // elements it's contains. During editing the store is used to provide all
    // information.
    context: {
      type: Object,
      required: false
    },
    // Initial pane sizes
    rightPane: {
      required: false,
      type: Number
    },
    leftPane: {
      required: false,
      type: Number
    },
    // Option 1 - Provide a contentId, used as an anchor to select from Crowdhound
    anchor: {
      // Deprecated. Not sure if this is actually used.
      type: String,
      required: false
    },
    contentId: {
      // Use this rather than 'anchor', even though it is used as an anchor in Crowdhound.
      type: String,
      required: false
    },
    // Option 2 - Supply a pre-loaded layout
    layout: {
      type: Object,
      required: false
    },
    // Option 3 - The slot looks after itself.
    // In this case we provide a prefix and suffix that can be used by
    // any content editors within the slot.
    anchorPrefix: {
      type: String,
      required: false
    },
    anchorSuffix: {
      type: String,
      required: false
    }
  },
  data: function data() {
    return {
      // Panel sizes.
      myLeftPaneSize: 20,
      // percentage
      myRightPaneSize: 20,
      // Constants
      gutterSize: 3,
      // Do we have a layout, or are we using the slot provided by the host?
      haveLayout: false,
      // Did we pass sanity checks?
      sane: true
    };
  },
  mixins: [_mixins_ContentMixins__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]],
  watch: {
    // whenever anchor changes, this function will run
    anchor: function anchor(newContentId, oldContentId) {
      // Deprecated
      // Deprecated
      //console.error(`anchor changed from ${oldContentId} to ${newContentId}`)
      this.$content.setContent({
        vm: this,
        type: 'crowdhound',
        contentId: newContentId
      });
    },
    // whenever contentId changes, this function will run
    contentId: function contentId(newId, oldId) {
      // console.error(`contentId changed from ${oldId} to ${newId}`)
      this.$content.setContent({
        vm: this,
        type: 'crowdhound',
        contentId: newId
      });
    }
  },
  computed: {
    crowdhoundAnchor: function crowdhoundAnchor() {
      if (this.contentId) {
        return this.contentId;
      }

      if (this.anchor) {
        // Deprecated
        return this.anchor;
      }

      return null;
    },
    mycontext: function mycontext() {
      if (this.context) {
        return this.context;
      }

      return {};
    },

    /*
    saveMode: function () {
      if (this.contentdata) {
        return SAVE_MANUAL
      } else {
        if (this.anchorPrefix) {
          if (this.anchorSuffix) {
            return SAVE_LAYOUT
          } else {
            return SAVE_INDIVIDUAL
          }
         } else {
          console.error(`In layout and individual mode, anchorPrefix must be defined.`)
          return SAVE_MANUAL
        }
      }
    },
    */
    layoutAsJson: function layoutAsJson() {
      if (process.browser) {
        /*
        */
        console.log('^^^ 1', this.$content.store);
        console.log('^^^ 2', this.$content.store.state);
        console.log('^^^ 3', this.$content.store.state.layoutAsJson);
        return this.$content.util.safeJson(this.$content.store.state.layout);
      }

      return '-server side-';
    },
    propertyElementAsJson: function propertyElementAsJson() {
      if (process.browser) {
        return this.$content.util.safeJson(this.$content.store.getters.propertyElement);
      }

      return '-server side-';
    },
    hasLeftSlot: function hasLeftSlot() {
      return !!this.$slots['left-pane'];
    },
    hasRightSlot: function hasRightSlot() {
      return !!this.$slots['right-pane'];
    },
    // Style definitions for the header
    splitStyle: function splitStyle() {
      if (this.isEditing) {
        return '';
      } else {
        return '100%';
        return "height: ".concat(this.height);
      }
    },
    rightPaneStyle: function rightPaneStyle() {
      if (this.isEditing) {
        return '';
      } else {
        return "height: 0px;";
      }
    },
    propertiesSplitStyle: function propertiesSplitStyle() {
      if (this.isEditing) {
        return "width: 100%;";
      } else {
        return "width: 100%; height: 0px; position: absolute;";
      }
    },
    leftSize: function leftSize() {
      if (!this.hasLeftSlot) {
        return 0;
      }

      if (this.myLeftPaneSize < 0) {
        return 5;
      } else if (this.myLeftPaneSize > 100) {
        return 100;
      }

      return this.myLeftPaneSize;
    },
    middleSize: function middleSize() {
      var size = 100 - (this.leftSize + this.rightSize);

      if (size < 0) {
        size = 0;
      }

      return size;
    },
    rightSize: function rightSize() {
      if (this.pageEditMode === 'view' || this.pageEditMode === 'live') {
        return 0; // Hide the right pane
      }

      if (this.myRightPaneSize < 0) {
        return 5;
      }

      if (this.myRightPaneSize + this.myLeftSize > 100) {
        return 100 - this.leftSize;
      }

      return this.myRightPaneSize;
    },
    keymap: function keymap() {
      var self = this;
      return {
        'ctrl+alt+esc': {
          keydown: this.toggleEditing
        } //- 'ctrl+enter': {
        //-   keydown: this.toggleEditing
        //- },
        //- 'ctrl+alt+m': {
        //-   keydown: this.switchMode(null)
        //- },

      };
    },
    thePropertyElement: function thePropertyElement() {
      if (process.browser) {
        if (this.$content.store.state) {
          return this.$content.store.getters.propertyElement;
        } else {
          // Has contentservice been installed?
          console.error("ContentLayoutEditor: this.$content.store.state is not defined");
          return null;
        }
      }

      return null;
    }
  },
  methods: {
    toggleEditing: function toggleEditing(e) {
      // Prevent duplicate event handling.
      if (e.timeStamp === previousTimeStamp) {
        return true;
      }

      previousTimeStamp = e.timeStamp;
      this.$content.toggleEditMode();
    },
    switchMode: function switchMode(newMode) {
      // If the new mode is not specified, cycle through the editing options.
      if (!newMode) {
        // Switch based on existing mode
        var currentMode = this.$content.store.state.mode;

        switch (currentMode) {
          case 'edit':
            newMode = 'debug';
            break;

          case 'layout':
            newMode = 'debug';
            break;

          case 'debug':
            newMode = 'edit';
            break;
        }
      }

      this.$content.setEditMode({
        mode: newMode,
        previousEditMode: newMode
      });
    },
    onDragEnd: function onDragEnd(size) {
      console.log('Drag End', size); // callback new size

      if (this.hasLeftSlot) {
        // Have three panes
        this.myLeftPaneSize = size[0] > 70 ? 70 : size[0];

        if (this.rightSize > 0) {
          // i.e. The right pane is being shown
          console.log('Setting right pane size to ', size[2]);
          this.myRightPaneSize = size[2] < 10 ? 10 : size[2];
        }
      } else {
        // Only two panes
        //this.myLeftPaneSize = (size[0] > 70) ? 70 : size[0]
        if (this.rightSize > 0) {
          // i.e. The right pane is being shown
          console.log('Setting right pane size to ', size[1]);
          this.myRightPaneSize = size[1] < 10 ? 10 : size[1];
        }
      }
    },
    dump: function dump() {
      console.log('dump'); //- console.log(`contentdata=`, this.contentdata)
      //- if (this.contentdata && this.contentdata.data && this.contentdata.data.layout) {
      //-   console.log(`layout:\n`, this.contentdata.data.layout)
      //-
      //-   // Convert to a string
      //-   var json = this.$content.safeJson(this.contentdata.data.layout)
      //-
      //-   // Dump to the console
      //-   console.log(`\n\nDUMP:\n\nexport default ${json}\n\n`)
      //-
      //- }
    }
  },
  created: function created() {
    console.log("ContentLayoutEditor.created(): this.$content.store=", this.$content.store); // console.log(`ContentLayoutEditor.created(): this=`, this);
    // Sanity check

    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    } // If the user has not defined the required options, do so now.


    if (this.rightPane) {
      this.myShowRightPage = true;
    }

    if (this.rightPaneSize) {
      this.myRightPaneSize = this.rightPaneSize;
    }

    if (this.leftPaneSize) {
      this.myLeftPaneSize = this.leftPaneSize;
    } // Add a few functions


    var self = this;
    console.log("------------------------------");
    console.log("contentId=", this.crowdhoundAnchor);
    console.log("layout=", this.layout);

    if (this.contentId) {
      // Have an ID - load the content from Crowdhound
      this.$content.setContent({
        vm: this,
        type: 'crowdhound',
        contentId: this.contentId
      });
      this.haveLayout = true;
    } else if (this.anchor) {
      // Deprecated, but supported for (probably unneeded) backwards compatibility.
      console.error("ContentLayoutEditor: prop 'anchor' is deprecated. Please use 'contentId' instead.");
      this.$content.setContent({
        vm: this,
        type: 'crowdhound',
        contentId: this.anchor
      });
      this.haveLayout = true;
    } else if (this.layout) {
      // Layout is provided. The store will not load or save this layout.
      this.$content.setContent({
        vm: this,
        type: 'fixed',
        layout: this.layout
      });
      this.haveLayout = true;
    } else {
      // Incorrect props
      console.error("content-layout-editor must be provided prop 'layout' or prop 'contentId'");
    }
  } // created()

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "00dd":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.regexp.replace");

/***/ }),

/***/ "026c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroalaProps_vue_vue_type_style_index_0_id_4132244c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2246");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroalaProps_vue_vue_type_style_index_0_id_4132244c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroalaProps_vue_vue_type_style_index_0_id_4132244c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroalaProps_vue_vue_type_style_index_0_id_4132244c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0382":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0407":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentSection_vue_vue_type_style_index_0_id_93104fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e04b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentSection_vue_vue_type_style_index_0_id_93104fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentSection_vue_vue_type_style_index_0_id_93104fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentSection_vue_vue_type_style_index_0_id_93104fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "07a2":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/vue-fontawesome");

/***/ }),

/***/ "07af":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_1_id_e4932dc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c156");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_1_id_e4932dc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_1_id_e4932dc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_1_id_e4932dc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0ca7":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.string.includes");

/***/ }),

/***/ "0ed6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0ee6":
/***/ (function(module, exports) {

module.exports = require("froala-editor/css/froala_style.min.css");

/***/ }),

/***/ "0ef5":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1145":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContent_vue_vue_type_style_index_0_id_dd3c391a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("95dc");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContent_vue_vue_type_style_index_0_id_dd3c391a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContent_vue_vue_type_style_index_0_id_dd3c391a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContent_vue_vue_type_style_index_0_id_dd3c391a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "12c1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1409":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutube_vue_vue_type_style_index_0_id_06baf9c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d8fd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutube_vue_vue_type_style_index_0_id_06baf9c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutube_vue_vue_type_style_index_0_id_06baf9c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutube_vue_vue_type_style_index_0_id_06baf9c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "180b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ada0");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1918":
/***/ (function(module, exports) {

module.exports = require("vue-split-panel");

/***/ }),

/***/ "19f7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1da5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StringProperty_vue_vue_type_style_index_0_id_8eae555e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("12c1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StringProperty_vue_vue_type_style_index_0_id_8eae555e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StringProperty_vue_vue_type_style_index_0_id_8eae555e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StringProperty_vue_vue_type_style_index_0_id_8eae555e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1ea8":
/***/ (function(module, exports) {

module.exports = require("v-hotkey");

/***/ }),

/***/ "1f7e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2153":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_1_id_0718f2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ed3b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_1_id_0718f2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_1_id_0718f2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_1_id_0718f2e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2246":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2260":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "22cf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "232b":
/***/ (function(module, exports) {

module.exports = require("vue-froala-wysiwyg");

/***/ }),

/***/ "2442":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogDetails_vue_vue_type_style_index_0_id_2687d314_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f109");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogDetails_vue_vue_type_style_index_0_id_2687d314_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogDetails_vue_vue_type_style_index_0_id_2687d314_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogDetails_vue_vue_type_style_index_0_id_2687d314_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "25ac":
/***/ (function(module, exports) {

module.exports = require("froala-editor/js/froala_editor.pkgd.min.js");

/***/ }),

/***/ "25fc":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.function.name");

/***/ }),

/***/ "262e":
/***/ (function(module, exports) {

module.exports = function (vm, msg, params, e) {
  if (msg) {
    console.log("".concat(msg));
  }

  if (params) {
    console.log("params=", params);
  } // console.log('e=', e)
  // console.log('e.Error=', e.Error)
  // console.log('e.statusCode=', e.statusCode)
  // console.log('e.response=', e.response)
  // console.log('e.message=', e.message)


  if (e.message) {
    // An application error produced by:
    //  return reject(new Error('...'));
    console.error("Error: ".concat(e.message));

    if (e.stack) {
      console.log(e.stack);
    }
  } else if (e.response) {
    // An axios error
    console.log("Status: ".concat(e.response.status, " ").concat(e.response.statusText));

    if (e.response.data) {
      if (e.response.data.Error) {
        console.log("Error: ".concat(e.response.data.Error));
      }

      if (e.response.data.Code) {
        console.log("Code: ".concat(e.response.data.code));
      }

      if (e.response.data.Message) {
        console.log("Message: ".concat(e.response.data.message)); //msg = e.response.data.message
      }

      console.log('response.data: ', e.response.data);
    }
  } else {
    // Network error from browser
    // See https://github.com/axios/axios/issues/383#issuecomment-234079506
    console.error("Could not contact server.");
    console.log("Error:", e);
    msg = 'Could not communicate with server';
  } // Display an error on the screen


  if (vm && vm.$toast) {
    vm.$toast.open({
      message: "".concat(msg),
      type: 'is-danger'
    });
  } else {
    alert(msg);
  }
};

/***/ }),

/***/ "2a2c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentToolbox_vue_vue_type_style_index_0_id_1ea2ef32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5f35");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentToolbox_vue_vue_type_style_index_0_id_1ea2ef32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentToolbox_vue_vue_type_style_index_0_id_1ea2ef32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentToolbox_vue_vue_type_style_index_0_id_1ea2ef32_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2a8c":
/***/ (function(module, exports) {

module.exports = require("vue-drag-drop");

/***/ }),

/***/ "2b02":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2cd6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2dcf":
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),

/***/ "3020":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "33a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0382");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "368f":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "3801":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutubeProps_vue_vue_type_style_index_0_id_39386438_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4323");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutubeProps_vue_vue_type_style_index_0_id_39386438_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutubeProps_vue_vue_type_style_index_0_id_39386438_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentYoutubeProps_vue_vue_type_style_index_0_id_39386438_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4323":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
	setTimeout(fn, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "44d6":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es7.array.includes");

/***/ }),

/***/ "44e9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentColumns_vue_vue_type_style_index_0_id_ef05ac18_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("99a3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentColumns_vue_vue_type_style_index_0_id_ef05ac18_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentColumns_vue_vue_type_style_index_0_id_ef05ac18_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentColumns_vue_vue_type_style_index_0_id_ef05ac18_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "47c4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogListElement_vue_vue_type_style_index_0_id_d3c49d02_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("19f7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogListElement_vue_vue_type_style_index_0_id_d3c49d02_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogListElement_vue_vue_type_style_index_0_id_d3c49d02_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogListElement_vue_vue_type_style_index_0_id_d3c49d02_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4da6":
/***/ (function(module, exports) {

module.exports = function (vm, url, params, e) {
  console.log('API ERROR');
  console.log('---------v');
  var msg = 'Error calling server';
  console.error("Error calling API server:");
  console.log("".concat(url));

  if (params) {
    console.log(params);
  }

  if (e.response) {
    console.log("Status: ".concat(e.response.status, " ").concat(e.response.statusText));

    if (e.response.data) {
      if (e.response.data.Error) {
        console.log("Error: ".concat(e.response.data.Error));
      }

      if (e.response.data.Code) {
        console.log("Code: ".concat(e.response.data.code));
      }

      if (e.response.data.Message) {
        console.log("Message: ".concat(e.response.data.message));
        msg = e.response.data.message;
      }

      console.log('response.data: ', e.response.data);
    }
  } else {
    // Network error from browser
    // See https://github.com/axios/axios/issues/383#issuecomment-234079506
    console.error("Could not contact server.");
    console.log("Error:", e);
    msg = 'Could not communicate with server';
  } // Display an error on the screen


  if (vm && vm.$toast) {
    vm.$toast.open({
      message: "".concat(msg),
      type: 'is-danger'
    });
  } else {
    alert(msg);
  }
};

/***/ }),

/***/ "506b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFormProps_vue_vue_type_style_index_0_id_2f9e558d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("db6a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFormProps_vue_vue_type_style_index_0_id_2f9e558d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFormProps_vue_vue_type_style_index_0_id_2f9e558d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFormProps_vue_vue_type_style_index_0_id_2f9e558d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5880":
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),

/***/ "5a1d":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.regexp.split");

/***/ }),

/***/ "5f35":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "603e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutEditor_vue_vue_type_style_index_0_id_ccf0136a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("93a9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutEditor_vue_vue_type_style_index_0_id_ccf0136a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutEditor_vue_vue_type_style_index_0_id_ccf0136a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutEditor_vue_vue_type_style_index_0_id_ccf0136a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6186":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElementProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0ed6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElementProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElementProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElementProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6472":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6619":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.regexp.to-string");

/***/ }),

/***/ "6950":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutProps_vue_vue_type_style_index_0_id_78f28d2b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ce34");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutProps_vue_vue_type_style_index_0_id_78f28d2b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutProps_vue_vue_type_style_index_0_id_78f28d2b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayoutProps_vue_vue_type_style_index_0_id_78f28d2b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "73f4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainerProps_vue_vue_type_style_index_0_id_5741844e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a394");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainerProps_vue_vue_type_style_index_0_id_5741844e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainerProps_vue_vue_type_style_index_0_id_5741844e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFixedPositionContainerProps_vue_vue_type_style_index_0_id_5741844e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "74ef":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7578":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeo_vue_vue_type_style_index_0_id_22bbfa14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3020");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeo_vue_vue_type_style_index_0_id_22bbfa14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeo_vue_vue_type_style_index_0_id_22bbfa14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeo_vue_vue_type_style_index_0_id_22bbfa14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "792c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentField_vue_vue_type_style_index_0_id_62052e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e5b6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentField_vue_vue_type_style_index_0_id_62052e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentField_vue_vue_type_style_index_0_id_62052e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentField_vue_vue_type_style_index_0_id_62052e76_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7962":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7b0f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroala_vue_vue_type_style_index_0_id_779556e2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c3ca");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroala_vue_vue_type_style_index_0_id_779556e2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroala_vue_vue_type_style_index_0_id_779556e2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFroala_vue_vue_type_style_index_0_id_779556e2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "80a8":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/web.dom.iterable");

/***/ }),

/***/ "81fc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "86b1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayout_vue_vue_type_style_index_0_id_6c50bc7e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e09f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayout_vue_vue_type_style_index_0_id_6c50bc7e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayout_vue_vue_type_style_index_0_id_6c50bc7e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentLayout_vue_vue_type_style_index_0_id_6c50bc7e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "8cd0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_1_id_1131288b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c464");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_1_id_1131288b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_1_id_1131288b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_1_id_1131288b_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8da4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9035":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "93a9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9588":
/***/ (function(module, exports) {

module.exports = require("file-saver");

/***/ }),

/***/ "95dc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "96f5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimal_vue_vue_type_style_index_0_id_63d84ddb_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8da4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimal_vue_vue_type_style_index_0_id_63d84ddb_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimal_vue_vue_type_style_index_0_id_63d84ddb_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimal_vue_vue_type_style_index_0_id_63d84ddb_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "979d":
/***/ (function(module, exports) {

module.exports = require("v-clipboard");

/***/ }),

/***/ "99a3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9c74":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a394":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a39c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentText_vue_vue_type_style_index_0_id_9e4c78a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("22cf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentText_vue_vue_type_style_index_0_id_9e4c78a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentText_vue_vue_type_style_index_0_id_9e4c78a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentText_vue_vue_type_style_index_0_id_9e4c78a8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a79b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogList_vue_vue_type_style_index_0_id_5b5f31ee_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f49b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogList_vue_vue_type_style_index_0_id_5b5f31ee_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogList_vue_vue_type_style_index_0_id_5b5f31ee_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentAdminBlogList_vue_vue_type_style_index_0_id_5b5f31ee_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a7f2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ab1a":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.string.anchor");

/***/ }),

/***/ "ada0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "adf5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPropertiesHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6472");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPropertiesHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPropertiesHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPropertiesHeader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b0b2":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "b0e1":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.string.starts-with");

/***/ }),

/***/ "b2cb":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.promise");

/***/ }),

/***/ "b4f3":
/***/ (function(module, exports) {

module.exports = require("froala-editor/css/froala_editor.pkgd.min.css");

/***/ }),

/***/ "bb85":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimalElement_vue_vue_type_style_index_0_id_4fd87f03_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1f7e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimalElement_vue_vue_type_style_index_0_id_4fd87f03_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimalElement_vue_vue_type_style_index_0_id_4fd87f03_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrowdhoundMinimalElement_vue_vue_type_style_index_0_id_4fd87f03_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c156":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c192":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPane_vue_vue_type_style_index_0_id_23a82250_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("81fc");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPane_vue_vue_type_style_index_0_id_23a82250_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPane_vue_vue_type_style_index_0_id_23a82250_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentPane_vue_vue_type_style_index_0_id_23a82250_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c1ba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a7f2");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentElement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c1de":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentCardProps_vue_vue_type_style_index_0_id_0dcad99e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7962");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentCardProps_vue_vue_type_style_index_0_id_0dcad99e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentCardProps_vue_vue_type_style_index_0_id_0dcad99e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentCardProps_vue_vue_type_style_index_0_id_0dcad99e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c31d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentForm_vue_vue_type_style_index_0_id_02db0bb1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0ef5");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentForm_vue_vue_type_style_index_0_id_02db0bb1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentForm_vue_vue_type_style_index_0_id_02db0bb1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentForm_vue_vue_type_style_index_0_id_02db0bb1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c3ca":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c464":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c513":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeoProps_vue_vue_type_style_index_0_id_a2436d4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dd42");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeoProps_vue_vue_type_style_index_0_id_a2436d4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeoProps_vue_vue_type_style_index_0_id_a2436d4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentVimeoProps_vue_vue_type_style_index_0_id_a2436d4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c5e1":
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),

/***/ "ce34":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cebe":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "d036":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.number.constructor");

/***/ }),

/***/ "d116":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("25fc");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5a1d");
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("44d6");
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("0ca7");
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9588");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    extraDebug: function extraDebug() {
      if (this.$content) {
        return this.$content.store.state.extraDebug;
      }

      console.error('this.$content not defined');
      return true;
    },
    isEditing: function isEditing() {
      switch (this.$content.store.state.mode) {
        case 'view':
        case 'live':
          return false;
      }

      return true;
    },
    pageEditMode: function pageEditMode() {
      if (this.$content && this.$content.store.state.mode) {
        return this.$content.store.state.mode;
      }

      return 'view';
    },
    isEditMode: function isEditMode() {
      if (this.$content) {
        return this.$content.store.state.mode == 'edit';
      }

      return false;
    },
    isDesignMode: function isDesignMode() {
      if (this.$content) {
        return this.$content.store.state.mode == 'debug';
      }

      return false;
    },
    isViewMode: function isViewMode() {
      return this.isLive;
    },
    isLive: function isLive() {
      return !(this.isEditMode || this.isDesignMode);
    },
    editModeClass: function editModeClass() {
      if (this.$content && this.$content.store.state.mode) {
        // Add a class for the current editing mode
        var mode = this.$content.store.state.mode;
        var cls = "c-edit-mode-".concat(mode); // For backward compatibility (debug mode is now called design mode)

        if (cls === 'c-edit-mode-debug') {
          cls += ' c-edit-mode-design';
        } else if (cls === 'c-edit-mode-design') {
          cls += ' c-edit-mode-debug';
        } // Add property-editing-related classes, for the currently selected
        // element, and the element expanded in the properties editor.


        if (this.element) {
          if (this.element === this.$content.store.getters.propertyElement) {
            // console.log(`HEY THATS ME!!! ${this.element.id} (${this.element.type})`)
            cls += " c-selected";
          }

          if (this.element === this.$content.store.state.expandedElement) {
            cls += " c-expanded";
          }
        } // console.log(`  class: ${cls}`)


        return cls;
      }

      return 'c-edit-mode-view';
    },
    debugClass: function debugClass() {
      return this.pageEditMode === 'debug' ? 'tt-debug' : '';
    },
    showDropAreas: function showDropAreas() {
      //console.log(`++++ showDropAreas: `, this.pageEditMode)
      if (this.pageEditMode === 'layout' || this.pageEditMode === 'debug') {
        return true;
      }

      if (this.pageEditMode === 'edit' && this.$content.store.state.dragging) {
        return true;
      }

      return false;
    }
  },
  methods: {
    // Compare the page mode to a comma separated list
    isPageMode: function isPageMode(modes) {
      return modes.split(',').includes(this.pageEditMode);
    },
    selectThisElement: function selectThisElement() {
      console.log("selectThisElement()");

      if (this.pageEditMode != 'view') {
        var element = this.element;
        this.$content.setPropertyElement({
          element: element
        });
      }
    },
    copyStyle: function copyStyle(from, to, name) {
      if (from[name]) {
        to[name] = from[name];
      }
    },
    safeJSON: function safeJSON(element) {
      // Custom replacer function - gets around "TypeError: Converting circular structure to JSON"
      // Modified from http://www.johnantony.com/pretty-printing-javascript-objects-as-json/
      var replacer = function replacer(key, value) {
        // ignore parent links (they are circular)
        if (key === '_parent') {
          return;
        }

        return value;
      };

      var json = JSON.stringify(element, replacer, 4);
      return json;
    }
  }
});

/***/ }),

/***/ "d2c0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFieldProps_vue_vue_type_style_index_0_id_3b598794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2b02");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFieldProps_vue_vue_type_style_index_0_id_3b598794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFieldProps_vue_vue_type_style_index_0_id_3b598794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFieldProps_vue_vue_type_style_index_0_id_3b598794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d5e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentChildren_vue_vue_type_style_index_0_id_1e6a61f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2260");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentChildren_vue_vue_type_style_index_0_id_1e6a61f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentChildren_vue_vue_type_style_index_0_id_1e6a61f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentChildren_vue_vue_type_style_index_0_id_1e6a61f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d8fd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "db6a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dd42":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "e04b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e09f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e5b6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ed3b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f109":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f49b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f61e":
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.array.sort");

/***/ }),

/***/ "f851":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBarIcons_vue_vue_type_style_index_0_id_cc7e0da4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("74ef");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBarIcons_vue_vue_type_style_index_0_id_cc7e0da4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBarIcons_vue_vue_type_style_index_0_id_cc7e0da4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBarIcons_vue_vue_type_style_index_0_id_cc7e0da4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__("5880");
var external_vuex_default = /*#__PURE__*/__webpack_require__.n(external_vuex_);

// EXTERNAL MODULE: external "v-hotkey"
var external_v_hotkey_ = __webpack_require__("1ea8");
var external_v_hotkey_default = /*#__PURE__*/__webpack_require__.n(external_v_hotkey_);

// EXTERNAL MODULE: external "vue-split-panel"
var external_vue_split_panel_ = __webpack_require__("1918");
var external_vue_split_panel_default = /*#__PURE__*/__webpack_require__.n(external_vue_split_panel_);

// EXTERNAL MODULE: external "vue-froala-wysiwyg"
var external_vue_froala_wysiwyg_ = __webpack_require__("232b");
var external_vue_froala_wysiwyg_default = /*#__PURE__*/__webpack_require__.n(external_vue_froala_wysiwyg_);

// EXTERNAL MODULE: external "vue-drag-drop"
var external_vue_drag_drop_ = __webpack_require__("2a8c");
var external_vue_drag_drop_default = /*#__PURE__*/__webpack_require__.n(external_vue_drag_drop_);

// EXTERNAL MODULE: external "v-clipboard"
var external_v_clipboard_ = __webpack_require__("979d");
var external_v_clipboard_default = /*#__PURE__*/__webpack_require__.n(external_v_clipboard_);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/typeof.js
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}
// EXTERNAL MODULE: external "core-js/modules/es6.promise"
var es6_promise_ = __webpack_require__("b2cb");

// EXTERNAL MODULE: external "core-js/modules/web.dom.iterable"
var web_dom_iterable_ = __webpack_require__("80a8");

// EXTERNAL MODULE: external "core-js/modules/es6.array.sort"
var es6_array_sort_ = __webpack_require__("f61e");

// EXTERNAL MODULE: external "core-js/modules/es6.function.name"
var es6_function_name_ = __webpack_require__("25fc");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("cebe");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: ./src/lib/axiosError.js
var axiosError = __webpack_require__("4da6");
var axiosError_default = /*#__PURE__*/__webpack_require__.n(axiosError);

// EXTERNAL MODULE: external "query-string"
var external_query_string_ = __webpack_require__("2dcf");

// EXTERNAL MODULE: external "core-js/modules/es6.regexp.to-string"
var es6_regexp_to_string_ = __webpack_require__("6619");

// CONCATENATED MODULE: ./src/components/misc.js


/* @ f low */
//module.exports.assert = function (condition, message) {
function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-contentservice] ".concat(message));
  }
}
function warn(condition, message) {
  if (false) {}
}
function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}
var inBrowser = typeof window !== 'undefined';
// CONCATENATED MODULE: ./src/lib/ContentService.js








/* @flZZow */

/*
 *  Client API for Contentservice.io
 *  See https://contentservice.io
 */



 // const debug = process.env.NODE_ENV !== 'production'

var NETWORK_ERROR_MSG = 'Could not contact authentication server';

var ContentService_Contentservice =
/*#__PURE__*/
function () {
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
  function Contentservice(options) {
    var _this = this;

    _classCallCheck(this, Contentservice);

    if (!options) {
      console.error("Contentservice was passed null options, so will be disabled.");
      this.disabled = true;
      return;
    }

    this.disabled = false;
    console.log('&&& Contentservice constructor', options);
    this.protocol = options.protocol ? options.protocol : 'https';
    this.host = options.host ? options.host : 'api.contentservice.io';

    if (options.port) {
      this.port = options.port;
    } else if (this.protocol == 'http') {
      this.port = 80;
    } else {
      this.port = 443;
    }

    this.version = options.version ? options.version : '2.0';
    this.apikey = options.apikey;
    this.knownElementTypes = []; // Decide which icon set to use with a defaultIconPack option.
    // Loosely based on:
    //    https://buefy.github.io/#/documentation/constructor-options
    //
    // Currently recognise:
    //    fa (font-awsome 4)
    //    fas (font-awsome 5)

    this.defaultIconPack = options.defaultIconPack ? options.defaultIconPack : 'fa';

    this.icons = function (pack) {
      return _this.defaultIconPack === pack;
    };

    if (options.defaultIconPack) {
      console.log("Will use icon pack ".concat(options.defaultIconPack));
    }

    console.log("---> icons ---> ".concat(this.defaultIconPack)); // Remember the options

    this.options = options; // Current user details
    // this.user = null
    // this.jwt = null
    // this.fromCache = false
  } // init (app: any /* Vue component instance */) {


  _createClass(Contentservice, [{
    key: "init",
    value: function init(app
    /* Vue component instance */
    ) {
      console.log('&&& ContentService.init'); // VVVVV This does not seem to be called
      // alert('za init()')

      false && false;
    }
  }, {
    key: "endpoint",
    value: function endpoint() {
      var endpoint = "".concat(this.protocol, "://").concat(this.host, ":").concat(this.port, "/api/").concat(this.version, "/").concat(this.apikey);
      console.log("endpoint(): ".concat(endpoint));
      return endpoint;
    }
  }, {
    key: "registerLayoutType",
    value: function registerLayoutType(vm, layoutType, componentName, component, propertyComponent) {
      var propertyComponentName = "".concat(componentName, "-props"); // Remember the component names used for this type of layout element.

      this.knownElementTypes[layoutType] = {
        layoutType: layoutType,
        label: layoutType,
        name: layoutType,
        category: '',
        componentName: componentName,
        propertyComponentName: propertyComponentName,
        component: component,
        propertyComponent: propertyComponent // Define the components
        // console.log(`registering non-toolbox widget ${componentName}`)

      };
      vm.component(componentName, component);
      vm.component(propertyComponentName, propertyComponent);
    } // -> { component, propertyComponent }

  }, {
    key: "getLayoutType",
    value: function getLayoutType(layoutType) {
      //console.error(`getLayoutType(${layoutType})`)
      return this.knownElementTypes[layoutType];
    }
  }, {
    key: "registerWidget",
    value: function registerWidget(vm, _ref) {
      var name = _ref.name,
          label = _ref.label,
          category = _ref.category,
          iconClass = _ref.iconClass,
          iconClass5 = _ref.iconClass5,
          componentName = _ref.componentName,
          component = _ref.component,
          propertyComponent = _ref.propertyComponent,
          data = _ref.data;

      //console.error(`registerWidget(${name}, ${category})`)
      if (!label) {
        label = name;
      }

      if (!category) {
        category = '';
      }

      var propertyComponentName = "".concat(componentName, "-props"); // Remember the component names used for this type of layout element.

      this.knownElementTypes[name] = {
        layoutType: name,
        //ZZZ
        name: name,
        label: label,
        category: category,
        iconClass: iconClass,
        iconClass5: iconClass5,
        componentName: componentName,
        propertyComponentName: propertyComponentName,
        component: component,
        propertyComponent: propertyComponent,
        // The definition used when creating a new component.
        data: data,
        dragtype: 'component' // Define the components
        // console.log(`registering toolbox widget ${componentName}`)

      };
      vm.component(componentName, component);
      vm.component(propertyComponentName, propertyComponent);
    }
  }, {
    key: "toolboxCategories",
    value: function toolboxCategories() {
      var categories = []; // category -> { type[] }

      for (var name in this.knownElementTypes) {
        if (this.knownElementTypes.hasOwnProperty(name)) {
          var type = this.knownElementTypes[name]; //console.error(`Add tool ${name}`, type);

          var categoryRec = categories[type.category]; //console.log(`category = ${type.category}`, categoryRec);

          if (!categoryRec) {
            categoryRec = {
              name: type.category,
              types: [] //console.error(`Add category ${type.category}`);

            };
            categories[type.category] = categoryRec;
          }

          categoryRec.types[name] = type;
        }
      } //console.error(`Toolbox Types - `, categories);
      // Convert categories to an array and sort


      var arr = [];

      for (var categoryName in categories) {
        var category = categories[categoryName];
        arr.push(category);
      }

      categories = arr;
      categories.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return +1;
        return 0;
      }); // Sort categories
      // Convert the types in each category to an array

      categories.forEach(function (category) {
        var arr = [];

        for (var name in category.types) {
          if (category.types.hasOwnProperty(name)) {
            var _type = category.types[name];
            arr.push(_type);
          }
        }

        category.types = arr;
      });
      return categories;
    } //----------------------------------------------------------------------------//
    //                  WRAPPERS FOR STORE ACTIONS AND MUTATIONS                  //
    //----------------------------------------------------------------------------//
    // Same parameters as contentLayoutStore.setContent
    // Action

  }, {
    key: "setContent",
    value: function setContent(params) {
      this.store.dispatch('setContentAction', params);
    } // Same parameters as contentLayoutStore.deleteElementAction
    // Action

  }, {
    key: "deleteElement",
    value: function deleteElement(params) {
      this.store.dispatch('deleteElementAction', params);
    } // Same parameters as contentLayoutStore.insertLayoutAction
    // Action

  }, {
    key: "insertLayout",
    value: function insertLayout(params) {
      this.store.dispatch('insertLayoutAction', params);
    } // Same parameters as contentLayoutStore.moveChildAction
    // Action

  }, {
    key: "moveChild",
    value: function moveChild(params) {
      this.store.dispatch('moveChildAction', params);
    } // Same parameters as contentLayoutStore.setProperty
    // Action

  }, {
    key: "setProperty",
    value: function setProperty(_ref2) {
      var vm = _ref2.vm,
          element = _ref2.element,
          name = _ref2.name,
          value = _ref2.value,
          save = _ref2.save;
      this.store.dispatch('setPropertyAction', {
        vm: vm,
        element: element,
        name: name,
        value: value,
        save: save
      });
    } // Same parameters as contentLayoutStore.setPropertyInElement
    // Mutation

  }, {
    key: "setPropertyInElement",
    value: function setPropertyInElement(_ref3) {
      var vm = _ref3.vm,
          element = _ref3.element,
          name = _ref3.name,
          value = _ref3.value;
      console.log("$content.setPropertyInElement", vm, element, name, value);
      this.store.commit('setPropertyInElementMutation', {
        vm: vm,
        element: element,
        name: name,
        value: value
      });
    } // This is only here, to match the setProperty functions.

  }, {
    key: "getProperty",
    value: function getProperty(_ref4) {
      var element = _ref4.element,
          name = _ref4.name,
          defaultValue = _ref4.defaultValue;

      if (element.hasOwnProperty(name)) {
        return element[name];
      }

      if (typeof defaultValue !== 'undefined') {
        return defaultValue;
      }

      return undefined;
    } // Same parameters as contentLayoutStore.setLayout
    // Mutation

  }, {
    key: "setLayout",
    value: function setLayout(params) {
      this.store.commit('setLayout', params);
    } // Same parameters as contentLayoutStore.setPropertyElement
    // Mutation

  }, {
    key: "setPropertyElement",
    value: function setPropertyElement(params) {
      this.store.commit('setPropertyElementMutation', params);
    } // Same parameters as contentLayoutStore.setExpandedElement
    // Mutation

  }, {
    key: "setExpandedElement",
    value: function setExpandedElement(params) {
      this.store.commit('setExpandedElementMutation', params);
    } // Same parameters as contentLayoutStore.setEditMode
    // Mutation

  }, {
    key: "setEditMode",
    value: function setEditMode(params) {
      this.store.commit('setEditMode', params);
    } // Toggle between view and {edit|layout|debug}

  }, {
    key: "toggleEditMode",
    value: function toggleEditMode() {
      // When we switch to view mode, we remember which of the edit modes
      // we were in, so we can toggle back to the same mode.
      var mode = this.store.state.mode;
      var previousEditMode = this.store.state.previousEditMode;

      if (mode === 'view') {
        // Switch to one of the edit modes
        console.log(" - toggle to ".concat(previousEditMode));
        this.setEditMode({
          mode: previousEditMode
        });
      } else {
        // Switch back to view mode
        console.log(" - toggle to view mode");
        this.setEditMode({
          mode: 'view',
          previousEditMode: mode
        });
      }
    } // Same parameters as contentLayoutStore.setSaveMsg
    // Mutation

  }, {
    key: "setSaveMsg",
    value: function setSaveMsg(params) {
      this.store.commit('setSaveMsg', params);
    } // Same parameters as contentLayoutStore.updateElementPropertyMutation
    // Mutation

  }, {
    key: "updateElementProperty",
    value: function updateElementProperty(params) {
      this.store.commit('updateElementProperty', params);
    } // Same parameters as contentLayoutStore.insertLayoutMutation
    // Mutation

  }, {
    key: "insertLayoutMutation",
    value: function insertLayoutMutation(params) {
      this.store.commit('insertLayoutMutation', params);
    } // Same parameters as contentLayoutStore.deleteElement
    // Mutation

  }, {
    key: "deleteElementMutation",
    value: function deleteElementMutation(params) {
      this.store.commit('deleteElementMutation', params);
    } // Same parameters as contentLayoutStore.refresh
    // Mutation

  }, {
    key: "refresh",
    value: function refresh() {
      this.store.commit('refreshMutation', {});
    } //----------------------------------------------------------------------------//
    //                          NEW STUFF FROM CROWDHOUND                         //
    //----------------------------------------------------------------------------//

    /**
      *	Select may be in various formats:
     *		select(vm, '$my-anchor', 'user-list') - select a thread by it's anchor and anchorType.
     *		select(vm, rootId) - select a thread. Anchor will NOT be created if it doesn't exist.
     *		select(vm, params)
     */

  }, {
    key: "select",
    value: function select(vm, param1, param2) {
      var _this2 = this,
          _arguments = arguments;

      return new Promise(function (resolve, reject) {
        if (_this2.options.debug) {
          console.log('select()');
        }

        if (_this2.disabled) {
          return reject(new Error('contentservice disabled'));
        } // Work out what combination of parameters we've been passed


        var type1 = _typeof(param1);

        var type2 = _typeof(param2);

        var type3 = typeof param3 === "undefined" ? "undefined" : _typeof(param3);

        if (_arguments.length === 3) {
          // Short form:  select(vm, anchor, anchorType)
          // Check the anchor starts with $
          var anchor = param1;
          var anchorType = param2;

          if (typeof anchor != 'string') {
            console.log('CrowdHound.select: anchor must be a string: ' + anchor + ', ' + _typeof(anchor));
            return reject(new Error('invalid anchor parameter'));
          }

          if (anchor.charAt(0) != '$') {
            console.log('CrowdHound.select: anchor must start with \'$\': ' + anchor);
            return reject(new Error('invalid anchor parameter - must start with \'$\''));
          }

          if (typeof anchorType != 'string') {
            console.log('CrowdHound.select: anchorType must be a string: ' + anchorType + ', ' + _typeof(anchorType));
            return reject(new Error('invalid anchor parameter'));
          }

          console.log('select anchor');
          var params = {
            elementId: anchor,
            type: anchorType
          };
        } else if (_arguments.length === 2) {
          if (type1 == 'object') {
            // select(vm, params)
            var params = param1;
          } else {
            // select(vm, rootId) - select a thread. Anchor will NOT be created if it doesn't exist.
            var params = {
              elementId: '' + param1
            };
          }
        } else {
          reject('Unknown parameters to CrowdHound.select'); // if (type1 == 'function') {
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
        } //var elementType = 'file';
        //		var url = _API_URL + '/elements?type=' + elementType;


        var url = "".concat(_this2.endpoint(), "/elements"); // url = addAuthenticationToken(url);

        if (_this2.options.debug) {
          console.log('URL= ' + url);
        }

        console.log('CrowdHound.select()');
        console.log('  url=' + url);
        console.log('  params=', params);
        external_axios_default()({
          method: 'get',
          url: url,
          headers: {
            // 'Authorization': 'Bearer ' + this.$contentservice.jwt,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          params: params
        }).then(function (response) {
          // JSON responses are automatically parsed.
          //console.log(`RESPONSE IS`, response.data)
          var reply = response.data; // If the first item in the array is the current user, pluck it off the array now.

          var userdata = null;

          if (reply instanceof Array && reply.length > 0 && reply[0].__currentUser) {
            userdata = reply[0];
            reply.shift(); // remove from the array
          }

          var selection = {
            cooked: false,
            params: params,
            elements: reply
          };
          return resolve(selection);
        }).catch(function (e) {
          axiosError_default()(vm, url, params, e);
          reject(e);
        });
      }); // new promise
    } //- select()

    /*
     *  Update an existing element.
     *	If an anchor and a type is provided, the element will be created
     *	if it does not already exist.
     */

  }, {
    key: "update",
    value: function update(vm, element) {
      var _this3 = this;

      console.log("ContentService.js:update()", element);
      console.log("element.description.length=", element.description.length);
      return new Promise(function (resolve, reject) {
        if (_this3.options.debug) {
          console.log('select()');
        }

        if (_this3.disabled) {
          return reject(new Error('contentservice disabled'));
        }

        var url = "".concat(_this3.endpoint(), "/element"); //let params = element

        external_axios_default()({
          method: 'put',
          url: url,
          headers: {
            // 'Authorization': 'Bearer ' + this.$contentservice.jwt,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: element
        }).then(function (response) {
          // JSON responses are automatically parsed.
          //console.log(`RESPONSE IS`, response.data)
          // let reply = response.data
          return resolve('ok');
        }).catch(function (e) {
          axiosError_default()(vm, url, element, e);
          reject(e);
        });
      }); //- promise
    } // update()

  }]);

  return Contentservice;
}();

/* harmony default export */ var ContentService = (ContentService_Contentservice);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CrowdhoundMinimal.vue?vue&type=template&id=63d84ddb&scoped=true&lang=pug&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',{staticClass:"content-dummy"},[_c('crowdhound-minimal-element',{attrs:{"element":_vm.element,"level":0}})],1):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CrowdhoundMinimal.vue?vue&type=template&id=63d84ddb&scoped=true&lang=pug&

// EXTERNAL MODULE: external "core-js/modules/es6.string.anchor"
var es6_string_anchor_ = __webpack_require__("ab1a");

// EXTERNAL MODULE: ./src/lib/handleError.js
var lib_handleError = __webpack_require__("262e");
var handleError_default = /*#__PURE__*/__webpack_require__.n(lib_handleError);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CrowdhoundMinimalElement.vue?vue&type=template&id=4fd87f03&scoped=true&lang=pug&
var CrowdhoundMinimalElementvue_type_template_id_4fd87f03_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"crowdhound-comment"},[(_vm.element)?_c('div',{staticClass:"surround"},[_vm._v(_vm._s(_vm.level)+": #"+_vm._s(_vm.element.id)+" #"+_vm._s(_vm.element.rootId)+" "+_vm._s(_vm.element.status)+" ("+_vm._s(_vm.element.type)+")"),_c('br'),_vm._v("description = "+_vm._s(_vm.element.description)),_c('br'),_vm._v("summary = "+_vm._s(_vm.element.summary)),_c('br'),_vm._v("title = "+_vm._s(_vm.element.title)),_c('br'),_vm._l((_vm.element.children),function(child){return _c('div',[_c('crowdhound-minimal-element',{attrs:{"element":child,"level":_vm.level + 1}})],1)})],2):_vm._e()])}
var CrowdhoundMinimalElementvue_type_template_id_4fd87f03_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CrowdhoundMinimalElement.vue?vue&type=template&id=4fd87f03&scoped=true&lang=pug&

// EXTERNAL MODULE: external "core-js/modules/es6.number.constructor"
var es6_number_constructor_ = __webpack_require__("d036");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CrowdhoundMinimalElement.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CrowdhoundMinimalElementvue_type_script_lang_js_ = ({
  name: 'crowdhound-minimal-element',
  props: {
    element: Object,
    level: Number
  }
});
// CONCATENATED MODULE: ./src/components/CrowdhoundMinimalElement.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CrowdhoundMinimalElementvue_type_script_lang_js_ = (CrowdhoundMinimalElementvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CrowdhoundMinimalElement.vue?vue&type=style&index=0&id=4fd87f03&scoped=true&lang=scss&
var CrowdhoundMinimalElementvue_type_style_index_0_id_4fd87f03_scoped_true_lang_scss_ = __webpack_require__("bb85");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/CrowdhoundMinimalElement.vue






/* normalize component */

var component = normalizeComponent(
  components_CrowdhoundMinimalElementvue_type_script_lang_js_,
  CrowdhoundMinimalElementvue_type_template_id_4fd87f03_scoped_true_lang_pug_render,
  CrowdhoundMinimalElementvue_type_template_id_4fd87f03_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "4fd87f03",
  null
  
)

component.options.__file = "CrowdhoundMinimalElement.vue"
/* harmony default export */ var CrowdhoundMinimalElement = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CrowdhoundMinimal.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//



/* harmony default export */ var CrowdhoundMinimalvue_type_script_lang_js_ = ({
  name: 'crowdhound-minimal',
  components: {
    CrowdhoundMinimalElement: CrowdhoundMinimalElement
  },
  props: {
    contentId: String,
    anchor: String // Deprecated

  },
  data: function data() {
    return {
      element: null,
      selectError: false,
      // Did we pass sanity checks?
      sane: true
    };
  },
  watch: {
    anchor: function anchor(newContentId, oldContentId) {
      // Deprecated
      this.load();
    },
    contentId: function contentId(newContentId, oldContentId) {
      this.load();
    }
  },
  methods: {
    // Select the elements from the server
    load: function load() {
      var _this = this;

      if (this.$content.disabled) {
        console.error('Contentservice disabled');
        return;
      } // Select the elements


      var params = {
        elementId: this.contentId ? this.contentId : this.anchor,
        withChildren: true
      };
      this.$content.select(this, params).then(function (result) {
        // Use the elements
        if (result.elements.length > 0) {
          _this.element = result.elements[0];
        } else {
          _this.element = null;
        }
      }).catch(function (e) {
        var desc = "Error loading comments";
        handleError_default()(_this, desc, params, e);
        _this.selectError = true;
      });
    }
  },
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("CrowdhoundMinimal.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }

    this.load();
  }
});
// CONCATENATED MODULE: ./src/components/CrowdhoundMinimal.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CrowdhoundMinimalvue_type_script_lang_js_ = (CrowdhoundMinimalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CrowdhoundMinimal.vue?vue&type=style&index=0&id=63d84ddb&scoped=true&lang=scss&
var CrowdhoundMinimalvue_type_style_index_0_id_63d84ddb_scoped_true_lang_scss_ = __webpack_require__("96f5");

// CONCATENATED MODULE: ./src/components/CrowdhoundMinimal.vue






/* normalize component */

var CrowdhoundMinimal_component = normalizeComponent(
  components_CrowdhoundMinimalvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "63d84ddb",
  null
  
)

CrowdhoundMinimal_component.options.__file = "CrowdhoundMinimal.vue"
/* harmony default export */ var CrowdhoundMinimal = (CrowdhoundMinimal_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentContent.vue?vue&type=template&id=dd3c391a&scoped=true&lang=pug&
var ContentContentvue_type_template_id_dd3c391a_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',[_c('div',{staticClass:"tt-content",class:_vm.classForMode,attrs:{"zclass":_vm.pageEditMode === 'view' ? 'tt-mode-view' : ''}},[_vm._v("<content-content("),(_vm.contentId)?_c('span',[_vm._v(" contentId")]):_vm._e(),(_vm.layout)?_c('span',[_vm._v(" layout")]):_vm._e(),_vm._v(" )>"),_c('br'),(_vm.pageEditMode=='debug')?_c('div',{staticClass:"debug"},[_vm._v("content")]):_vm._e(),(_vm.sanitizedContentComp)?_c('div',{staticClass:"tt-content-layout"},[_c('content-children',{attrs:{"element":_vm.$content.store.state.layout}})],1):_vm._e()])]):_vm._e()}
var ContentContentvue_type_template_id_dd3c391a_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentContent.vue?vue&type=template&id=dd3c391a&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentContent.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ContentContentvue_type_script_lang_js_ = ({
  name: 'content-content',
  props: {
    /*
     *  Three types of editing:
     *  1. manual
     *      The Layout is provided. Does not get saved to Crowdhound.
     *      - require layout
     *  2. 'layout'
     *      Layout stored in Crowdhound
     *      - require contentId
     *
     *  ZZZZZ INDIVIDUAL NO LONGER USED
     *  3. 'individual'
     *      There is no Layout. Components will need to save themselves.
     *      - require anchorPrefix
     */
    type: {
      // Not to be confused with pageEditMode.
      type: String,
      required: true
    },
    layout: Object,
    contentId: String,
    // deprecate this. ZZZZ
    contentdata: Object //element: Object,

  },
  data: function data() {
    return {
      // Did we pass sanity checks?
      sane: true
    };
  },
  computed: {
    dump: function dump() {
      return this.$content.elementToJson(this.contentdata.layout);
    },
    // Add a class, according to the current edit mode.
    classForMode: function classForMode() {
      switch (this.pageEditMode) {
        case 'view':
          return 'tt-mode-view';

        case 'edit':
          return 'tt-mode-edit';

        case 'layout':
          return 'tt-mode-layout';

        case 'debug':
          return 'tt-mode-debug';

        case 'live':
          return 'tt-mode-live';
      }
    },
    sanitizedContentComp: function sanitizedContentComp() {
      if (this.$content && this.contentdata && this.contentdata.data && this.contentdata.data.layout) {
        //- console.log('--- 1', this.$content)
        //- console.log('--- 2', this.$content.util)
        //- console.log('--- 3', this.$content.util.sanitizeLayout)
        var sanitized = this.$content.util.sanitizeLayout(this.contentdata.data.layout); //console.log('sanitized:', typeof(sanitized))
        //console.log('sanitized:', sanitized)

        return sanitized; // sanitized.tt_counter = 987
        // this.sanitizedContent = sanitized
        // console.log(`111: ${this.sanitizedContent.tt_counter}`)
        // console.log('Content.created(): sanitizedContent', this.sanitizedContent)
      } else {
        console.error('content-content: missing contentdata.data.layout');
        return {};
      }
    }
  },
  methods: {},
  created: function created() {
    console.error("------------------------------");
    console.log("contentId=", this.contentId);
    console.log("layout=", this.layout); // Sanity check

    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }

    if (this.contentId) {
      // Have a contentId - load the content from Crowdhound
      this.$content.setContent({
        vm: this,
        type: 'crowdhound',
        contentId: this.contentId
      });
    } else if (this.layout) {
      // Layout is provided. The store will not load or save this layout.
      this.$content.setContent({
        vm: this,
        type: 'fixed',
        layout: this.layout
      });
    } else {
      // Incorrect props
      console.error("content-content must be provided prop 'layout' or prop 'contentId'");
    }
  }
});
// CONCATENATED MODULE: ./src/components/ContentContent.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentContentvue_type_script_lang_js_ = (ContentContentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentContent.vue?vue&type=style&index=0&id=dd3c391a&lang=scss&scoped=true&
var ContentContentvue_type_style_index_0_id_dd3c391a_lang_scss_scoped_true_ = __webpack_require__("1145");

// CONCATENATED MODULE: ./src/components/ContentContent.vue






/* normalize component */

var ContentContent_component = normalizeComponent(
  components_ContentContentvue_type_script_lang_js_,
  ContentContentvue_type_template_id_dd3c391a_scoped_true_lang_pug_render,
  ContentContentvue_type_template_id_dd3c391a_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "dd3c391a",
  null
  
)

ContentContent_component.options.__file = "ContentContent.vue"
/* harmony default export */ var ContentContent = (ContentContent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentLayoutEditor.vue?vue&type=template&id=ccf0136a&scoped=true&lang=pug&
var ContentLayoutEditorvue_type_template_id_ccf0136a_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',[_c('Split',{directives:[{name:"hotkey",rawName:"v-hotkey",value:(_vm.keymap),expression:"keymap"}],staticClass:"c-layout-editor",class:[ { 'c-editing-layout': _vm.isEditing }, {'c-not-editing-layout': !_vm.isEditing}, {'c-has-left-pane': _vm.hasLeftSlot}, {'c-no-left-pane': !_vm.hasLeftSlot} ],style:(_vm.splitStyle),attrs:{"gutterSize":_vm.gutterSize},on:{"onDragEnd":_vm.onDragEnd}},[(_vm.hasLeftSlot)?_c('SplitArea',{staticClass:"c-left-pane",attrs:{"size":_vm.leftSize}},[_vm._t("left-pane")],2):_vm._e(),_c('SplitArea',{staticClass:"c-middle-pane",attrs:{"size":_vm.middleSize}},[(_vm.pageEditMode !== 'view')?_c('div',{staticClass:"c-editbar",on:{"click":function($event){$event.stopPropagation();_vm.switchMode(null)}}},[_c('div',{staticClass:"c-editbar-contentId"},[_vm._v(_vm._s(_vm.crowdhoundAnchor))]),_c('div',{staticClass:"c-editbar-right"},[_vm._v(_vm._s(_vm.$content.store.state.saveMsg))]),(_vm.pageEditMode==='edit' || _vm.pageEditMode==='layout' || _vm.pageEditMode==='debug')?_c('div',{staticClass:"c-editbar-mode-label"},[_c('span',{class:_vm.pageEditMode==='edit' ? 'c-selected-mode-style': '',on:{"click":function($event){$event.stopPropagation();_vm.switchMode('edit')}}},[_vm._v("edit")]),_vm._v(" / "),_c('span',{class:_vm.pageEditMode==='debug' ? 'c-selected-mode-style': '',on:{"click":function($event){$event.stopPropagation();_vm.switchMode('debug')}}},[_vm._v("design")])]):_c('div',{staticClass:"c-editbar-mode-label"},[_vm._v(_vm._s(_vm.pageEditMode)+" mode")])]):_vm._e(),_c('div',{staticClass:"c-middle-pane-content"},[(_vm.haveLayout)?_c('content-children',{attrs:{"element":_vm.$content.store.state.layout,"context":_vm.mycontext}}):_c('div',[_vm._t("middle-pane"),_vm._t("default")],2)],1)]),_c('SplitArea',{staticClass:"c-right-pane",style:(_vm.rightPaneStyle),attrs:{"zv-show":"rightSize > 0","size":_vm.rightSize,"minSize":_vm.rightSize > 0 ? 200 : 0}},[(_vm.hasRightSlot)?_vm._t("right-pane"):_c('Split',{style:(_vm.propertiesSplitStyle),attrs:{"direction":'vertical',"gutterSize":_vm.gutterSize}},[_c('SplitArea',{staticClass:"c-properties-pane",attrs:{"size":40,"minSize":300}},[_c('h1',{staticClass:"title"},[_vm._v("Properties")]),_c('content-element-props',{attrs:{"level":0}})],1),_c('SplitArea',{staticClass:"c-components-pane",attrs:{"size":60,"minSize":150}},[_c('h1',{staticClass:"title"},[_vm._v("Toolbox")]),_c('content-toolbox')],1)],1)],2)],1)],1):_vm._e()}
var ContentLayoutEditorvue_type_template_id_ccf0136a_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentLayoutEditor.vue?vue&type=template&id=ccf0136a&scoped=true&lang=pug&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentLayoutEditor.vue?vue&type=script&lang=js&
var ContentLayoutEditorvue_type_script_lang_js_ = __webpack_require__("001a");

// CONCATENATED MODULE: ./src/components/ContentLayoutEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentLayoutEditorvue_type_script_lang_js_ = (ContentLayoutEditorvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/components/ContentLayoutEditor.vue?vue&type=style&index=0&id=ccf0136a&lang=scss&scoped=true&
var ContentLayoutEditorvue_type_style_index_0_id_ccf0136a_lang_scss_scoped_true_ = __webpack_require__("603e");

// CONCATENATED MODULE: ./src/components/ContentLayoutEditor.vue






/* normalize component */

var ContentLayoutEditor_component = normalizeComponent(
  components_ContentLayoutEditorvue_type_script_lang_js_,
  ContentLayoutEditorvue_type_template_id_ccf0136a_scoped_true_lang_pug_render,
  ContentLayoutEditorvue_type_template_id_ccf0136a_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "ccf0136a",
  null
  
)

ContentLayoutEditor_component.options.__file = "ContentLayoutEditor.vue"
/* harmony default export */ var ContentLayoutEditor = (ContentLayoutEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentToolbox.vue?vue&type=template&id=1ea2ef32&scoped=true&lang=pug&
var ContentToolboxvue_type_template_id_1ea2ef32_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',{staticClass:"toolbox-pane"},[_c('div',{staticClass:"my-components"},_vm._l((this.$content.toolboxCategories()),function(cat){return _c('div',{staticClass:"my-category"},[_c('div',{staticClass:"my-category-name"},[_vm._v(_vm._s(cat.name))]),_vm._l((cat.types),function(type){return (type.dragtype == 'component')?_c('div',{staticClass:"my-widget"},[_c('drag',{staticClass:"my-drag",attrs:{"transfer-data":type},on:{"dragstart":_vm.dragStart,"dragend":_vm.dragStop}},[_c('div',{staticClass:"my-image",class:_vm.iconClass(type)})]),_c('div',{staticClass:"my-component-label",style:(_vm.labelStyle(type.label))},[_vm._v(_vm._s(type.label))])],1):_vm._e()})],2)})),_vm._m(0)]):_vm._e()}
var ContentToolboxvue_type_template_id_1ea2ef32_scoped_true_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accreditation"},[_vm._v("(icons courtesy of "),_c('a',{attrs:{"href":"https://icons8.com","target":"_blank"}},[_vm._v("icons8.com")]),_vm._v(")")])}]


// CONCATENATED MODULE: ./src/components/ContentToolbox.vue?vue&type=template&id=1ea2ef32&scoped=true&lang=pug&

// EXTERNAL MODULE: external "core-js/modules/es6.regexp.split"
var es6_regexp_split_ = __webpack_require__("5a1d");

// CONCATENATED MODULE: ./src/lib/toolbox.conf.js
// This file contains definitions of the components
// that may be dragged onto a page layout.
// Icons:
// https://fontawesome.com/v4.7.0/icons/
// https://fontawesome.com/v4.7.0/cheatsheet/
/* harmony default export */ var toolbox_conf = ([// Section

/*
{
  dragtype:'component',
  name: 'section',
  iconClass: 'fa-arrows-v fa',
  iconClass5: 'fas fa-arrows-alt-v',
   element: {
    type: 'section',
  },
   // Identical structure to a CUT or COPY from edit mode.
  data: {
    type: "contentservice.io",
    version: "1.0",
    source: "toolbox",
    layout: {
      type: 'section',
    }
  },
},
 // Container
{
  dragtype:'component',
  name: 'container',
  iconClass: 'fa-arrows-h',
  iconClass5: 'fas fa-arrows-alt-h',
  element: {
    type: 'container',
  },
   // Identical structure to a CUT or COPY from edit mode.
  data: {
    type: "contentservice.io",
    version: "1.0",
    source: "toolbox",
    layout: {
      type: 'container',
    }
  }
},
*/
// FixedPositionContainer
{
  dragtype: 'component',
  name: 'fixed-position-container',
  iconClass: 'fa-arrows-h',
  iconClass5: 'fas fa-arrows-alt-h',
  element: {
    type: 'fixed-position-container'
  },
  // Identical structure to a CUT or COPY from edit mode.
  data: {
    type: "contentservice.io",
    version: "1.0",
    source: "toolbox",
    layout: {
      type: 'fixed-position-container'
    }
  }
}]);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentToolbox.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentToolboxvue_type_script_lang_js_ = ({
  name: 'tooltwist-layout',
  props: {
    layout: Object,
    editable: String,
    toolbox: Object
  },
  data: function data() {
    return {
      theToolbox: {},
      // Did we pass sanity checks?
      sane: true
    };
  },
  methods: {
    iconClass: function iconClass(tool) {
      //console.log(`iconClass()`, tool)
      if (this.$content) {
        if (this.$content.icons('fa')) {
          // Use FontAwesome version 4
          if (typeof tool.iconClass === 'string') {
            var arr = tool.iconClass.split(' ');
            var set = 'fa';
            var i;

            if ((i = arr.indexOf('fa')) > -1) {
              set = arr[i];
              arr.splice(i, 1);
            }

            var size = 'fa-2x';

            if ((i = arr.indexOf('fa-2x')) > -1 || (i = arr.indexOf('fa-3x')) > -1 || (i = arr.indexOf('fa-4x')) > -1 || (i = arr.indexOf('fa-5x')) > -1) {
              size = arr[i];
              arr.splice(i, 1);
            }

            arr.push(set);
            arr.push(size);
            return arr;
          }

          return ['fa', 'fa-2x', 'fa-word-file-o'];
        } else {
          // Probably use FontAwesome version 5
          if (typeof tool.iconClass5 === 'string') {
            var _arr = tool.iconClass5.split(' ');

            var _set = this.$content.defaultIconPack;

            var _i;

            if ((_i = _arr.indexOf('fas')) > -1 || (_i = _arr.indexOf('far')) > -1 || (_i = _arr.indexOf('fal')) > -1 || (_i = _arr.indexOf('fab')) > -1) {
              _set = _arr[_i];

              _arr.splice(_i, 1);
            }

            var _size = 'fa-2x';

            if ((_i = _arr.indexOf('fa-2x')) > -1 || (_i = _arr.indexOf('fa-3x')) > -1 || (_i = _arr.indexOf('fa-4x')) > -1 || (_i = _arr.indexOf('fa-5x')) > -1) {
              _size = _arr[_i];

              _arr.splice(_i, 1);
            }

            _arr.push(_set);

            _arr.push(_size);

            return _arr;
          }
        }

        return ['fas', 'fa-2x', 'fa-word-file-o'];
      } // Default to font-awesome 4


      return ['fa', 'fa-2x', 'fa-word-file-o'];
    },
    //- iconClass
    labelStyle: function labelStyle(label) {
      // let label = this.type.label
      if (label && label.length > 10) {
        return {
          fontSize: '9px'
        };
      } else {
        return {
          fontSize: '9px'
        };
      }
    },
    dragStart: function dragStart() {
      this.$content.store.commit('dragStart', {});
    },
    dragStop: function dragStop() {
      this.$content.store.commit('dragStop', {});
    }
  },
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("ContentToolbox.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }

    if (this.toolbox) {
      this.theToolbox = this.toolbox;
    } else {
      this.theToolbox = toolbox_conf;
    }
  }
});

function chooseIcon(rules) {}
// CONCATENATED MODULE: ./src/components/ContentToolbox.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentToolboxvue_type_script_lang_js_ = (ContentToolboxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentToolbox.vue?vue&type=style&index=0&id=1ea2ef32&lang=scss&scoped=true&
var ContentToolboxvue_type_style_index_0_id_1ea2ef32_lang_scss_scoped_true_ = __webpack_require__("2a2c");

// CONCATENATED MODULE: ./src/components/ContentToolbox.vue






/* normalize component */

var ContentToolbox_component = normalizeComponent(
  components_ContentToolboxvue_type_script_lang_js_,
  ContentToolboxvue_type_template_id_1ea2ef32_scoped_true_lang_pug_render,
  ContentToolboxvue_type_template_id_1ea2ef32_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "1ea2ef32",
  null
  
)

ContentToolbox_component.options.__file = "ContentToolbox.vue"
/* harmony default export */ var ContentToolbox = (ContentToolbox_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentPane.vue?vue&type=template&id=23a82250&scoped=true&lang=pug&
var ContentPanevue_type_template_id_23a82250_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',{directives:[{name:"hotkey",rawName:"v-hotkey",value:(_vm.keymap),expression:"keymap"}],staticClass:"my-content-pane container is-fluid is-fullheight"},[(_vm.extraDebug)?_c('div',{staticClass:"has-text-centered"},[_vm._v("<content-pane>"),_c('br'),_vm._v("pageEditMode="+_vm._s(_vm.pageEditMode)),_c('br')]):_vm._e(),_c('div',{staticClass:"multipane-container"},[(_vm.pageEditMode !== 'view')?_c('div',{staticClass:"tt-editable-header",on:{"click":function($event){$event.stopPropagation();return _vm.cycleEditMode($event)}}},[_c('div',{staticClass:"tt-editable-mode"},[_vm._v(_vm._s(_vm.pageEditMode)+" mode")])]):_vm._e(),_vm._t("default")],2)]):_vm._e()}
var ContentPanevue_type_template_id_23a82250_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentPane.vue?vue&type=template&id=23a82250&scoped=true&lang=pug&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__("8bbf");

// EXTERNAL MODULE: ./src/mixins/ContentMixins.js
var ContentMixins = __webpack_require__("d116");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentPane.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

 // Prevent double keypresses

var previousTimeStamp = 0;
/* harmony default export */ var ContentPanevue_type_script_lang_js_ = ({
  name: 'content-pane',
  props: {
    editable: String
  },
  mixins: [ContentMixins["a" /* default */]],
  data: function data() {
    return {
      // Did we pass sanity checks?
      sane: true
    };
  },
  computed: {
    keymap: function keymap() {
      var self = this;
      return {
        'ctrl+alt+esc': {
          //'alt+esc': {
          keydown: this.toggleEditing
        }
      };
    }
  },
  methods: {
    toggleEditing: function toggleEditing(e) {
      // Prevent duplicate event handling.
      if (e.timeStamp === previousTimeStamp) {
        return true;
      }

      previousTimeStamp = e.timeStamp; // Toggle between view and {edit|debug}
      // When we switch to view mode, we remember which of the edit modes
      // we were in, so we can toggle back to the same mode.

      var mode = this.$content.store.state.mode;
      var previousEditMode = this.$content.store.state.previousEditMode;

      if (mode === 'view') {
        // Switch to one of the edit modes
        //console.log(` - switch to ${previousEditMode}`)
        this.$content.setEditMode({
          mode: previousEditMode
        });
      } else {
        // Switch back to view mode
        //console.log(` - switch to view mode`)
        this.$content.setEditMode({
          mode: 'view',
          previousEditMode: mode
        });
      }
    },
    cycleEditMode: function cycleEditMode() {
      var mode = this.$content.store.state.mode;

      switch (mode) {
        case 'edit':
          this.$content.setEditMode({
            mode: 'debug',
            previousEditMode: 'debug'
          });
          break;
        // No 'layout' mode for <content-pane>

        case 'debug':
        case 'layout':
          this.$content.setEditMode({
            mode: 'edit',
            previousEditMode: 'edit'
          });
          break;
      }
    }
  },
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }
  }
});
// CONCATENATED MODULE: ./src/components/ContentPane.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentPanevue_type_script_lang_js_ = (ContentPanevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentPane.vue?vue&type=style&index=0&id=23a82250&lang=scss&scoped=true&
var ContentPanevue_type_style_index_0_id_23a82250_lang_scss_scoped_true_ = __webpack_require__("c192");

// CONCATENATED MODULE: ./src/components/ContentPane.vue






/* normalize component */

var ContentPane_component = normalizeComponent(
  components_ContentPanevue_type_script_lang_js_,
  ContentPanevue_type_template_id_23a82250_scoped_true_lang_pug_render,
  ContentPanevue_type_template_id_23a82250_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "23a82250",
  null
  
)

ContentPane_component.options.__file = "ContentPane.vue"
/* harmony default export */ var ContentPane = (ContentPane_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentElement.vue?vue&type=template&id=665668a0&lang=pug&
var ContentElementvue_type_template_id_665668a0_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tt-element"},[(_vm.componentNameForElement)?_c(_vm.componentNameForElement,{tag:"component",attrs:{"context":_vm.context,"element":_vm.element}}):_c('div',[_vm._v("Unknown element type '"+_vm._s(_vm.element.type)+"'")])],1)}
var ContentElementvue_type_template_id_665668a0_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentElement.vue?vue&type=template&id=665668a0&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentElement.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var ContentElementvue_type_script_lang_js_ = ({
  name: 'content-element',
  props: {
    // The context provides a means for a container to pass information down to it's children
    context: {
      type: Object,
      required: true
    },
    element: Object
  },
  computed: {
    componentNameForElement: function componentNameForElement() {
      var type = this.element.type;
      var def = this.$content.getLayoutType(type);
      return def ? def.componentName : null;
    }
  }
});
// CONCATENATED MODULE: ./src/components/ContentElement.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentElementvue_type_script_lang_js_ = (ContentElementvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentElement.vue?vue&type=style&index=0&lang=scss&
var ContentElementvue_type_style_index_0_lang_scss_ = __webpack_require__("c1ba");

// CONCATENATED MODULE: ./src/components/ContentElement.vue






/* normalize component */

var ContentElement_component = normalizeComponent(
  components_ContentElementvue_type_script_lang_js_,
  ContentElementvue_type_template_id_665668a0_lang_pug_render,
  ContentElementvue_type_template_id_665668a0_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

ContentElement_component.options.__file = "ContentElement.vue"
/* harmony default export */ var ContentElement = (ContentElement_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentElementProps.vue?vue&type=template&id=08db0b4b&lang=pug&
var ContentElementPropsvue_type_template_id_08db0b4b_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',{staticClass:"ch-elem"},[_vm._l((_vm.hierarchyToSelectedElement),function(propertyElement){return _c('div',[(_vm.propertyComponentNameForElement2(propertyElement))?_c(_vm.propertyComponentNameForElement2(propertyElement),{tag:"component",attrs:{"element":propertyElement}}):_c('div',[_c('div',{staticClass:"tt-property-element-unknown-type"},[_vm._v("Unknown type ("+_vm._s(propertyElement.type)+")")])])],1)}),_c('div',{staticClass:"tt-property-footer"})],2):_vm._e()}
var ContentElementPropsvue_type_template_id_08db0b4b_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentElementProps.vue?vue&type=template&id=08db0b4b&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentElementProps.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentElementPropsvue_type_script_lang_js_ = ({
  name: 'content-element-props',
  mixins: [ContentMixins["a" /* default */]],
  props: {
    // Index into 'pathToSelectedElement' in our store.
    // 0 = layout
    // Last element in array = our currently selected element
    level: Number
  },
  data: function data() {
    return {
      // Did we pass sanity checks?
      sane: true
    };
  },
  computed: {
    hierarchyToSelectedElement: function hierarchyToSelectedElement() {
      var path = this.$content.store.state.pathToSelectedElement;
      return path;
    },
    element: function element() {
      var path = this.$content.store.state.pathToSelectedElement;
      return path.length > this.level ? path[this.level] : null;
    },
    // Is there another property below this one?
    haveMore: function haveMore() {
      var path = this.$content.store.state.pathToSelectedElement;
      return path.length > this.level + 1;
    },
    propertyComponentNameForElement: function propertyComponentNameForElement() {
      console.log("propertyComponentNameForElement(".concat(this.element.type, ")"));
      var type = this.element.type;
      var def = this.$content.getLayoutType(type);
      return def ? def.propertyComponentName : null;
    }
  },
  methods: {
    propertyComponentNameForElement2: function propertyComponentNameForElement2(element) {
      // console.log(`propertyComponentNameForElement2(${element.type})`);
      var type = element.type;
      var def = this.$content.getLayoutType(type);
      return def ? def.propertyComponentName : null;
    }
  },
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }
  }
});
// CONCATENATED MODULE: ./src/components/ContentElementProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentElementPropsvue_type_script_lang_js_ = (ContentElementPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentElementProps.vue?vue&type=style&index=0&lang=scss&
var ContentElementPropsvue_type_style_index_0_lang_scss_ = __webpack_require__("6186");

// CONCATENATED MODULE: ./src/components/ContentElementProps.vue






/* normalize component */

var ContentElementProps_component = normalizeComponent(
  components_ContentElementPropsvue_type_script_lang_js_,
  ContentElementPropsvue_type_template_id_08db0b4b_lang_pug_render,
  ContentElementPropsvue_type_template_id_08db0b4b_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

ContentElementProps_component.options.__file = "ContentElementProps.vue"
/* harmony default export */ var ContentElementProps = (ContentElementProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentPropertiesHeader.vue?vue&type=template&id=20062235&lang=pug&
var ContentPropertiesHeadervue_type_template_id_20062235_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-properties-header"},[_vm._v("YARP AND stuff")])}
var ContentPropertiesHeadervue_type_template_id_20062235_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentPropertiesHeader.vue?vue&type=template&id=20062235&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentPropertiesHeader.vue?vue&type=script&lang=js&
//
//
//
//
//

/* harmony default export */ var ContentPropertiesHeadervue_type_script_lang_js_ = ({
  name: 'content-properties-header',
  mixins: [ContentMixins["a" /* default */]] // props: {
  //   // Index into 'pathToSelectedElement' in our store.
  //   // 0 = layout
  //   // Last element in array = our currently selected element
  //   level: Number,
  // },
  // data: function () {
  //   return {
  //
  //     // Did we pass sanity checks?
  //     sane: true
  //   }
  // },
  // computed: {
  //   element: function ( ) {
  //     let path = this.$content.store.state.pathToSelectedElement
  //     return (path.length > this.level) ? path[this.level] : null
  //   },
  //
  //   // Is there another property below this one?
  //   haveMore: function ( ) {
  //     let path = this.$content.store.state.pathToSelectedElement
  //     return path.length > (this.level + 1)
  //   },
  //
  //   propertyComponentNameForElement: function () {
  //     console.log(`propertyComponentNameForElement(${this.element.type})`);
  //     let type = this.element.type
  //     let def = this.$content.getLayoutType(type)
  //     return def ? def.propertyComponentName : null
  //   }
  //
  // },
  // created: function () {
  //
  //   // Sanity check
  //   if (!this.$content) {
  //     console.error(`ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?`);
  //     this.sane = false
  //     return
  //   }
  // }

});
// CONCATENATED MODULE: ./src/components/ContentPropertiesHeader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentPropertiesHeadervue_type_script_lang_js_ = (ContentPropertiesHeadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentPropertiesHeader.vue?vue&type=style&index=0&lang=scss&
var ContentPropertiesHeadervue_type_style_index_0_lang_scss_ = __webpack_require__("adf5");

// CONCATENATED MODULE: ./src/components/ContentPropertiesHeader.vue






/* normalize component */

var ContentPropertiesHeader_component = normalizeComponent(
  components_ContentPropertiesHeadervue_type_script_lang_js_,
  ContentPropertiesHeadervue_type_template_id_20062235_lang_pug_render,
  ContentPropertiesHeadervue_type_template_id_20062235_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

ContentPropertiesHeader_component.options.__file = "ContentPropertiesHeader.vue"
/* harmony default export */ var ContentPropertiesHeader = (ContentPropertiesHeader_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentChildren.vue?vue&type=template&id=1e6a61f0&scoped=true&lang=pug&
var ContentChildrenvue_type_template_id_1e6a61f0_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',[(_vm.element && _vm.element.children)?_c('div',{staticClass:"content-children",class:_vm.showDropAreas ? 'c-show-drop-areas' : ''},[(_vm.extraDebug)?_c('div',[_vm._v("<content-children>"),_c('br')]):_vm._e(),_vm._l((_vm.element.children),function(child,index){return [(child)?[(_vm.showDropAreas)?_c('drop',{on:{"drop":function($event){
var i = arguments.length, argsArray = Array(i);
while ( i-- ) argsArray[i] = arguments[i];
_vm.handleDrop.apply(void 0, [ _vm.element, child ].concat( argsArray ))}},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_c('div',{staticClass:"droparea",class:[props.transferData ? 'dropover' : ''],attrs:{"contenteditable":"true"},on:{"paste":function($event){_vm.onPaste($event, index)},"input":_vm.onInput}})]}}])}):_vm._e(),(_vm.componentNameForElement(child))?_c(_vm.componentNameForElement(child),{tag:"component",attrs:{"element":child,"context":_vm.context}}):[_vm._v("Unknown element type '"+_vm._s(child.type)+"'"),_c('br')]]:[_vm._v("Missing child "+_vm._s(index)),_c('br')]]}),(_vm.showDropAreas)?_c('drop',{on:{"drop":function($event){
var i = arguments.length, argsArray = Array(i);
while ( i-- ) argsArray[i] = arguments[i];
_vm.handleDrop.apply(void 0, [ _vm.element, null ].concat( argsArray ))}},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_c('div',{staticClass:"droparea",class:[props.transferData ? 'dropover' : ''],attrs:{"contenteditable":"true"},on:{"paste":function($event){_vm.onPaste($event,'last')},"input":_vm.onInput}})]}}])}):_vm._e()],2):_vm._e()]):_vm._e()}
var ContentChildrenvue_type_template_id_1e6a61f0_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentChildren.vue?vue&type=template&id=1e6a61f0&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentChildren.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentChildrenvue_type_script_lang_js_ = ({
  name: 'content-children',
  components: {},
  props: {
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      // Did we pass sanity checks?
      sane: true
    };
  },
  mixins: [ContentMixins["a" /* default */]],
  methods: {
    componentNameForElement: function componentNameForElement(element) {
      var type = element.type;
      var def = this.$content.getLayoutType(type);
      return def ? def.componentName : null;
    },
    onPaste: function onPaste(e, position) {
      console.log("onPaste(".concat(position, ")"), e);
      var clipboardData, pastedData; // See https://stackoverflow.com/a/6804718/96100, solution #1
      // Stop data actually being pasted into div

      e.stopPropagation();
      e.preventDefault(); // Get pasted data via clipboard API

      clipboardData = e.clipboardData || window.clipboardData;
      pastedData = clipboardData.getData('Text');
      var parent = this.element;
      console.log("parent is ".concat(parent.id, " (").concat(parent.type, ") [").concat(parent.children.length, "]"));

      if (position === 'last') {
        position = parent.children.length;
      }

      console.log("insert at: ".concat(position)); // Check that the data makes sense

      console.log('data:', pastedData);
      console.log('data:', _typeof(pastedData));

      if (typeof pastedData !== 'string') {
        return this.reportError("Invalid paste object (not text).");
      }

      this.$content.insertLayout({
        vm: this,
        parent: parent,
        position: position,
        layout: pastedData
      }); // let data
      // try {
      //   data = JSON.parse(pastedData);
      // } catch(e) {
      //   console.error('Error while pasting:', e);
      //   return this.reportError(`Invalid paste object (not JSON).`)
      // }
      // console.log(`data=`, data)
      //
      // if (data.type !== 'contentservice.io') {
      //   return this.reportError(`Invalid paste object (not from contentservice.io).`)
      // }
      // if (data.version === '2.0') {
      //   return this.reportError(`Invalid paste object (unknown version ${data.version}).`)
      // } else {
      //   // Assume version 1.0
      //   if (typeof(data.layout) === 'undefined') {
      //     return this.reportError(`Invalid paste object (missing layout).`)
      //   }
      //   console.log(`Will insert `, data.layout)
      //   this.$content.insertLayout({ vm: this, parent: parent, position: position, layout: data.layout })
      // }

      return false;
    },
    onInput: function onInput(event) {
      //console.log(`onInput()`, event)
      // console.log(`$el=`, this.$el)
      // console.log(`$el.text=`, this.$el.text)
      // event.preventDefault()
      event.target.textContent = ''; //console.log(`  after:`, event)

      return false;
    },
    reportError: function reportError(msg) {
      alert(msg);
      return false;
    },
    // The drop event normally provides (data, event) but we've added (element, child, ...) in front.
    handleDrop: function handleDrop(element, child, data, event) {
      console.log("Children.handleDrop(element=".concat(element.id, ", child=").concat(child ? child.id : '\"null\"', "), data="), data);

      if (data.dragtype != 'component') {
        console.log("Dropped non-component: '".concat(data.dragtype, "'"));
        return;
      } // Get the element to be inserted, from the drop data.


      var insertContent = data.data; // Note that 'child' is the existing child, not the child being inserted.

      if (child) {
        // Insert before the specified child.
        for (var i = 0; i < element.children.length; i++) {
          if (element.children[i] === child) {
            console.log("Insert at position ".concat(i));
            this.$content.insertLayout({
              vm: this,
              parent: element,
              position: i,
              layout: insertContent
            });
            break;
          }
        }
      } else {
        // No child specified - add at the end
        this.$content.insertLayout({
          vm: this,
          parent: element,
          position: -1,
          layout: insertContent
        });
      }
    }
  },
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }
  }
});
// CONCATENATED MODULE: ./src/components/ContentChildren.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentChildrenvue_type_script_lang_js_ = (ContentChildrenvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentChildren.vue?vue&type=style&index=0&id=1e6a61f0&lang=scss&scoped=true&
var ContentChildrenvue_type_style_index_0_id_1e6a61f0_lang_scss_scoped_true_ = __webpack_require__("d5e2");

// CONCATENATED MODULE: ./src/components/ContentChildren.vue






/* normalize component */

var ContentChildren_component = normalizeComponent(
  components_ContentChildrenvue_type_script_lang_js_,
  ContentChildrenvue_type_template_id_1e6a61f0_scoped_true_lang_pug_render,
  ContentChildrenvue_type_template_id_1e6a61f0_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "1e6a61f0",
  null
  
)

ContentChildren_component.options.__file = "ContentChildren.vue"
/* harmony default export */ var ContentChildren = (ContentChildren_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentContentProps.vue?vue&type=template&id=543b6a7a&lang=pug&
var ContentContentPropsvue_type_template_id_543b6a7a_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Content")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("ID")]),_c('div',{staticClass:"c-property-value"},[_vm._v(_vm._s(_vm.element.id))])])])])],1)}
var ContentContentPropsvue_type_template_id_543b6a7a_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentContentProps.vue?vue&type=template&id=543b6a7a&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentContentProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ContentContentPropsvue_type_script_lang_js_ = ({
  name: 'content-content-props',
  props: {
    element: Object
  }
});
// CONCATENATED MODULE: ./src/components/ContentContentProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentContentPropsvue_type_script_lang_js_ = (ContentContentPropsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/ContentContentProps.vue





/* normalize component */

var ContentContentProps_component = normalizeComponent(
  components_ContentContentPropsvue_type_script_lang_js_,
  ContentContentPropsvue_type_template_id_543b6a7a_lang_pug_render,
  ContentContentPropsvue_type_template_id_543b6a7a_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

ContentContentProps_component.options.__file = "ContentContentProps.vue"
/* harmony default export */ var ContentContentProps = (ContentContentProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentLayout.vue?vue&type=template&id=6c50bc7e&scoped=true&lang=pug&
var ContentLayoutvue_type_template_id_6c50bc7e_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-content-layout",class:[(_vm.pageEditMode=='debug') ? 'tt-container-outline' : '']},[(_vm.pageEditMode==='view')?_c('div',{staticClass:"container",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('content-children',{attrs:{"element":_vm.element}})],1):(_vm.pageEditMode==='edit')?_c('div',{staticClass:"container",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('content-children',{attrs:{"element":_vm.element}})],1):(_vm.pageEditMode==='debug')?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_vm._v("layout")]),_c('div',{staticClass:"container"},[_c('content-children',{staticClass:"my-content",attrs:{"element":_vm.element}})],1)]):_c('div',{staticClass:"container"},[_c('content-children',{attrs:{"element":_vm.element}})],1)])}
var ContentLayoutvue_type_template_id_6c50bc7e_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentLayout.vue?vue&type=template&id=6c50bc7e&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentLayout.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentLayoutvue_type_script_lang_js_ = ({
  name: 'content-container',
  components: {},
  props: {
    element: Object
  },
  mixins: [ContentMixins["a" /* default */]],
  data: function data() {
    return {};
  },
  computed: {
    sectionStyle: function sectionStyle() {
      var style = {};
      copyStyle(this.element, style, 'background-color');
      copyStyle(this.element, style, 'padding');
      copyStyle(this.element, style, 'padding-top');
      copyStyle(this.element, style, 'padding-bottom');
      copyStyle(this.element, style, 'padding-left');
      copyStyle(this.element, style, 'padding-right');
      return style;
    }
  }
  /* function copyStyle(from, to, name) {
    if (from[name]) {
      to[name] = from[name]
    }
  } */

});
// CONCATENATED MODULE: ./src/components/widgets/ContentLayout.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentLayoutvue_type_script_lang_js_ = (ContentLayoutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentLayout.vue?vue&type=style&index=0&id=6c50bc7e&lang=scss&scoped=true&
var ContentLayoutvue_type_style_index_0_id_6c50bc7e_lang_scss_scoped_true_ = __webpack_require__("86b1");

// CONCATENATED MODULE: ./src/components/widgets/ContentLayout.vue






/* normalize component */

var ContentLayout_component = normalizeComponent(
  widgets_ContentLayoutvue_type_script_lang_js_,
  ContentLayoutvue_type_template_id_6c50bc7e_scoped_true_lang_pug_render,
  ContentLayoutvue_type_template_id_6c50bc7e_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "6c50bc7e",
  null
  
)

ContentLayout_component.options.__file = "ContentLayout.vue"
/* harmony default export */ var ContentLayout = (ContentLayout_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentLayoutProps.vue?vue&type=template&id=78f28d2b&scoped=true&lang=pug&
var ContentLayoutPropsvue_type_template_id_78f28d2b_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_c('div',{staticClass:"my-buttons"},[_c('span',{on:{"click":_vm.downloadMyElement}},[_vm._v(" "),_c('i',{staticClass:"fa fa-download fas fa-download"}),_vm._v(" ")]),_c('span',{directives:[{name:"clipboard",rawName:"v-clipboard",value:(_vm.myElementCopyToClipboard),expression:"myElementCopyToClipboard"},{name:"clipboard",rawName:"v-clipboard:success",value:(_vm.clipboardSuccessHandler),expression:"clipboardSuccessHandler",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:(_vm.clipboardErrorHandler),expression:"clipboardErrorHandler",arg:"error"}]},[_vm._v(" "),_c('i',{staticClass:"fa fa-files-o fas fa-copy"}),_vm._v(" ")]),_c('span',{on:{"click":_vm.deleteMyElement}},[_vm._v(" "),_c('i',{staticClass:"fa fa-trash-o fas fa-trash-alt"}),_vm._v(" ")])]),_vm._v("Layout")])])}
var ContentLayoutPropsvue_type_template_id_78f28d2b_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentLayoutProps.vue?vue&type=template&id=78f28d2b&scoped=true&lang=pug&

// EXTERNAL MODULE: external "file-saver"
var external_file_saver_ = __webpack_require__("9588");
var external_file_saver_default = /*#__PURE__*/__webpack_require__.n(external_file_saver_);

// CONCATENATED MODULE: ./src/mixins/PropertyMixins.js

/* harmony default export */ var PropertyMixins = ({
  props: {
    element: Object
  },
  computed: {
    isExpandedElement: function isExpandedElement() {
      if (this.element === this.$content.store.state.expandedElement) {
        return true;
      }

      return false;
    },
    isSelectedElement: function isSelectedElement() {
      if (this.element === this.$content.store.getters.propertyElement) {
        return true;
      }

      return false;
    },
    propertyClass: function propertyClass() {
      var cls = '';

      if (this.element === this.$content.store.state.expandedElement) {
        cls += ' c-expanded';
      }

      if (this.element === this.$content.store.getters.propertyElement) {
        cls += ' c-selected';
      } else {
        cls += ' c-not-selected';
      }

      return cls;
    }
  },
  methods: {
    setExpandedElement: function setExpandedElement() {
      if (this.pageEditMode != 'view') {
        var element = this.element;
        this.$content.setExpandedElement({
          element: element
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/mixins/CutAndPasteMixins.js

/* harmony default export */ var CutAndPasteMixins = ({
  computed: {},
  methods: {
    /*
     *  Methods related to cut/copy/paste, delete, and download/drop.
    */
    deleteMyElement: function deleteMyElement() {
      console.log("Deleting element ".concat(this.element.id));
      this.$content.deleteElement({
        vm: this,
        element: this.element
      });
    },
    myElementCopyToClipboard: function myElementCopyToClipboard() {
      console.log("myElementCopyToClipboard()");
      return this.bundleMyElement();
    },
    myElementCutToClipboard: function myElementCutToClipboard() {
      console.log("myElementCutToClipboard()");
      var json = this.bundleMyElement();
      this.$content.deleteElement({
        vm: this,
        element: this.element
      });
      return json;
    },
    clipboardSuccessHandler: function clipboardSuccessHandler(_ref) {
      var value = _ref.value,
          event = _ref.event;
      var type = this.element.type.substring(0, 1).toUpperCase() + this.element.type.substring(1);
      var msg = "".concat(type, " has been copied to the clipboard");

      if (this.$toast) {
        this.$toast.open({
          message: "".concat(msg),
          type: 'is-success'
        });
      } else {
        alert(msg);
      }
    },
    clipboardErrorHandler: function clipboardErrorHandler(_ref2) {
      var value = _ref2.value,
          event = _ref2.event;
      console.log('error', value);
    },
    // Save the current element to file and download it.
    // See https://github.com/eligrey/FileSaver.js
    downloadMyElement: function downloadMyElement() {
      console.log("downloadMyElement()");
      var json = this.bundleMyElement();
      var blob = new Blob([json], {
        type: "text/plain;charset=utf-8"
      });
      var filename = 'layout';

      if (this.$content.store.state.contentId) {
        filename += '-' + this.$content.store.state.contentId.substring(1);
      }

      filename += "-".concat(this.element.type, "-").concat(this.element.id, ".txt");
      external_file_saver_default.a.saveAs(blob, filename);
    },
    // Create a nicely packaged payload.
    bundleMyElement: function bundleMyElement() {
      var payload = {
        type: 'contentservice.io',
        version: '1.0',
        source: this.$content.store.state.contentId,
        timestamp: new Date(),
        layout: this.element
      };

      if (this.$authservice && this.$authservice.user) {
        payload.user = this.$authservice.user;
        payload.username = this.$authservice.user.fullname;
      }

      var json = JSON.stringify(payload, null, 2);
      return json;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentLayoutProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ContentLayoutPropsvue_type_script_lang_js_ = ({
  name: 'content-layout-props',
  mixins: [PropertyMixins, CutAndPasteMixins],
  computed: {
    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    protectedMode: {
      get: function get() {
        var value = this.element['mode'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'mode',
          value: value
        });
      }
    },
    protectedIsFluid: {
      get: function get() {
        var value = this.element['is-fluid'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'is-fluid',
          value: value
        });
      }
    },
    protectedBgColor: {
      get: function get() {
        var value = this.element['background-color'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'background-color',
          value: value
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentLayoutProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentLayoutPropsvue_type_script_lang_js_ = (ContentLayoutPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentLayoutProps.vue?vue&type=style&index=0&id=78f28d2b&lang=scss&scoped=true&
var ContentLayoutPropsvue_type_style_index_0_id_78f28d2b_lang_scss_scoped_true_ = __webpack_require__("6950");

// CONCATENATED MODULE: ./src/components/widgets/ContentLayoutProps.vue






/* normalize component */

var ContentLayoutProps_component = normalizeComponent(
  widgets_ContentLayoutPropsvue_type_script_lang_js_,
  ContentLayoutPropsvue_type_template_id_78f28d2b_scoped_true_lang_pug_render,
  ContentLayoutPropsvue_type_template_id_78f28d2b_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "78f28d2b",
  null
  
)

ContentLayoutProps_component.options.__file = "ContentLayoutProps.vue"
/* harmony default export */ var ContentLayoutProps = (ContentLayoutProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentText.vue?vue&type=template&id=9e4c78a8&scoped=true&lang=pug&
var ContentTextvue_type_template_id_9e4c78a8_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.isPageMode('view'))?_c('span',[_vm._v(_vm._s(_vm.protectedContent))]):(_vm.isDesignMode)?_c('div',{staticClass:"my-debug-box"},[_c('div',{staticClass:"my-debug-header"},[_vm._v("text"),_c('br'),_vm._v("contentId: "+_vm._s(_vm.contentId))]),_c('span',{staticClass:"stop",on:{"click":function($event){_vm.selectThisElement, _vm.itemClick(_vm.element)}}},[_vm._v(_vm._s(_vm.protectedContent))])]):_c('span',{staticClass:"stop",on:{"click":function($event){_vm.selectThisElement, _vm.itemClick(_vm.element)}}},[_vm._v(_vm._s(_vm.protectedContent))]),(_vm.isPageMode('edit,debug') && _vm.editing)?_c('div',[_c('hr'),_vm._v(" "+_vm._s(_vm.saveMsg)),_c('br'),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.protectedContent),expression:"protectedContent"}],staticClass:"textarea my-input",domProps:{"value":(_vm.protectedContent)},on:{"input":function($event){if($event.target.composing){ return; }_vm.protectedContent=$event.target.value}}})]):_vm._e()])}
var ContentTextvue_type_template_id_9e4c78a8_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentText.vue?vue&type=template&id=9e4c78a8&scoped=true&lang=pug&

// EXTERNAL MODULE: external "core-js/modules/es7.array.includes"
var es7_array_includes_ = __webpack_require__("44d6");

// EXTERNAL MODULE: external "core-js/modules/es6.string.includes"
var es6_string_includes_ = __webpack_require__("0ca7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentText.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var CLEAN = '';
var DIRTY = 'waiting to save';
var SAVING = 'saving';
var SAVED = 'your changes have been saved';
var ERROR = 'warning: your changes have not been saved';
var SAVE_INTERVAL = 2000;
/* harmony default export */ var ContentTextvue_type_script_lang_js_ = ({
  name: 'content-text',
  components: {},
  props: {
    /*
     *  Must provide either contentId or an element.
     *  If contentId is provided, we'll select the content from Crowdhound.
     *  If an element is provided, we'll update it via $content.store.
     */
    contentId: String,
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      editing: false,
      title: '',
      summary: '',
      description: '',
      // Element from server
      crowdhoundElement: {},
      // Saving to server
      saveMsg: '',
      saveTimeout: null
    };
  },
  mixins: [ContentMixins["a" /* default */]],
  computed: {
    useCrowdhound: function useCrowdhound() {
      return typeof this.contentId != 'undefined';
    },
    protectedContent: {
      get: function get() {
        if (this.useCrowdhound) {
          return this.crowdhoundElement.description;
        } else {
          var name = 'text';
          return this.element[name]; //- return this.element.text
        }
      },
      set: function set(value) {
        if (this.useCrowdhound) {
          this.crowdhoundElement.description = value;
          console.log('protectedContent.set: ', value);
          this.rememberToSave();
        } else {
          var name = 'text';
          this.$content.setProperty({
            vm: this,
            element: this.element,
            name: name,
            value: value
          });
        }
      }
    }
  },
  methods: {
    // Compare the page mode to a comma separated list
    isPageMode: function isPageMode(modes) {
      return modes.split(',').includes(this.pageEditMode);
    },
    itemClick: function itemClick(element) {
      console.log('clicked !');

      if (this.pageEditMode != 'edit') {
        this.editing = false;
      } else {
        this.editing = !this.editing;
      }
    },
    rememberToSave: function rememberToSave() {
      var _this = this;

      // We need to save changes to Crowdhound
      // Don't save every change, but rather wait five seconds to
      // batch up the changes.
      console.log("save to Crowdhound (not yet)"); //this.crowdhoundElement.description = value

      if (this.saveTimeout) {// Already set the timeout to save
      } else {
        // Save after five seconds
        this.saveMsg = DIRTY;
        this.saveTimeout = setTimeout(function () {
          // Save the changes
          _this.saveTimeout = null;
          _this.saveMsg = SAVING;

          _this.saveToCrowdhound();
        }, SAVE_INTERVAL);
      }
    },
    saveToCrowdhound: function saveToCrowdhound() {
      var _this2 = this;

      console.error("saveToCrowdhound");
      this.saveMsg = SAVED;
      this.$content.update(this, this.crowdhoundElement) //- this.$content.select(this, params)
      .then(function (result) {
        setTimeout(function () {
          if (_this2.saveMsg === DIRTY) {
            _this2.saveMsg = CLEAN;
          }
        }, 1700);
        console.log("result of save:", result);
        console.log("result of save:", result.data);
      }).catch(function (e) {
        var desc = "Error loading comments";
        console.log("Dirty rotten error: ", e);
        _this2.saveMsg = ERROR;
        /* handleError(this, desc, params, e) */

        _this2.selectError = true;
      }); //- update
    }
  },
  created: function created() {
    var _this3 = this;

    if (this.useCrowdhound) {
      // We select the content from crowdhound
      //console.log(`TooltwistText.created`)
      if (typeof this.$content === 'undefined') {
        console.error('this.$content not defined. Remember to us Contentservice.use(Vue).');
        return;
      }

      if (this.$content.disabled) {
        console.error('Contentservice disabled');
        return;
      } // Select the elements


      var anchor1 = "testpage.".concat(this.contentId);
      var anchor2 = "$testpage.".concat(this.contentId); //console.error(`contentId is ${contentId}.`)

      var elementType = 'text';
      this.$content.select(this, anchor2, elementType).then(function (result) {
        // Use the elements
        if (result.elements.length > 0) {
          console.log("result=", result);
          _this3.crowdhoundElement = result.elements[0]; // If this is a new element, use Lorem Ipsum text

          if (_this3.crowdhoundElement.description === anchor1) {
            _this3.crowdhoundElement.description = "Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.";
          }
        } else {
          // Should not get here
          _this3.crowdhoundElement = {};
        }
      }).catch(function (e) {
        var desc = "Error loading content";
        console.log("Dirty rotten error: ", e);
        /* handleError(this, desc, params, e) */

        _this3.selectError = true;
      }); //- select
    } else {
      //- !useCrowdhound
      // Edit the text in the provided element
      console.log('Using description from element in layout');
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentText.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentTextvue_type_script_lang_js_ = (ContentTextvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentText.vue?vue&type=style&index=0&id=9e4c78a8&lang=scss&scoped=true&
var ContentTextvue_type_style_index_0_id_9e4c78a8_lang_scss_scoped_true_ = __webpack_require__("a39c");

// CONCATENATED MODULE: ./src/components/widgets/ContentText.vue






/* normalize component */

var ContentText_component = normalizeComponent(
  widgets_ContentTextvue_type_script_lang_js_,
  ContentTextvue_type_template_id_9e4c78a8_scoped_true_lang_pug_render,
  ContentTextvue_type_template_id_9e4c78a8_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "9e4c78a8",
  null
  
)

ContentText_component.options.__file = "ContentText.vue"
/* harmony default export */ var ContentText = (ContentText_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentTextProps.vue?vue&type=template&id=b26a8a96&lang=pug&
var ContentTextPropsvue_type_template_id_b26a8a96_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Text")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("color")]),_c('div',{staticClass:"c-property-value"},[_vm._v(_vm._s(_vm.value('color')))])]),_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("font-family")]),_c('div',{staticClass:"c-property-value"},[_vm._v(_vm._s(_vm.value('font-family')))])]),_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("font-size")]),_c('div',{staticClass:"c-property-value"},[_vm._v(_vm._s(_vm.value('font-size')))])])])])],1)}
var ContentTextPropsvue_type_template_id_b26a8a96_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentTextProps.vue?vue&type=template&id=b26a8a96&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentTextProps.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentTextPropsvue_type_script_lang_js_ = ({
  name: 'content-text-props',
  mixins: [PropertyMixins],
  props: {
    element: Object
  },
  methods: {
    // Display a property value
    value: function value(name) {
      var value = this.element[name];
      return value ? value : '-';
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentTextProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentTextPropsvue_type_script_lang_js_ = (ContentTextPropsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/widgets/ContentTextProps.vue





/* normalize component */

var ContentTextProps_component = normalizeComponent(
  widgets_ContentTextPropsvue_type_script_lang_js_,
  ContentTextPropsvue_type_template_id_b26a8a96_lang_pug_render,
  ContentTextPropsvue_type_template_id_b26a8a96_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

ContentTextProps_component.options.__file = "ContentTextProps.vue"
/* harmony default export */ var ContentTextProps = (ContentTextProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFroala.vue?vue&type=template&id=779556e2&scoped=true&lang=pug&
var ContentFroalavue_type_template_id_779556e2_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-content-froala",class:_vm.editModeClass},[(_vm.extraDebug)?_c('span',[_vm._v("<content-froala"),(_vm.element)?_c('span',[_vm._v(" have element")]):_vm._e(),(_vm.contentId)?_c('span',[_vm._v(" contentId")]):_vm._e(),_vm._v(">"),_c('br')]):_vm._e(),(_vm.isDesignMode)?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("richtext")],1),_c('froala',{attrs:{"tag":'div',"config":_vm.config},model:{value:(_vm.protectedText),callback:function ($$v) {_vm.protectedText=$$v},expression:"protectedText"}})],1):(_vm.isEditMode)?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('froala',{attrs:{"tag":'div',"config":_vm.config},model:{value:(_vm.protectedText),callback:function ($$v) {_vm.protectedText=$$v},expression:"protectedText"}})],1):[_c('froala-view',{attrs:{"tag":'div'},model:{value:(_vm.protectedText),callback:function ($$v) {_vm.protectedText=$$v},expression:"protectedText"}})]],2)}
var ContentFroalavue_type_template_id_779556e2_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentFroala.vue?vue&type=template&id=779556e2&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFroala.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

 // Don't display a license error every time (intentionally global)

var missingLicenseCounter = 0;
var ContentFroalavue_type_script_lang_js_CLEAN = '';
var ContentFroalavue_type_script_lang_js_DIRTY = 'waiting to save';
var ContentFroalavue_type_script_lang_js_SAVING = 'saving';
var ContentFroalavue_type_script_lang_js_SAVED = 'your changes have been saved';
var ContentFroalavue_type_script_lang_js_ERROR = 'warning: your changes have not been saved';
var ContentFroalavue_type_script_lang_js_SAVE_INTERVAL = 2000;
/* harmony default export */ var ContentFroalavue_type_script_lang_js_ = ({
  name: 'content-froala',
  props: {
    /*
     *  Must provide either contentId or an element.
     *  If contentId is provided, we'll select the content from Crowdhound.
     *  If an element is provided, we'll update it via $content.store.
     */
    contentId: String,
    element: Object
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  data: function data() {
    return {
      // Element from server
      crowdhoundElement: null,
      // Saving to server
      saveMsg: '',
      saveTimeout: null,
      // Froala stuff
      // Options are described at https://www.froala.com/wysiwyg-editor/examples/
      config: {
        toolbarInline: true,
        toolbarButtons: ['fontFamily', 'fontSize', 'bold', 'italic', 'underline',
        /*'strikeThrough',*/
        'color',
        /*'emoticons',*/
        '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', // 'insertFile', 'insertVideo',
        'undo', 'redo'],
        charCounterCount: false,
        // Must be higher than drop areas, and less than the editbar at
        // top of layoutEditor (see ContentChildren, ContentLayoutEditor).
        zIndex: 1900,
        events: {
          'froalaEditor.initialized': function froalaEditorInitialized() {//console.log('Froala is initialized')
          }
        },
        // Froala activation key
        // Gets set from $content.options.froalaActivationKey
        // See https://www.froala.com/wysiwyg-editor/pricing
        key: null
      }
    };
  },
  computed: {
    useCrowdhound: function useCrowdhound() {
      //return true
      return typeof this.contentId != 'undefined';
    },
    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    protectedText: {
      get: function get() {
        if (this.useCrowdhound) {
          // Using content from Crowdhound
          return this.crowdhoundElement ? this.crowdhoundElement.description : '';
        } else {
          // Use text from the element
          var t = this.element.text;
          return t;
        }
      },
      set: function set(value) {
        if (this.useCrowdhound) {
          // Save content to Crowdhound
          this.crowdhoundElement.description = value;
          console.log('protectedContent.set: ', value);
          this.rememberToSave();
        } else {
          // Use text from the element
          var name = 'text';
          this.$content.setProperty({
            vm: this,
            element: this.element,
            name: name,
            value: value
          });
        }
      }
    }
  },
  methods: {
    rememberToSave: function rememberToSave() {
      var _this = this;

      // We need to save changes to Crowdhound
      // Don't save every change, but rather wait five seconds to
      // batch up the changes.
      console.log("save to Crowdhound (not yet)"); //this.crowdhoundElement.description = value

      if (this.saveTimeout) {// Already set the timeout to save
      } else {
        // Save after five seconds
        this.saveMsg = ContentFroalavue_type_script_lang_js_DIRTY;
        this.saveTimeout = setTimeout(function () {
          // Save the changes
          _this.saveTimeout = null;
          _this.saveMsg = ContentFroalavue_type_script_lang_js_SAVING;

          _this.saveToCrowdhound();
        }, ContentFroalavue_type_script_lang_js_SAVE_INTERVAL);
      }
    },
    saveToCrowdhound: function saveToCrowdhound() {
      var _this2 = this;

      //console.log(`saveToCrowdhound`)
      this.saveMsg = ContentFroalavue_type_script_lang_js_SAVED;
      this.$content.update(this, this.crowdhoundElement) //- this.$content.select(this, params)
      .then(function (result) {
        setTimeout(function () {
          if (_this2.saveMsg === ContentFroalavue_type_script_lang_js_DIRTY) {
            _this2.saveMsg = ContentFroalavue_type_script_lang_js_CLEAN;
          }
        }, 1700);
        console.log("result of save:", result);
        console.log("result of save:", result.data);
      }).catch(function (e) {
        var desc = "Error loading comments";
        console.log("Dirty rotten error: ", e);
        _this2.saveMsg = ContentFroalavue_type_script_lang_js_ERROR;
        /* handleError(this, desc, params, e) */

        _this2.selectError = true;
      }); //- update
    }
  },
  created: function created() {
    var _this3 = this;

    //console.log(`TooltwistFroala.created`)
    // See if we have a license key for Froala
    // console.log('this.$content.options=', this.$content.options)
    if (this.$content && this.$content.options && this.$content.options.froalaActivationKey) {
      // console.log(`Froala activation key: ${this.$content.options.froalaActivationKey}`)
      this.config.key = this.$content.options.froalaActivationKey;
    } else {
      if (missingLicenseCounter++ % 20 === 0) {
        console.error("Froala activation key not provided to ContentService {options.froalaActivationKey}. Froala text areas may not function correctly.");
      }
    } // See if we select the content from crowdhound, or if it's already provided.


    if (this.useCrowdhound) {
      console.log("Selecting text from Crowdhound");

      if (typeof this.$content === 'undefined') {
        console.error('this.$content not defined. Remember to us Contentservice.use(Vue).');
        return;
      }

      if (this.$content.disabled) {
        console.error('Contentservice disabled');
        return;
      } // Select the elements


      var anchor1 = "testpage.".concat(this.contentId);
      var anchor2 = "$testpage.".concat(this.contentId);
      var elementType = 'html';
      console.log('Here we are before select...');
      this.$content.select(this, anchor2, elementType).then(function (result) {
        // Use the elements
        if (result.elements.length > 0) {
          console.log("result=", result);
          _this3.crowdhoundElement = result.elements[0]; // If this is a new element, use Lorem Ipsum text

          if (_this3.crowdhoundElement.description === anchor1) {
            _this3.crowdhoundElement.description = "\n              Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.\n              Proin commodo, ridiculus lorem vel fugit lacus, lorem purus pellentesque,\n              imperdiet varius et sed amet. Etiam arcu neque lectus voluptas eros\n              consectetuer. Magna dolores dui dui vestibulum wisi, in sit erat\n              suspendisse habitasse volutpat lacinia. In diam faucibus semper enim\n              est, risus urna faucibus elementum, fusce vitae, vestibulum aenean\n              pellentesque, massa class donec. Consectetuer morbi iaculis quis quam,\n              nec orci praesent lacus ante vitae, vestibulum dui consectetuer parturient.";
          }
        } else {
          // Should not get here
          _this3.crowdhoundElement = {};
        }
      }).catch(function (e) {
        var desc = "Error loading content";
        console.log("Dirty rotten error: ", e); //handleError(this, desc, params, e)

        _this3.selectError = true;
      }); //- select
    } else {//- !useCrowdhound
        // Edit the text in the provided element
        //console.log('Using description from element in layout')
      }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentFroala.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFroalavue_type_script_lang_js_ = (ContentFroalavue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentFroala.vue?vue&type=style&index=0&id=779556e2&lang=scss&scoped=true&
var ContentFroalavue_type_style_index_0_id_779556e2_lang_scss_scoped_true_ = __webpack_require__("7b0f");

// CONCATENATED MODULE: ./src/components/widgets/ContentFroala.vue






/* normalize component */

var ContentFroala_component = normalizeComponent(
  widgets_ContentFroalavue_type_script_lang_js_,
  ContentFroalavue_type_template_id_779556e2_scoped_true_lang_pug_render,
  ContentFroalavue_type_template_id_779556e2_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "779556e2",
  null
  
)

ContentFroala_component.options.__file = "ContentFroala.vue"
/* harmony default export */ var ContentFroala = (ContentFroala_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFroalaProps.vue?vue&type=template&id=4132244c&scoped=true&lang=pug&
var ContentFroalaPropsvue_type_template_id_4132244c_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("RichText")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("classes")]),_c('div',{staticClass:"c-property-value"},[_vm._v(_vm._s(_vm.element.classes))])])])])],1)}
var ContentFroalaPropsvue_type_template_id_4132244c_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentFroalaProps.vue?vue&type=template&id=4132244c&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFroalaProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentFroalaPropsvue_type_script_lang_js_ = ({
  name: 'content-froala-props',
  mixins: [PropertyMixins],
  props: {
    element: Object
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentFroalaProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFroalaPropsvue_type_script_lang_js_ = (ContentFroalaPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentFroalaProps.vue?vue&type=style&index=0&id=4132244c&lang=scss&scoped=true&
var ContentFroalaPropsvue_type_style_index_0_id_4132244c_lang_scss_scoped_true_ = __webpack_require__("026c");

// CONCATENATED MODULE: ./src/components/widgets/ContentFroalaProps.vue






/* normalize component */

var ContentFroalaProps_component = normalizeComponent(
  widgets_ContentFroalaPropsvue_type_script_lang_js_,
  ContentFroalaPropsvue_type_template_id_4132244c_scoped_true_lang_pug_render,
  ContentFroalaPropsvue_type_template_id_4132244c_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "4132244c",
  null
  
)

ContentFroalaProps_component.options.__file = "ContentFroalaProps.vue"
/* harmony default export */ var ContentFroalaProps = (ContentFroalaProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentField.vue?vue&type=template&id=62052e76&scoped=true&lang=pug&
var ContentFieldvue_type_template_id_62052e76_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content-field",class:[_vm.editModeClass, (_vm.pageEditMode=='debug') ? 'tt-field-outline' : '']},[(_vm.isDesignMode)?_c('div',{staticClass:"tt-field",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("field")],1),_c('div',{staticClass:"field"},[_c('div',{staticClass:"label"},[_vm._v(_vm._s(_vm.protectedLabel))]),_c('div',{staticClass:"control"},[_c('input',{staticClass:"input",attrs:{"type":"text","placeholder":_vm.protectedPlaceholder,"readonly":""}})]),_c('p',{staticClass:"help"},[_vm._v(_vm._s(_vm.protectedHelp))])])]):(_vm.isEditMode)?_c('div',{staticClass:"tt-field",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"field"},[_c('div',{staticClass:"label"},[_vm._v(_vm._s(_vm.protectedLabel))]),_c('div',{staticClass:"control"},[_c('input',{staticClass:"input",attrs:{"type":"text","placeholder":_vm.protectedPlaceholder,"readonly":""}})]),_c('p',{staticClass:"help"},[_vm._v(_vm._s(_vm.protectedHelp))])])]):_c('div',{staticClass:"field"},[_c('div',{staticClass:"label"},[_vm._v(_vm._s(_vm.protectedLabel))]),_c('div',{staticClass:"control"},[_c('input',{staticClass:"input",attrs:{"type":"text","placeholder":_vm.protectedPlaceholder}})]),_c('p',{staticClass:"help"},[_vm._v(_vm._s(_vm.protectedHelp))])])])}
var ContentFieldvue_type_template_id_62052e76_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentField.vue?vue&type=template&id=62052e76&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// CONCATENATED MODULE: ./src/lib/ProtectedTooltwistField.js


/* harmony default export */ var ProtectedTooltwistField = (function (name) {
  var protectedName = "protected".concat(name.substring(0, 1).toUpperCase()).concat(name.substring(1)); // console.log(`protectedName=${protectedName}`)

  var obj = _defineProperty({}, protectedName, {
    get: function get() {
      return this.element[name];
    },
    set: function set(value) {
      // console.log('-->' + protectedName)
      this.$content.setProperty({
        vm: this,
        element: this.element,
        name: name,
        value: value
      });
    }
  }); // console.log('obj is ', obj)


  return obj;
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditBarIcons.vue?vue&type=template&id=cc7e0da4&scoped=true&lang=pug&
var EditBarIconsvue_type_template_id_cc7e0da4_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',{staticClass:"c-editbar-icons"},[_c('span',{directives:[{name:"clipboard",rawName:"v-clipboard",value:(_vm.myElementCutToClipboard),expression:"myElementCutToClipboard"},{name:"clipboard",rawName:"v-clipboard:success",value:(_vm.clipboardSuccessHandler),expression:"clipboardSuccessHandler",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:(_vm.clipboardErrorHandler),expression:"clipboardErrorHandler",arg:"error"}]},[_vm._v(" "),_c('font-awesome-icon',{attrs:{"icon":"cut"}}),_vm._v(" ")],1),_c('span',{directives:[{name:"clipboard",rawName:"v-clipboard",value:(_vm.myElementCopyToClipboard),expression:"myElementCopyToClipboard"},{name:"clipboard",rawName:"v-clipboard:success",value:(_vm.clipboardSuccessHandler),expression:"clipboardSuccessHandler",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:(_vm.clipboardErrorHandler),expression:"clipboardErrorHandler",arg:"error"}]},[_vm._v(" "),_c('font-awesome-icon',{attrs:{"icon":"copy"}}),_vm._v(" ")],1),_c('span',{on:{"click":function($event){$event.stopPropagation();return _vm.downloadMyElement($event)}}},[_vm._v(" "),_c('font-awesome-icon',{attrs:{"icon":"download"}}),_vm._v(" ")],1),_c('span',{on:{"click":function($event){$event.stopPropagation();return _vm.deleteMyElement($event)}}},[_vm._v(" "),_c('font-awesome-icon',{attrs:{"icon":"trash"}}),_vm._v(" ")],1),_c('div',{staticClass:"c-gutter-right"})]):_vm._e()}
var EditBarIconsvue_type_template_id_cc7e0da4_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EditBarIcons.vue?vue&type=template&id=cc7e0da4&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditBarIcons.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var EditBarIconsvue_type_script_lang_js_ = ({
  name: 'edit-bar-icons',
  props: {
    /*
     *  Must provide either contentId or an element.
     *  If contentId is provided, we'll select the content from Crowdhound.
     *  If an element is provided, we'll update it via $content.store.
     */
    contentId: String,
    element: Object
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  data: function data() {
    return {
      // Did we pass sanity checks?
      sane: true
    };
  },
  computed: {
    useCrowdhound: function useCrowdhound() {
      //return true
      return typeof this.contentId != 'undefined';
    }
  },
  methods: {},
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }
  }
});
// CONCATENATED MODULE: ./src/components/EditBarIcons.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_EditBarIconsvue_type_script_lang_js_ = (EditBarIconsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/EditBarIcons.vue?vue&type=style&index=0&id=cc7e0da4&lang=scss&scoped=true&
var EditBarIconsvue_type_style_index_0_id_cc7e0da4_lang_scss_scoped_true_ = __webpack_require__("f851");

// CONCATENATED MODULE: ./src/components/EditBarIcons.vue






/* normalize component */

var EditBarIcons_component = normalizeComponent(
  components_EditBarIconsvue_type_script_lang_js_,
  EditBarIconsvue_type_template_id_cc7e0da4_scoped_true_lang_pug_render,
  EditBarIconsvue_type_template_id_cc7e0da4_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "cc7e0da4",
  null
  
)

EditBarIcons_component.options.__file = "EditBarIcons.vue"
/* harmony default export */ var EditBarIcons = (EditBarIcons_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentField.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var ContentFieldvue_type_script_lang_js_ = ({
  name: 'content-field',
  components: {
    EditBarIcons: EditBarIcons
  },
  props: {
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  computed: _objectSpread({}, ProtectedTooltwistField('label'), ProtectedTooltwistField('placeholder'), ProtectedTooltwistField('help'))
});
// CONCATENATED MODULE: ./src/components/widgets/ContentField.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFieldvue_type_script_lang_js_ = (ContentFieldvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentField.vue?vue&type=style&index=0&id=62052e76&lang=scss&scoped=true&
var ContentFieldvue_type_style_index_0_id_62052e76_lang_scss_scoped_true_ = __webpack_require__("792c");

// CONCATENATED MODULE: ./src/components/widgets/ContentField.vue






/* normalize component */

var ContentField_component = normalizeComponent(
  widgets_ContentFieldvue_type_script_lang_js_,
  ContentFieldvue_type_template_id_62052e76_scoped_true_lang_pug_render,
  ContentFieldvue_type_template_id_62052e76_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "62052e76",
  null
  
)

ContentField_component.options.__file = "ContentField.vue"
/* harmony default export */ var ContentField = (ContentField_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFieldProps.vue?vue&type=template&id=3b598794&scoped=true&lang=pug&
var ContentFieldPropsvue_type_template_id_3b598794_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Field")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('string-property',{attrs:{"element":_vm.element,"property":"label","label":"Label"}}),_c('string-property',{attrs:{"element":_vm.element,"property":"placeholder","label":"Placeholder"}}),_c('string-property',{attrs:{"element":_vm.element,"property":"help","label":"Help message"}})],1)])],1)}
var ContentFieldPropsvue_type_template_id_3b598794_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentFieldProps.vue?vue&type=template&id=3b598794&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/propertyTypes/StringProperty.vue?vue&type=template&id=8eae555e&scoped=true&lang=pug&
var StringPropertyvue_type_template_id_8eae555e_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v(_vm._s(_vm.label))]),_c('div',{staticClass:"c-property-value"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],staticClass:"input tt-string-input",domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value}}})])])}
var StringPropertyvue_type_template_id_8eae555e_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/propertyTypes/StringProperty.vue?vue&type=template&id=8eae555e&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/propertyTypes/StringProperty.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var StringPropertyvue_type_script_lang_js_ = ({
  name: 'stringProperty',
  props: {
    label: String,
    element: Object,
    property: String
  },
  computed: {
    value: {
      get: function get() {
        return this.element[this.property];
      },
      set: function set(value) {
        //console.log('-->' + this.property + ' <<< ' + value)
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: this.property,
          value: value
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/propertyTypes/StringProperty.vue?vue&type=script&lang=js&
 /* harmony default export */ var propertyTypes_StringPropertyvue_type_script_lang_js_ = (StringPropertyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/propertyTypes/StringProperty.vue?vue&type=style&index=0&id=8eae555e&lang=scss&scoped=true&
var StringPropertyvue_type_style_index_0_id_8eae555e_lang_scss_scoped_true_ = __webpack_require__("1da5");

// CONCATENATED MODULE: ./src/components/propertyTypes/StringProperty.vue






/* normalize component */

var StringProperty_component = normalizeComponent(
  propertyTypes_StringPropertyvue_type_script_lang_js_,
  StringPropertyvue_type_template_id_8eae555e_scoped_true_lang_pug_render,
  StringPropertyvue_type_template_id_8eae555e_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "8eae555e",
  null
  
)

StringProperty_component.options.__file = "StringProperty.vue"
/* harmony default export */ var StringProperty = (StringProperty_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFieldProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ContentFieldPropsvue_type_script_lang_js_ = ({
  name: 'content-field-props',
  mixins: [PropertyMixins],
  components: {
    StringProperty: StringProperty
  },
  props: {
    element: Object
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentFieldProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFieldPropsvue_type_script_lang_js_ = (ContentFieldPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentFieldProps.vue?vue&type=style&index=0&id=3b598794&lang=scss&scoped=true&
var ContentFieldPropsvue_type_style_index_0_id_3b598794_lang_scss_scoped_true_ = __webpack_require__("d2c0");

// CONCATENATED MODULE: ./src/components/widgets/ContentFieldProps.vue






/* normalize component */

var ContentFieldProps_component = normalizeComponent(
  widgets_ContentFieldPropsvue_type_script_lang_js_,
  ContentFieldPropsvue_type_template_id_3b598794_scoped_true_lang_pug_render,
  ContentFieldPropsvue_type_template_id_3b598794_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "3b598794",
  null
  
)

ContentFieldProps_component.options.__file = "ContentFieldProps.vue"
/* harmony default export */ var ContentFieldProps = (ContentFieldProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentForm.vue?vue&type=template&id=02db0bb1&scoped=true&lang=pug&
var ContentFormvue_type_template_id_02db0bb1_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content-form",class:_vm.editModeClass},[(_vm.isDesignMode)?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("form")],1),_c('content-children',{staticClass:"my-content",attrs:{"element":_vm.element,"context":_vm.context}})],1):(_vm.isEditMode)?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1):_c('form',{staticClass:"form"},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1)])}
var ContentFormvue_type_template_id_02db0bb1_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentForm.vue?vue&type=template&id=02db0bb1&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentForm.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ContentFormvue_type_script_lang_js_ = ({
  name: 'content-form',
  props: {
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  data: function data() {
    return {//- 'editing': false
    };
  },
  computed: {//- textStyle: function () {
    //-   var style = { }
    //-   if (this.pageEditMode == 'edit') {
    //-     style['cursor'] = 'pointer'
    //-   }
    //-   if (this.editing) {
    //-     style['color'] = 'magenta'
    //-   }
    //-   copyStyle(this.element, style, 'color')
    //-   copyStyle(this.element, style, 'font-family')
    //-   copyStyle(this.element, style, 'font-size')
    //-   return style
    //- }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFormvue_type_script_lang_js_ = (ContentFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentForm.vue?vue&type=style&index=0&id=02db0bb1&lang=scss&scoped=true&
var ContentFormvue_type_style_index_0_id_02db0bb1_lang_scss_scoped_true_ = __webpack_require__("c31d");

// CONCATENATED MODULE: ./src/components/widgets/ContentForm.vue






/* normalize component */

var ContentForm_component = normalizeComponent(
  widgets_ContentFormvue_type_script_lang_js_,
  ContentFormvue_type_template_id_02db0bb1_scoped_true_lang_pug_render,
  ContentFormvue_type_template_id_02db0bb1_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "02db0bb1",
  null
  
)

ContentForm_component.options.__file = "ContentForm.vue"
/* harmony default export */ var ContentForm = (ContentForm_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFormProps.vue?vue&type=template&id=2f9e558d&scoped=true&lang=pug&
var ContentFormPropsvue_type_template_id_2f9e558d_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Form")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("ID")]),_c('div',{staticClass:"c-property-value"},[_vm._v(_vm._s(_vm.element.id))])])])])],1)}
var ContentFormPropsvue_type_template_id_2f9e558d_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentFormProps.vue?vue&type=template&id=2f9e558d&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFormProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentFormPropsvue_type_script_lang_js_ = ({
  name: 'content-form-props',
  mixins: [PropertyMixins],
  props: {
    element: Object
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentFormProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFormPropsvue_type_script_lang_js_ = (ContentFormPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentFormProps.vue?vue&type=style&index=0&id=2f9e558d&lang=scss&scoped=true&
var ContentFormPropsvue_type_style_index_0_id_2f9e558d_lang_scss_scoped_true_ = __webpack_require__("506b");

// CONCATENATED MODULE: ./src/components/widgets/ContentFormProps.vue






/* normalize component */

var ContentFormProps_component = normalizeComponent(
  widgets_ContentFormPropsvue_type_script_lang_js_,
  ContentFormPropsvue_type_template_id_2f9e558d_scoped_true_lang_pug_render,
  ContentFormPropsvue_type_template_id_2f9e558d_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "2f9e558d",
  null
  
)

ContentFormProps_component.options.__file = "ContentFormProps.vue"
/* harmony default export */ var ContentFormProps = (ContentFormProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentSection.vue?vue&type=template&id=93104fcc&scoped=true&lang=pug&
var ContentSectionvue_type_template_id_93104fcc_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content-section",class:[(_vm.pageEditMode=='debug') ? 'my-outline' : '']},[(_vm.pageEditMode==='debug')?[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("section")],1),_c('div',{staticClass:"section section"},[_c('content-children',{staticClass:"my-content",attrs:{"element":_vm.element,"context":_vm.context}})],1)]:(_vm.pageEditMode==='edit')?_c('div',{staticClass:"section section",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1):_c('div',{staticClass:"section section"},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1)],2)}
var ContentSectionvue_type_template_id_93104fcc_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentSection.vue?vue&type=template&id=93104fcc&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentSection.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ContentSectionvue_type_script_lang_js_ = ({
  name: 'content-section',
  components: {
    EditBarIcons: EditBarIcons
  },
  props: {
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  computed: {//- sectionStyle: function () {
    //-   let style = { }
    //-   this.copyStyle(this.element, style, 'background-color')
    //-   this.copyStyle(this.element, style, 'padding')
    //-   this.copyStyle(this.element, style, 'padding-top')
    //-   this.copyStyle(this.element, style, 'padding-bottom')
    //-   this.copyStyle(this.element, style, 'padding-left')
    //-   this.copyStyle(this.element, style, 'padding-right')
    //-   return style
    //- }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentSection.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentSectionvue_type_script_lang_js_ = (ContentSectionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentSection.vue?vue&type=style&index=0&id=93104fcc&lang=scss&scoped=true&
var ContentSectionvue_type_style_index_0_id_93104fcc_lang_scss_scoped_true_ = __webpack_require__("0407");

// CONCATENATED MODULE: ./src/components/widgets/ContentSection.vue






/* normalize component */

var ContentSection_component = normalizeComponent(
  widgets_ContentSectionvue_type_script_lang_js_,
  ContentSectionvue_type_template_id_93104fcc_scoped_true_lang_pug_render,
  ContentSectionvue_type_template_id_93104fcc_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "93104fcc",
  null
  
)

ContentSection_component.options.__file = "ContentSection.vue"
/* harmony default export */ var ContentSection = (ContentSection_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentSectionProps.vue?vue&type=template&id=6410b1cd&lang=pug&
var ContentSectionPropsvue_type_template_id_6410b1cd_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Section")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"})])],1)}
var ContentSectionPropsvue_type_template_id_6410b1cd_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentSectionProps.vue?vue&type=template&id=6410b1cd&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentSectionProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentSectionPropsvue_type_script_lang_js_ = ({
  name: 'content-section-props',
  mixins: [PropertyMixins],
  props: {
    element: Object
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentSectionProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentSectionPropsvue_type_script_lang_js_ = (ContentSectionPropsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/widgets/ContentSectionProps.vue





/* normalize component */

var ContentSectionProps_component = normalizeComponent(
  widgets_ContentSectionPropsvue_type_script_lang_js_,
  ContentSectionPropsvue_type_template_id_6410b1cd_lang_pug_render,
  ContentSectionPropsvue_type_template_id_6410b1cd_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

ContentSectionProps_component.options.__file = "ContentSectionProps.vue"
/* harmony default export */ var ContentSectionProps = (ContentSectionProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentContainer.vue?vue&type=template&id=0718f2e8&scoped=true&lang=pug&
var ContentContainervue_type_template_id_0718f2e8_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-content-container",class:_vm.editModeClass},[(_vm.pageEditMode==='edit')?_c('div',{staticClass:"container",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1):(_vm.pageEditMode==='debug')?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("container")],1),_c('div',{staticClass:"container"},[_c('content-children',{staticClass:"my-content",attrs:{"element":_vm.element,"context":_vm.context}})],1)]):_c('div',{staticClass:"container"},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1)])}
var ContentContainervue_type_template_id_0718f2e8_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentContainer.vue?vue&type=template&id=0718f2e8&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentContainer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ContentContainervue_type_script_lang_js_ = ({
  name: 'content-container',
  components: {
    EditBarIcons: EditBarIcons
  },
  props: {
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  computed: {
    sectionStyle: function sectionStyle() {
      var style = {};
      copyStyle(this.element, style, 'background-color');
      copyStyle(this.element, style, 'padding');
      copyStyle(this.element, style, 'padding-top');
      copyStyle(this.element, style, 'padding-bottom');
      copyStyle(this.element, style, 'padding-left');
      copyStyle(this.element, style, 'padding-right');
      return style;
    }
  }
  /* function copyStyle(from, to, name) {
    if (from[name]) {
      to[name] = from[name]
    }
  } */

});
// CONCATENATED MODULE: ./src/components/widgets/ContentContainer.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentContainervue_type_script_lang_js_ = (ContentContainervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentContainer.vue?vue&type=style&index=0&lang=scss&
var ContentContainervue_type_style_index_0_lang_scss_ = __webpack_require__("180b");

// EXTERNAL MODULE: ./src/components/widgets/ContentContainer.vue?vue&type=style&index=1&id=0718f2e8&lang=scss&scoped=true&
var ContentContainervue_type_style_index_1_id_0718f2e8_lang_scss_scoped_true_ = __webpack_require__("2153");

// CONCATENATED MODULE: ./src/components/widgets/ContentContainer.vue







/* normalize component */

var ContentContainer_component = normalizeComponent(
  widgets_ContentContainervue_type_script_lang_js_,
  ContentContainervue_type_template_id_0718f2e8_scoped_true_lang_pug_render,
  ContentContainervue_type_template_id_0718f2e8_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "0718f2e8",
  null
  
)

ContentContainer_component.options.__file = "ContentContainer.vue"
/* harmony default export */ var ContentContainer = (ContentContainer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentContainerProps.vue?vue&type=template&id=1131288b&scoped=true&lang=pug&
var ContentContainerPropsvue_type_template_id_1131288b_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Container")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("Type")]),_c('div',{staticClass:"c-property-value"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.protectedIsFluid),expression:"protectedIsFluid"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.protectedIsFluid=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',[_vm._v("navbar")]),_c('option',[_vm._v("hero")]),_c('option',[_vm._v("section")]),_c('option',[_vm._v("footer")])])])]),_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"}),_c('div',{staticClass:"c-property-value"},[_c('label',{staticClass:"checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.protectedIsFluid),expression:"protectedIsFluid"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.protectedIsFluid)?_vm._i(_vm.protectedIsFluid,null)>-1:(_vm.protectedIsFluid)},on:{"change":function($event){var $$a=_vm.protectedIsFluid,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.protectedIsFluid=$$a.concat([$$v]))}else{$$i>-1&&(_vm.protectedIsFluid=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.protectedIsFluid=$$c}}}}),_vm._v(" full width")])])]),_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("Background")]),_c('div',{staticClass:"c-property-value"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.protectedBgColor),expression:"protectedBgColor"}],staticClass:"input",domProps:{"value":(_vm.protectedBgColor)},on:{"input":function($event){if($event.target.composing){ return; }_vm.protectedBgColor=$event.target.value}}})])])])])],1)}
var ContentContainerPropsvue_type_template_id_1131288b_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentContainerProps.vue?vue&type=template&id=1131288b&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentContainerProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentContainerPropsvue_type_script_lang_js_ = ({
  name: 'content-container-props',
  mixins: [PropertyMixins],
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  computed: {
    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    protectedMode: {
      get: function get() {
        var value = this.element['mode'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'mode',
          value: value
        });
      }
    },
    protectedIsFluid: {
      get: function get() {
        var value = this.element['is-fluid'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'is-fluid',
          value: value
        });
      }
    },
    protectedBgColor: {
      get: function get() {
        var value = this.element['background-color'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'background-color',
          value: value
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentContainerProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentContainerPropsvue_type_script_lang_js_ = (ContentContainerPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentContainerProps.vue?vue&type=style&index=0&lang=scss&
var ContentContainerPropsvue_type_style_index_0_lang_scss_ = __webpack_require__("fc74");

// EXTERNAL MODULE: ./src/components/widgets/ContentContainerProps.vue?vue&type=style&index=1&id=1131288b&lang=scss&scoped=true&
var ContentContainerPropsvue_type_style_index_1_id_1131288b_lang_scss_scoped_true_ = __webpack_require__("8cd0");

// CONCATENATED MODULE: ./src/components/widgets/ContentContainerProps.vue







/* normalize component */

var ContentContainerProps_component = normalizeComponent(
  widgets_ContentContainerPropsvue_type_script_lang_js_,
  ContentContainerPropsvue_type_template_id_1131288b_scoped_true_lang_pug_render,
  ContentContainerPropsvue_type_template_id_1131288b_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "1131288b",
  null
  
)

ContentContainerProps_component.options.__file = "ContentContainerProps.vue"
/* harmony default export */ var ContentContainerProps = (ContentContainerProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFixedPositionContainer.vue?vue&type=template&id=e4932dc4&scoped=true&lang=pug&
var ContentFixedPositionContainervue_type_template_id_e4932dc4_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-content-container",class:_vm.editModeClass},[(_vm.pageEditMode==='edit')?_c('div',{staticClass:"container",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1):(_vm.pageEditMode==='debug')?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("container")],1),_c('div',{staticClass:"container"},[_c('content-children',{staticClass:"my-content",attrs:{"element":_vm.element,"context":_vm.context}})],1)]):_c('div',{staticClass:"container"},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1)])}
var ContentFixedPositionContainervue_type_template_id_e4932dc4_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentFixedPositionContainer.vue?vue&type=template&id=e4932dc4&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFixedPositionContainer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ContentFixedPositionContainervue_type_script_lang_js_ = ({
  name: 'content-fixed-position-container',
  components: {
    EditBarIcons: EditBarIcons
  },
  props: {
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  computed: {
    sectionStyle: function sectionStyle() {
      var style = {};
      copyStyle(this.element, style, 'background-color');
      copyStyle(this.element, style, 'padding');
      copyStyle(this.element, style, 'padding-top');
      copyStyle(this.element, style, 'padding-bottom');
      copyStyle(this.element, style, 'padding-left');
      copyStyle(this.element, style, 'padding-right');
      return style;
    }
  }
  /* function copyStyle(from, to, name) {
    if (from[name]) {
      to[name] = from[name]
    }
  } */

});
// CONCATENATED MODULE: ./src/components/widgets/ContentFixedPositionContainer.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFixedPositionContainervue_type_script_lang_js_ = (ContentFixedPositionContainervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentFixedPositionContainer.vue?vue&type=style&index=0&lang=scss&
var ContentFixedPositionContainervue_type_style_index_0_lang_scss_ = __webpack_require__("33a4");

// EXTERNAL MODULE: ./src/components/widgets/ContentFixedPositionContainer.vue?vue&type=style&index=1&id=e4932dc4&lang=scss&scoped=true&
var ContentFixedPositionContainervue_type_style_index_1_id_e4932dc4_lang_scss_scoped_true_ = __webpack_require__("07af");

// CONCATENATED MODULE: ./src/components/widgets/ContentFixedPositionContainer.vue







/* normalize component */

var ContentFixedPositionContainer_component = normalizeComponent(
  widgets_ContentFixedPositionContainervue_type_script_lang_js_,
  ContentFixedPositionContainervue_type_template_id_e4932dc4_scoped_true_lang_pug_render,
  ContentFixedPositionContainervue_type_template_id_e4932dc4_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "e4932dc4",
  null
  
)

ContentFixedPositionContainer_component.options.__file = "ContentFixedPositionContainer.vue"
/* harmony default export */ var ContentFixedPositionContainer = (ContentFixedPositionContainer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFixedPositionContainerProps.vue?vue&type=template&id=5741844e&scoped=true&lang=pug&
var ContentFixedPositionContainerPropsvue_type_template_id_5741844e_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Container")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("Type")]),_c('div',{staticClass:"c-property-value"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.protectedIsFluid),expression:"protectedIsFluid"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.protectedIsFluid=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',[_vm._v("navbar")]),_c('option',[_vm._v("hero")]),_c('option',[_vm._v("section")]),_c('option',[_vm._v("footer")])])])]),_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"}),_c('div',{staticClass:"c-property-value"},[_c('label',{staticClass:"checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.protectedIsFluid),expression:"protectedIsFluid"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.protectedIsFluid)?_vm._i(_vm.protectedIsFluid,null)>-1:(_vm.protectedIsFluid)},on:{"change":function($event){var $$a=_vm.protectedIsFluid,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.protectedIsFluid=$$a.concat([$$v]))}else{$$i>-1&&(_vm.protectedIsFluid=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.protectedIsFluid=$$c}}}}),_vm._v(" full width")])])]),_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("Background")]),_c('div',{staticClass:"c-property-value"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.protectedBgColor),expression:"protectedBgColor"}],staticClass:"input",domProps:{"value":(_vm.protectedBgColor)},on:{"input":function($event){if($event.target.composing){ return; }_vm.protectedBgColor=$event.target.value}}})])])])])],1)}
var ContentFixedPositionContainerPropsvue_type_template_id_5741844e_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentFixedPositionContainerProps.vue?vue&type=template&id=5741844e&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentFixedPositionContainerProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentFixedPositionContainerPropsvue_type_script_lang_js_ = ({
  name: 'content-fixed-position-container-props',
  mixins: [PropertyMixins],
  props: {
    element: Object
  },
  computed: {
    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    protectedMode: {
      get: function get() {
        var value = this.element['mode'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'mode',
          value: value
        });
      }
    },
    protectedIsFluid: {
      get: function get() {
        var value = this.element['is-fluid'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'is-fluid',
          value: value
        });
      }
    },
    protectedBgColor: {
      get: function get() {
        var value = this.element['background-color'];
        return value ? value : '-';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'background-color',
          value: value
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentFixedPositionContainerProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentFixedPositionContainerPropsvue_type_script_lang_js_ = (ContentFixedPositionContainerPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentFixedPositionContainerProps.vue?vue&type=style&index=0&id=5741844e&lang=scss&scoped=true&
var ContentFixedPositionContainerPropsvue_type_style_index_0_id_5741844e_lang_scss_scoped_true_ = __webpack_require__("73f4");

// CONCATENATED MODULE: ./src/components/widgets/ContentFixedPositionContainerProps.vue






/* normalize component */

var ContentFixedPositionContainerProps_component = normalizeComponent(
  widgets_ContentFixedPositionContainerPropsvue_type_script_lang_js_,
  ContentFixedPositionContainerPropsvue_type_template_id_5741844e_scoped_true_lang_pug_render,
  ContentFixedPositionContainerPropsvue_type_template_id_5741844e_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "5741844e",
  null
  
)

ContentFixedPositionContainerProps_component.options.__file = "ContentFixedPositionContainerProps.vue"
/* harmony default export */ var ContentFixedPositionContainerProps = (ContentFixedPositionContainerProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentColumns.vue?vue&type=template&id=ef05ac18&scoped=true&lang=pug&
var ContentColumnsvue_type_template_id_ef05ac18_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-content-columns",class:_vm.editModeClass},[(_vm.isDesignMode)?[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("columns")],1)]:_vm._e(),(_vm.isDesignMode)?_c('div',{staticClass:"columns",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},_vm._l((_vm.element.children),function(child,index){return _c('div',{staticClass:"column"},[_c('div',{staticClass:"c-content-column",class:_vm.editModeClass},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('div',{staticClass:"c-editbar-icons"},[(index > 0)?_c('span',{on:{"click":function($event){$event.stopPropagation();_vm.shiftLeft(index)}}},[_vm._v(" \n<\n ")]):_vm._e(),(index < _vm.element.children.length - 1)?_c('span',{on:{"click":function($event){$event.stopPropagation();_vm.shiftRight(index)}}},[_vm._v(" \n>\n ")]):_vm._e(),_c('span',{on:{"click":function($event){$event.stopPropagation();_vm.addColumn(index)}}},[_vm._v(" \n+\n ")]),_c('span',{on:{"click":function($event){$event.stopPropagation();_vm.deleteColumn(index)}}},[_vm._v(" "),_c('font-awesome-icon',{attrs:{"icon":"trash"}}),_vm._v(" ")],1)]),_vm._v("column")]),_c('content-children',{attrs:{"element":child,"context":_vm.context}})],1)])})):_c('div',{staticClass:"columns",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},_vm._l((_vm.element.children),function(child,index){return _c('div',{staticClass:"column"},[_c('content-children',{attrs:{"element":child,"context":_vm.context}})],1)}))],2)}
var ContentColumnsvue_type_template_id_ef05ac18_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentColumns.vue?vue&type=template&id=ef05ac18&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentColumns.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ContentColumnsvue_type_script_lang_js_ = ({
  name: 'content-columns',
  components: {
    EditBarIcons: EditBarIcons
  },
  props: {
    element: Object,
    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    }
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  methods: {
    shiftLeft: function shiftLeft(index) {
      this.$content.moveChild({
        vm: this,
        parent: this.element,
        from: index,
        to: index - 1
      });
    },
    shiftRight: function shiftRight(index) {
      this.$content.moveChild({
        vm: this,
        parent: this.element,
        from: index,
        to: index + 1
      });
    },
    addColumn: function addColumn(index) {
      var insertContent = {
        type: "contentservice.io",
        version: "1.0",
        source: "toolbox",
        layout: {
          type: 'panelWithoutProperties',
          children: []
        }
      };
      this.$content.insertLayout({
        vm: this,
        parent: this.element,
        position: index + 1,
        layout: insertContent
      });
    },
    deleteColumn: function deleteColumn(index) {
      // Confirm first
      var result = confirm("Are you sure you want to delete this column?");

      if (result) {
        // Delete the column
        var child = this.element.children[index];
        this.$content.deleteElement({
          vm: this,
          element: child
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentColumns.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentColumnsvue_type_script_lang_js_ = (ContentColumnsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentColumns.vue?vue&type=style&index=0&id=ef05ac18&lang=scss&scoped=true&
var ContentColumnsvue_type_style_index_0_id_ef05ac18_lang_scss_scoped_true_ = __webpack_require__("44e9");

// CONCATENATED MODULE: ./src/components/widgets/ContentColumns.vue






/* normalize component */

var ContentColumns_component = normalizeComponent(
  widgets_ContentColumnsvue_type_script_lang_js_,
  ContentColumnsvue_type_template_id_ef05ac18_scoped_true_lang_pug_render,
  ContentColumnsvue_type_template_id_ef05ac18_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "ef05ac18",
  null
  
)

ContentColumns_component.options.__file = "ContentColumns.vue"
/* harmony default export */ var ContentColumns = (ContentColumns_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentColumnsProps.vue?vue&type=template&id=7864ed43&lang=pug&
var ContentColumnsPropsvue_type_template_id_7864ed43_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Columns")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[(_vm.isExpandedElement)?_c('div',{staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("Columns")]),_c('div',{staticClass:"c-property-value"},[_c('div',{staticClass:"column c-property-value"},[_vm._v(_vm._s(_vm.element.children.length))])])])]):_vm._e()])],1)}
var ContentColumnsPropsvue_type_template_id_7864ed43_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentColumnsProps.vue?vue&type=template&id=7864ed43&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentColumnsProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentColumnsPropsvue_type_script_lang_js_ = ({
  name: 'content-columns-props',
  mixins: [PropertyMixins],
  props: {
    element: Object
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentColumnsProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentColumnsPropsvue_type_script_lang_js_ = (ContentColumnsPropsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/widgets/ContentColumnsProps.vue





/* normalize component */

var ContentColumnsProps_component = normalizeComponent(
  widgets_ContentColumnsPropsvue_type_script_lang_js_,
  ContentColumnsPropsvue_type_template_id_7864ed43_lang_pug_render,
  ContentColumnsPropsvue_type_template_id_7864ed43_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

ContentColumnsProps_component.options.__file = "ContentColumnsProps.vue"
/* harmony default export */ var ContentColumnsProps = (ContentColumnsProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/PanelWithoutProperties.vue?vue&type=template&id=c9351df6&lang=pug&
var PanelWithoutPropertiesvue_type_template_id_c9351df6_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-panel-without-properties"},[_c('content-children',{attrs:{"element":_vm.element,"context":_vm.context}})],1)}
var PanelWithoutPropertiesvue_type_template_id_c9351df6_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/PanelWithoutProperties.vue?vue&type=template&id=c9351df6&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/PanelWithoutProperties.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
// import ContentMixins from '../../mixins/ContentMixins'
/* harmony default export */ var PanelWithoutPropertiesvue_type_script_lang_js_ = ({
  props: {
    element: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    }
  } // mixins: [ ContentMixins ],

});
// CONCATENATED MODULE: ./src/components/widgets/PanelWithoutProperties.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_PanelWithoutPropertiesvue_type_script_lang_js_ = (PanelWithoutPropertiesvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/widgets/PanelWithoutProperties.vue





/* normalize component */

var PanelWithoutProperties_component = normalizeComponent(
  widgets_PanelWithoutPropertiesvue_type_script_lang_js_,
  PanelWithoutPropertiesvue_type_template_id_c9351df6_lang_pug_render,
  PanelWithoutPropertiesvue_type_template_id_c9351df6_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

PanelWithoutProperties_component.options.__file = "PanelWithoutProperties.vue"
/* harmony default export */ var PanelWithoutProperties = (PanelWithoutProperties_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/PanelWithoutPropertiesProps.vue?vue&type=template&id=7b5d3afe&lang=pug&
var PanelWithoutPropertiesPropsvue_type_template_id_7b5d3afe_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-panel-without-properties-props"})}
var PanelWithoutPropertiesPropsvue_type_template_id_7b5d3afe_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/PanelWithoutPropertiesProps.vue?vue&type=template&id=7b5d3afe&lang=pug&

// CONCATENATED MODULE: ./src/components/widgets/PanelWithoutPropertiesProps.vue

var script = {}


/* normalize component */

var PanelWithoutPropertiesProps_component = normalizeComponent(
  script,
  PanelWithoutPropertiesPropsvue_type_template_id_7b5d3afe_lang_pug_render,
  PanelWithoutPropertiesPropsvue_type_template_id_7b5d3afe_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

PanelWithoutPropertiesProps_component.options.__file = "PanelWithoutPropertiesProps.vue"
/* harmony default export */ var PanelWithoutPropertiesProps = (PanelWithoutPropertiesProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentCardProps.vue?vue&type=template&id=0dcad99e&scoped=true&lang=pug&
var ContentCardPropsvue_type_template_id_0dcad99e_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_c('div',{staticClass:"my-button"}),_vm._v("Card"),_c('transition',{attrs:{"name":"c-property-list-transition"}}),(_vm.isExpandedElement)?_c('div',{staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("doc ID")]),_c('div',{staticClass:"c-property-value"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.docID),expression:"docID"}],staticClass:"input",domProps:{"value":(_vm.docID)},on:{"input":function($event){if($event.target.composing){ return; }_vm.docID=$event.target.value}}})])])]):_vm._e()],1)])}
var ContentCardPropsvue_type_template_id_0dcad99e_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentCardProps.vue?vue&type=template&id=0dcad99e&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentCardProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentCardPropsvue_type_script_lang_js_ = ({
  name: 'content-card-props',
  mixins: [PropertyMixins],
  computed: {
    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    docID: {
      get: function get() {
        var value = this.element['docID'];
        return value ? value : '';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'docID',
          value: value
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentCardProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentCardPropsvue_type_script_lang_js_ = (ContentCardPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentCardProps.vue?vue&type=style&index=0&id=0dcad99e&lang=scss&scoped=true&
var ContentCardPropsvue_type_style_index_0_id_0dcad99e_lang_scss_scoped_true_ = __webpack_require__("c1de");

// CONCATENATED MODULE: ./src/components/widgets/ContentCardProps.vue






/* normalize component */

var ContentCardProps_component = normalizeComponent(
  widgets_ContentCardPropsvue_type_script_lang_js_,
  ContentCardPropsvue_type_template_id_0dcad99e_scoped_true_lang_pug_render,
  ContentCardPropsvue_type_template_id_0dcad99e_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "0dcad99e",
  null
  
)

ContentCardProps_component.options.__file = "ContentCardProps.vue"
/* harmony default export */ var ContentCardProps = (ContentCardProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentYoutube.vue?vue&type=template&id=06baf9c0&scoped=true&lang=pug&
var ContentYoutubevue_type_template_id_06baf9c0_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-youtube",class:[ _vm.editModeClass, (_vm.pageEditMode=='debug') ? 'tt-container-outline' : '']},[(_vm.pageEditMode==='view')?_c('div',{staticClass:"container"},[_c('div',{staticClass:"youtube-container"},[_c('iframe',{attrs:{"width":"560","height":"315","src":_vm.src,"frameborder":"0","allow":"autoplay; encrypted-media","allowfullscreen":""}})])]):(_vm.pageEditMode==='debug')?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("youtube")],1),_vm._m(0)]):_c('div',{staticClass:"container",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"youtube-container my-dummy-iframe"})])])}
var ContentYoutubevue_type_template_id_06baf9c0_scoped_true_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"youtube-container my-dummy-iframe"})])}]


// CONCATENATED MODULE: ./src/components/widgets/ContentYoutube.vue?vue&type=template&id=06baf9c0&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentYoutube.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ContentYoutubevue_type_script_lang_js_ = ({
  name: 'content-youtube',
  components: {
    EditBarIcons: EditBarIcons
  },
  props: {
    element: Object
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  data: function data() {
    return {
      //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl',
      url: 'https://www.youtube.com/embed/NFJu0rnAAm8',
      url2: 'https://www.youtube.com/embed/q1muKgsPWE8'
    };
  },
  computed: {
    src: function src() {
      // let src = `https://docs.google.com/a/tooltwist.com/presentation/d/e/${this.element.docID}/embed?start=false&loop=false&delayms=3000`
      //let src = `https://docs.google.com/presentation/d/${this.element.docID}/preview?slide=id.p1`
      var src = "https://www.youtube.com/embed/".concat(this.element.docID);
      console.log("url=".concat(src));
      return src;
    } // sectionStyle: function () {
    //   let style = { }
    //   copyStyle(this.element, style, 'background-color')
    //   copyStyle(this.element, style, 'padding')
    //   copyStyle(this.element, style, 'padding-top')
    //   copyStyle(this.element, style, 'padding-bottom')
    //   copyStyle(this.element, style, 'padding-left')
    //   copyStyle(this.element, style, 'padding-right')
    //   return style
    // }

  }
  /* function copyStyle(from, to, name) {
    if (from[name]) {
      to[name] = from[name]
    }
  } */

});
// CONCATENATED MODULE: ./src/components/widgets/ContentYoutube.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentYoutubevue_type_script_lang_js_ = (ContentYoutubevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentYoutube.vue?vue&type=style&index=0&id=06baf9c0&lang=scss&scoped=true&
var ContentYoutubevue_type_style_index_0_id_06baf9c0_lang_scss_scoped_true_ = __webpack_require__("1409");

// CONCATENATED MODULE: ./src/components/widgets/ContentYoutube.vue






/* normalize component */

var ContentYoutube_component = normalizeComponent(
  widgets_ContentYoutubevue_type_script_lang_js_,
  ContentYoutubevue_type_template_id_06baf9c0_scoped_true_lang_pug_render,
  ContentYoutubevue_type_template_id_06baf9c0_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "06baf9c0",
  null
  
)

ContentYoutube_component.options.__file = "ContentYoutube.vue"
/* harmony default export */ var ContentYoutube = (ContentYoutube_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentYoutubeProps.vue?vue&type=template&id=39386438&scoped=true&lang=pug&
var ContentYoutubePropsvue_type_template_id_39386438_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_vm._v("Youtube Video")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandedElement),expression:"isExpandedElement"}],staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("Video ID")]),_c('div',{staticClass:"c-property-value"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.docID),expression:"docID"}],staticClass:"input",domProps:{"value":(_vm.docID)},on:{"input":function($event){if($event.target.composing){ return; }_vm.docID=$event.target.value}}})])])])])],1)}
var ContentYoutubePropsvue_type_template_id_39386438_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentYoutubeProps.vue?vue&type=template&id=39386438&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentYoutubeProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentYoutubePropsvue_type_script_lang_js_ = ({
  name: 'content-youtube-props',
  mixins: [PropertyMixins],
  computed: {
    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    docID: {
      get: function get() {
        var value = this.element['docID'];
        return value ? value : '';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'docID',
          value: value
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentYoutubeProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentYoutubePropsvue_type_script_lang_js_ = (ContentYoutubePropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentYoutubeProps.vue?vue&type=style&index=0&id=39386438&lang=scss&scoped=true&
var ContentYoutubePropsvue_type_style_index_0_id_39386438_lang_scss_scoped_true_ = __webpack_require__("3801");

// CONCATENATED MODULE: ./src/components/widgets/ContentYoutubeProps.vue






/* normalize component */

var ContentYoutubeProps_component = normalizeComponent(
  widgets_ContentYoutubePropsvue_type_script_lang_js_,
  ContentYoutubePropsvue_type_template_id_39386438_scoped_true_lang_pug_render,
  ContentYoutubePropsvue_type_template_id_39386438_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "39386438",
  null
  
)

ContentYoutubeProps_component.options.__file = "ContentYoutubeProps.vue"
/* harmony default export */ var ContentYoutubeProps = (ContentYoutubeProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentVimeo.vue?vue&type=template&id=22bbfa14&scoped=true&lang=pug&
var ContentVimeovue_type_template_id_22bbfa14_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-vimeo",class:[ _vm.editModeClass, (_vm.pageEditMode=='debug') ? 'tt-container-outline' : '']},[(_vm.pageEditMode==='view')?_c('div',{staticClass:"container"},[_c('div',{staticClass:"vimeo-container"},[_c('iframe',{attrs:{"src":_vm.src,"frameborder":"0","webkitallowfullscreen":"","mozallowfullscreen":"","allowfullscreen":""}})])]):(_vm.pageEditMode==='debug')?_c('div',{on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"c-layout-mode-heading"},[_c('edit-bar-icons',{attrs:{"element":_vm.element}}),_vm._v("vimeo")],1),_vm._m(0)]):_c('div',{staticClass:"container",on:{"click":function($event){$event.stopPropagation();return _vm.selectThisElement($event)}}},[_c('div',{staticClass:"vimeo-container my-dummy-iframe"})])])}
var ContentVimeovue_type_template_id_22bbfa14_scoped_true_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"vimeo-container my-dummy-iframe"})])}]


// CONCATENATED MODULE: ./src/components/widgets/ContentVimeo.vue?vue&type=template&id=22bbfa14&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentVimeo.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ContentVimeovue_type_script_lang_js_ = ({
  name: 'content-vimeo',
  components: {
    EditBarIcons: EditBarIcons
  },
  props: {
    element: Object
  },
  mixins: [ContentMixins["a" /* default */], CutAndPasteMixins],
  data: function data() {
    return {//docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl',
    };
  },
  computed: {
    src: function src() {
      // let src = `https://docs.google.com/a/tooltwist.com/presentation/d/e/${this.element.docID}/embed?start=false&loop=false&delayms=3000`
      //let src = `https://docs.google.com/presentation/d/${this.element.docID}/preview?slide=id.p1`
      var src = "https://player.vimeo.com/video/".concat(this.element.docID);
      console.log("url=".concat(src));
      return src;
    } // sectionStyle: function () {
    //   let style = { }
    //   copyStyle(this.element, style, 'background-color')
    //   copyStyle(this.element, style, 'padding')
    //   copyStyle(this.element, style, 'padding-top')
    //   copyStyle(this.element, style, 'padding-bottom')
    //   copyStyle(this.element, style, 'padding-left')
    //   copyStyle(this.element, style, 'padding-right')
    //   return style
    // }

  }
  /* function copyStyle(from, to, name) {
    if (from[name]) {
      to[name] = from[name]
    }
  } */

});
// CONCATENATED MODULE: ./src/components/widgets/ContentVimeo.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentVimeovue_type_script_lang_js_ = (ContentVimeovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentVimeo.vue?vue&type=style&index=0&id=22bbfa14&lang=scss&scoped=true&
var ContentVimeovue_type_style_index_0_id_22bbfa14_lang_scss_scoped_true_ = __webpack_require__("7578");

// CONCATENATED MODULE: ./src/components/widgets/ContentVimeo.vue






/* normalize component */

var ContentVimeo_component = normalizeComponent(
  widgets_ContentVimeovue_type_script_lang_js_,
  ContentVimeovue_type_template_id_22bbfa14_scoped_true_lang_pug_render,
  ContentVimeovue_type_template_id_22bbfa14_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "22bbfa14",
  null
  
)

ContentVimeo_component.options.__file = "ContentVimeo.vue"
/* harmony default export */ var ContentVimeo = (ContentVimeo_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentVimeoProps.vue?vue&type=template&id=a2436d4c&scoped=true&lang=pug&
var ContentVimeoPropsvue_type_template_id_a2436d4c_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-property-element",class:_vm.propertyClass},[_c('div',{staticClass:"tt-property-header",on:{"click":_vm.setExpandedElement}},[_c('div',{staticClass:"my-button"}),_vm._v("Vimeo Video")]),_c('transition',{attrs:{"name":"c-property-list-transition"}},[(_vm.isExpandedElement)?_c('div',{staticClass:"c-element-properties"},[_c('div',{staticClass:"tt-property"},[_c('div',{staticClass:"c-property-label"},[_vm._v("Video ID")]),_c('div',{staticClass:"c-property-value"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.docID),expression:"docID"}],staticClass:"input",domProps:{"value":(_vm.docID)},on:{"input":function($event){if($event.target.composing){ return; }_vm.docID=$event.target.value}}})])])]):_vm._e()])],1)}
var ContentVimeoPropsvue_type_template_id_a2436d4c_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/widgets/ContentVimeoProps.vue?vue&type=template&id=a2436d4c&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/widgets/ContentVimeoProps.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ContentVimeoPropsvue_type_script_lang_js_ = ({
  name: 'content-vimeo-props',
  mixins: [PropertyMixins],
  computed: {
    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    docID: {
      get: function get() {
        var value = this.element['docID'];
        return value ? value : '';
      },
      set: function set(value) {
        this.$content.setProperty({
          vm: this,
          element: this.element,
          name: 'docID',
          value: value
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/widgets/ContentVimeoProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var widgets_ContentVimeoPropsvue_type_script_lang_js_ = (ContentVimeoPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/widgets/ContentVimeoProps.vue?vue&type=style&index=0&id=a2436d4c&lang=scss&scoped=true&
var ContentVimeoPropsvue_type_style_index_0_id_a2436d4c_lang_scss_scoped_true_ = __webpack_require__("c513");

// CONCATENATED MODULE: ./src/components/widgets/ContentVimeoProps.vue






/* normalize component */

var ContentVimeoProps_component = normalizeComponent(
  widgets_ContentVimeoPropsvue_type_script_lang_js_,
  ContentVimeoPropsvue_type_template_id_a2436d4c_scoped_true_lang_pug_render,
  ContentVimeoPropsvue_type_template_id_a2436d4c_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "a2436d4c",
  null
  
)

ContentVimeoProps_component.options.__file = "ContentVimeoProps.vue"
/* harmony default export */ var ContentVimeoProps = (ContentVimeoProps_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentAdminBlogList.vue?vue&type=template&id=5b5f31ee&scoped=true&lang=pug&
var ContentAdminBlogListvue_type_template_id_5b5f31ee_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',[_c('content-admin-blog-list-element',{attrs:{"element":_vm.element,"level":0,"tenant":_vm.tenant,"path-for-details":"/app-settings/{TENANT}/blog/{BLOGID}"}})],1):_vm._e()}
var ContentAdminBlogListvue_type_template_id_5b5f31ee_scoped_true_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentAdminBlogList.vue?vue&type=template&id=5b5f31ee&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentAdminBlogListElement.vue?vue&type=template&id=d3c49d02&scoped=true&lang=pug&
var ContentAdminBlogListElementvue_type_template_id_d3c49d02_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',{staticClass:"crowdhound-comment"},[(_vm.element)?_c('div',{staticClass:"surround"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.selectStatus == 'loaded'),expression:"selectStatus == 'loaded'"}],staticClass:"list"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-2 is-offset-10"},[_c('div',{staticClass:"field"},[_c('div',{staticClass:"control has-icons-right"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterKey),expression:"filterKey"}],staticClass:"input is-small is-rounded",attrs:{"type":"text","placeholder":"filter blogs","autocomplete":"off"},domProps:{"value":(_vm.filterKey)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filterKey=$event.target.value}}}),_vm._m(0)])])])]),_c('table',{staticClass:"table is-fullwidth is-bordered is-narrow",class:{'is-hoverable': typeof(_vm.pathForDetails) === 'string'}},[_c('thead',[_c('tr',_vm._l((_vm.ourColumns),function(key){return _c('th',{class:{ active: _vm.sortKey == key },on:{"click":function($event){_vm.sortBy(key)}}},[_vm._v(_vm._s(_vm._f("capitalize")(key))),_c('span',{staticClass:"arrow",class:_vm.sortOrders[key] > 0 ? 'asc' : 'dsc'})])}))]),_c('tbody',[_c('tr',{on:{"click":function($event){_vm.selectBlog({tenant: _vm.element.tenant, id: _vm.element.id})}}},[_c('td',[_c('span',[_vm._v(_vm._s(_vm.element.title))])]),_c('td',[_c('span',[_vm._v(_vm._s(_vm.element.summary))])]),_c('td',[_c('span',[_vm._v(_vm._s(_vm.element.description))])])])])])]),_vm._l((_vm.element.children),function(child){return _c('div',[_c('content-admin-blog-list-element',{attrs:{"element":child,"level":_vm.level + 1}})],1)})],2):_vm._e()]):_vm._e()}
var ContentAdminBlogListElementvue_type_template_id_d3c49d02_scoped_true_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon is-small is-right"},[_c('i',{staticClass:"fa fa-search"})])}]


// CONCATENATED MODULE: ./src/components/ContentAdminBlogListElement.vue?vue&type=template&id=d3c49d02&scoped=true&lang=pug&

// EXTERNAL MODULE: external "core-js/modules/es6.regexp.replace"
var es6_regexp_replace_ = __webpack_require__("00dd");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentAdminBlogListElement.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ContentAdminBlogListElementvue_type_script_lang_js_ = ({
  name: 'content-admin-blog-list-element',
  props: {
    element: Object,
    level: Number,
    tenant: String,
    pathForDetails: String
  },
  data: function data() {
    // Has the user provided a list of columns?
    var ourColumns = this.columns;

    if (typeof this.columns === 'undefined') {
      ourColumns = [// Default only - may be replaced with 'columns' prop
      'title', 'summary', 'description'];
    } // Order for sorting fields


    var sortOrders = {};
    ourColumns.forEach(function (key) {
      sortOrders[key] = 1;
    }); // Return the data fields

    return {
      sortKey: '',
      sortOrders: sortOrders,
      filterKey: '',
      ourColumns: ourColumns,
      locallySelectedUsers: [],
      selectStatus: 'loaded',
      // Did we pass sanity checks?
      sane: true
    };
  },
  filters: {
    capitalize: function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    selectBlog: function selectBlog(blog) {
      console.log("Selected blog:", blog);
      console.log(this.pathForDetails);
      console.log('pathForDetails:', _typeof(this.pathForDetails));

      if (this.pathForDetails) {
        // Check that we have places in the path where we insert tenant and blogId.
        // For example '/myapp/{TENANT}/blog/{BLOGID}'
        var tenantMarker = '{TENANT}';
        var blogIdMarker = '{BLOGID}';
        var replaceTenant = this.pathForDetails.includes(tenantMarker);
        var replaceBlogId = this.pathForDetails.includes(blogIdMarker);

        if (replaceTenant && replaceBlogId) {
          // Work out where are jumping to
          var path = this.pathForDetails;
          path = path.replace(tenantMarker, blog.tenant);
          path = path.replace(blogIdMarker, blog.id); // Jump to the blog details page
          // See http://router.vuejs.org/en/essentials/navigation.html
          // this.$router.push({ path: `/blog-details/${blog.tenant}/${blog.id}` })

          this.$router.push({
            path: path
          });
        } else {
          console.error("path-for-details must include ".concat(tenantMarker, " and ").concat(blogIdMarker, ". e.g. /blog-details/{TENANT}/{BLOGID}"));
        }
      }
    }
  },
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }
  }
});
// CONCATENATED MODULE: ./src/components/ContentAdminBlogListElement.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentAdminBlogListElementvue_type_script_lang_js_ = (ContentAdminBlogListElementvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentAdminBlogListElement.vue?vue&type=style&index=0&id=d3c49d02&scoped=true&lang=scss&
var ContentAdminBlogListElementvue_type_style_index_0_id_d3c49d02_scoped_true_lang_scss_ = __webpack_require__("47c4");

// CONCATENATED MODULE: ./src/components/ContentAdminBlogListElement.vue






/* normalize component */

var ContentAdminBlogListElement_component = normalizeComponent(
  components_ContentAdminBlogListElementvue_type_script_lang_js_,
  ContentAdminBlogListElementvue_type_template_id_d3c49d02_scoped_true_lang_pug_render,
  ContentAdminBlogListElementvue_type_template_id_d3c49d02_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "d3c49d02",
  null
  
)

ContentAdminBlogListElement_component.options.__file = "ContentAdminBlogListElement.vue"
/* harmony default export */ var ContentAdminBlogListElement = (ContentAdminBlogListElement_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentAdminBlogList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ContentAdminBlogListvue_type_script_lang_js_ = ({
  name: 'content-admin-blog-list',
  components: {
    ContentAdminBlogListElement: ContentAdminBlogListElement
  },
  props: {
    anchor: String,
    // Deprecated
    contentId: String,
    tenant: String
  },
  data: function data() {
    return {
      element: null,
      selectError: false,
      // Did we pass sanity checks?
      sane: true
    };
  },
  watch: {
    anchor: function anchor(newAnchor, oldAnchor) {
      // Deprecated
      this.load();
    },
    contentId: function contentId(newAnchor, oldAnchor) {
      this.load();
    }
  },
  methods: {
    // Select the elements from the server
    load: function load() {
      var _this = this;

      if (this.$content.disabled) {
        console.error('Contentservice disabled');
        return;
      } // Select the elements


      var params = {
        elementId: 1000,
        withChildren: true
      };
      this.$content.select(this, '$example-thread').then(function (result) {
        // Use the elements
        if (result.elements.length > 0) {
          _this.element = result.elements[0];
        } else {
          _this.element = null;
        }
      }).catch(function (e) {
        var desc = "Error loading comments";
        handleError(_this, desc, params, e);
        _this.selectError = true;
      });
    }
  },
  created: function created() {
    // Sanity check
    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    }

    this.load();
    console.log(this);
  }
});
// CONCATENATED MODULE: ./src/components/ContentAdminBlogList.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentAdminBlogListvue_type_script_lang_js_ = (ContentAdminBlogListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentAdminBlogList.vue?vue&type=style&index=0&id=5b5f31ee&scoped=true&lang=scss&
var ContentAdminBlogListvue_type_style_index_0_id_5b5f31ee_scoped_true_lang_scss_ = __webpack_require__("a79b");

// CONCATENATED MODULE: ./src/components/ContentAdminBlogList.vue






/* normalize component */

var ContentAdminBlogList_component = normalizeComponent(
  components_ContentAdminBlogListvue_type_script_lang_js_,
  ContentAdminBlogListvue_type_template_id_5b5f31ee_scoped_true_lang_pug_render,
  ContentAdminBlogListvue_type_template_id_5b5f31ee_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "5b5f31ee",
  null
  
)

ContentAdminBlogList_component.options.__file = "ContentAdminBlogList.vue"
/* harmony default export */ var ContentAdminBlogList = (ContentAdminBlogList_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7bd9d2bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentAdminBlogDetails.vue?vue&type=template&id=2687d314&scoped=true&lang=pug&
var ContentAdminBlogDetailsvue_type_template_id_2687d314_scoped_true_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.sane)?_c('div',[(_vm.selectError)?_c('div',[_vm._m(0)]):(_vm.crowdhoundElement)?_c('div',[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-1"}),_c('div',{staticClass:"column is-3 has-text-centered"},[_c('div',{staticClass:"a3-logo",class:{ 'a3-faded': _vm.crowdhoundElement.deleted }},[_c('i',{staticClass:"fas fa-edit"})]),_c('div',{staticClass:"a3-switch"},[_c('div',{staticClass:"level"},[_c('b-switch',{attrs:{"type":"is-success","true-value":"0","false-value":"1"},model:{value:(_vm.crowdhoundElement.deleted),callback:function ($$v) {_vm.$set(_vm.crowdhoundElement, "deleted", $$v)},expression:"crowdhoundElement.deleted"}}),_c('span',[_vm._v(_vm._s(_vm.crowdhoundElement.deleted ? 'Inactive' : 'Active'))])],1)]),_c('br'),_c('br'),_c('button',{staticClass:"button is-info",on:{"click":_vm.rememberToSave}},[_vm._v("Save")])]),_c('div',{staticClass:"column is-6"},[_c('form',[_c('div',{staticClass:"field"},[_c('div',{staticClass:"label"},[_vm._v("Title")]),_c('div',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.crowdhoundElement.summary),expression:"crowdhoundElement.summary"}],staticClass:"input",attrs:{"type":"text","placeholder":"Title","autocomplete":"off"},domProps:{"value":(_vm.crowdhoundElement.summary)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.crowdhoundElement, "summary", $event.target.value)}}})])]),_c('div',{staticClass:"field"},[_c('div',{staticClass:"label"},[_vm._v("Description")]),_c('div',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.crowdhoundElement.description),expression:"crowdhoundElement.description"}],staticClass:"input",attrs:{"type":"text","placeholder":"Description","autocomplete":"off"},domProps:{"value":(_vm.crowdhoundElement.description)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.crowdhoundElement, "description", $event.target.value)}}})])])])])])]):_vm._e()]):_vm._e()}
var ContentAdminBlogDetailsvue_type_template_id_2687d314_scoped_true_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"notification is-danger"},[_c('p',[_vm._v("Error: We were unable to select the user details.")]),_c('p',[_vm._v("This may mean that you do not have permission, or it could be a network or server error.")])])}]


// CONCATENATED MODULE: ./src/components/ContentAdminBlogDetails.vue?vue&type=template&id=2687d314&scoped=true&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentAdminBlogDetails.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var ContentAdminBlogDetailsvue_type_script_lang_js_CLEAN = '';
var ContentAdminBlogDetailsvue_type_script_lang_js_DIRTY = 'waiting to save';
var ContentAdminBlogDetailsvue_type_script_lang_js_SAVING = 'saving';
var ContentAdminBlogDetailsvue_type_script_lang_js_SAVED = 'your changes have been saved';
var ContentAdminBlogDetailsvue_type_script_lang_js_ERROR = 'warning: your changes have not been saved';
var ContentAdminBlogDetailsvue_type_script_lang_js_SAVE_INTERVAL = 2000;
/* harmony default export */ var ContentAdminBlogDetailsvue_type_script_lang_js_ = ({
  name: 'content-admin-blog-details',
  components: {},
  props: {
    /*
     *  Must provide either contentId or an element.
     *  If contentId is provided, we'll select the content from Crowdhound.
     *  If an element is provided, we'll update it via $content.store.
     */
    contentId: String,
    element: Object
  },
  data: function data() {
    return {
      // Element from server
      crowdhoundElement: null,
      // Saving to server
      saveMsg: '',
      saveTimeout: null,
      selectError: false,
      // Did we pass sanity checks?
      sane: true
    };
  },
  mixins: [ContentMixins["a" /* default */]],
  computed: {
    extraDebug: function extraDebug() {
      return true; //return this.$content.store.state.extraDebug
    },
    useCrowdhound: function useCrowdhound() {
      return true; // return typeof(this.contentId) != 'undefined'
    }
  },
  methods: {
    rememberToSave: function rememberToSave() {
      var _this = this;

      // We need to save changes to Crowdhound
      // Don't save every change, but rather wait five seconds to
      // batch up the changes.
      console.log("save to Crowdhound (not yet)"); //this.crowdhoundElement.description = value

      if (this.saveTimeout) {// Already set the timeout to save
      } else {
        // Save after five seconds
        this.saveMsg = ContentAdminBlogDetailsvue_type_script_lang_js_DIRTY;
        this.saveTimeout = setTimeout(function () {
          // Save the changes
          _this.saveTimeout = null;
          _this.saveMsg = ContentAdminBlogDetailsvue_type_script_lang_js_SAVING;

          _this.saveToCrowdhound();
        }, ContentAdminBlogDetailsvue_type_script_lang_js_SAVE_INTERVAL);
      }
    },
    saveToCrowdhound: function saveToCrowdhound() {
      var _this2 = this;

      console.error("saveToCrowdhound");
      this.saveMsg = ContentAdminBlogDetailsvue_type_script_lang_js_SAVED;
      this.$content.update(this, this.crowdhoundElement) //- this.$content.select(this, params)
      .then(function (result) {
        setTimeout(function () {
          if (_this2.saveMsg === ContentAdminBlogDetailsvue_type_script_lang_js_DIRTY) {
            _this2.saveMsg = ContentAdminBlogDetailsvue_type_script_lang_js_CLEAN;
          }
        }, 1700);
        console.log("result of save:", result);
        console.log("result of save:", result.data);
      }).catch(function (e) {
        var desc = "Error loading comments";
        console.log("Dirty rotten error: ", e);
        _this2.saveMsg = ContentAdminBlogDetailsvue_type_script_lang_js_ERROR;
        /* handleError(this, desc, params, e) */

        _this2.selectError = true;
      }); //- axios
    }
  },
  created: function created() {
    var _this3 = this;

    // Sanity check
    if (!this.$content) {
      console.error("ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?");
      this.sane = false;
      return;
    } // We select the content from crowdhound


    if (this.useCrowdhound) {
      console.log("Selecting text from Crowdhound");

      if (typeof this.$content === 'undefined') {
        console.error('this.$content not defined. Remember to us Contentservice.use(Vue).');
        return;
      }

      if (this.$content.disabled) {
        console.error('Contentservice disabled');
        return;
      } // Select the elements


      console.log('Here we are before select...');
      this.$content.select(this, this.$route.params.blogId).then(function (result) {
        // Use the elements
        if (result.elements.length > 0) {
          console.log("result=", result);
          _this3.crowdhoundElement = result.elements[0];
        } else {
          // Should not get here
          _this3.crowdhoundElement = {};
        }
      }).catch(function (e) {
        var desc = "Error loading content";
        console.log("Dirty rotten error: ", e); //handleError(this, desc, params, e)

        _this3.selectError = true;
      }); //- axios
    } else {
      //- !useCrowdhound
      // Edit the text in the provided element
      console.log('Using description from element in layout');
    }
  }
});
// CONCATENATED MODULE: ./src/components/ContentAdminBlogDetails.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ContentAdminBlogDetailsvue_type_script_lang_js_ = (ContentAdminBlogDetailsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentAdminBlogDetails.vue?vue&type=style&index=0&id=2687d314&scoped=true&lang=scss&
var ContentAdminBlogDetailsvue_type_style_index_0_id_2687d314_scoped_true_lang_scss_ = __webpack_require__("2442");

// CONCATENATED MODULE: ./src/components/ContentAdminBlogDetails.vue






/* normalize component */

var ContentAdminBlogDetails_component = normalizeComponent(
  components_ContentAdminBlogDetailsvue_type_script_lang_js_,
  ContentAdminBlogDetailsvue_type_template_id_2687d314_scoped_true_lang_pug_render,
  ContentAdminBlogDetailsvue_type_template_id_2687d314_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "2687d314",
  null
  
)

ContentAdminBlogDetails_component.options.__file = "ContentAdminBlogDetails.vue"
/* harmony default export */ var ContentAdminBlogDetails = (ContentAdminBlogDetails_component.exports);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/arrayWithoutHoles.js
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/iterableToArray.js
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/toConsumableArray.js



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: external "core-js/modules/es6.string.starts-with"
var es6_string_starts_with_ = __webpack_require__("b0e1");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectDestructuringEmpty.js
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}
// CONCATENATED MODULE: ./src/store/contentLayoutStore.js








/*
 *  Keep details of the Element being displayed
 *  in the properties pane.
 */
//import { sanitizeLayout, safeJson } from '~/lib/Tooltwist.js'
// import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from '../lib/hierarchy'
//export const namespaced = true
var contentLayoutStore_CLEAN = '';
var contentLayoutStore_DIRTY = 'waiting to save';
var contentLayoutStore_SAVING = 'saving';
var contentLayoutStore_SAVED = 'your changes have been saved';
var contentLayoutStore_ERROR = 'warning: your changes have not been saved';
var contentLayoutStore_SAVE_INTERVAL = 2000; // Handle returned by setTimeout.

var saveTimer = null; // initial state
//export const state = () => ({

var contentLayoutStore_state = function state() {
  return {
    // Edit mode
    mode: 'view',
    // { view | edit | layout | debug }}
    previousEditMode: 'edit',
    extraDebug: false,
    dragging: false,
    // We call it 'contentId' here, but this is actually a Crowdhound 'anchor'.
    contentId: null,
    // An element from Crowdhound with the layout as JSON in the description field.
    // This is only set if we were given a contentId.
    // If it is null we don't save here.
    crowdhoundElement: null,
    // Currently loaded layout.
    // = hierarchy of element Objects
    layout: null,
    // Element currently being edited
    // = element Object
    //propertyElement: null,
    pathToSelectedElement: [],
    // elements, from root to currently selected element
    // Element with properties being shown.
    // This will be within 'pathToSelectedElement'
    expandedElement: null,
    // Message shown at top of screen
    selectError: '',
    saveMsg: contentLayoutStore_CLEAN,
    // Triple pane stuff
    showLeftPane: true,
    showRightPane: true,
    // Refresh is activated by incrementing a counter
    refreshCounter: 1
  };
}; //})

/********************************************
 *
 *                 GETTERS
 *
 ********************************************/

var getters = {
  propertyElement: function propertyElement(state) {
    if (state.pathToSelectedElement) {
      var len = state.pathToSelectedElement.length;
      var element = len > 0 ? state.pathToSelectedElement[len - 1] : null;
      console.log("propertyElement=", element);
      return element;
    }

    return null;
  },
  layoutAsJson: function layoutAsJson(state) {
    return safeJson(state.layout, false
    /*not compressed*/
    ); // let json = JSON.stringify(state.layout, jsonReplacerCallback, 4);
    // return json;
  },
  propertyElementAsJson: function propertyElementAsJson(state) {
    if (state.pathToSelectedElement && state.pathToSelectedElement.length > 0) {
      var element = state.pathToSelectedElement[state.pathToSelectedElement - 1];
      return safeJson(element, false
      /*not compressed*/
      );
    }

    return null;
  },
  getPathToElement: function getPathToElement(state) {
    return function (elementId) {
      console.log("contentLayoutStore.getPathToElement(".concat(elementId, ")"));
      var path = trackDownElementInLayout(state, elementId);
      return path;
    };
  }
  /********************************************
   *
   *                 ACTIONS
   *
   ********************************************/
  // see https://vuex.vuejs.org/guide/actions.html

};
var actions = {
  setContentAction: function setContentAction(_ref, _ref2) {
    var commit = _ref.commit,
        state = _ref.state;
    var vm = _ref2.vm,
        type = _ref2.type,
        layout = _ref2.layout,
        contentId = _ref2.contentId;
    console.log("In Action contentLayout/setContentAction(type=".concat(type, ", layout=").concat(layout ? 'yes' : 'no', ", contentId=").concat(contentId, ")"));

    if (layout) {
      commit('setLayout', {
        vm: vm,
        layout: layout,
        crowdhoundElement: null,
        editable: false
      });
    } else if (contentId) {
      loadLayoutFromAnchor(commit, vm, contentId);
    } else {
      console.error("setContent should be passed either contentId or layout");
    }
  },
  // Delete an element from the current layout.
  deleteElementAction: function deleteElementAction(_ref3, _ref4) {
    var commit = _ref3.commit,
        state = _ref3.state;
    var vm = _ref4.vm,
        element = _ref4.element;
    console.log('Action contentLayout/deleteElementAction()', element); // Ok, let's do it

    commit('deleteElementMutation', {
      vm: vm,
      element: element
    }); // Start the timer, to save after a short delay

    rememberToSave(commit, state, vm);
  },
  // insertChildAction', { vm: this, element, child: newchild, position: -1 })
  insertLayoutAction: function insertLayoutAction(_ref5, _ref6) {
    var commit = _ref5.commit,
        state = _ref5.state;
    var vm = _ref6.vm,
        parent = _ref6.parent,
        position = _ref6.position,
        layout = _ref6.layout;
    console.log('Action contentLayout/insertLayoutAction() parent=', parent);
    console.log('Action contentLayout/insertLayoutAction() position=', position);
    console.log('Action contentLayout/insertLayoutAction() layout=', layout);
    console.log("state=", state);
    console.log("ok 1");
    var data;

    switch (_typeof(layout)) {
      case 'string':
        // Parse the layout
        console.log("ok 1a");

        try {
          data = JSON.parse(layout);
          console.log("ok 1b");
        } catch (e) {
          console.log("ok 1c");
          console.error('Error while pasting:', e);
          console.log("ok 1d");
          return contentLayoutStore_handleError(vm, "Invalid paste object (not JSON).");
        }

        break;

      case 'object':
        console.log("ok 1e");
        data = layout;
        break;

      default:
        console.log("ok 1f", _typeof(layout));
        return contentLayoutStore_handleError(vm, "Invalid paste object");
    }

    console.log("ok 2");
    console.log("data=", data); // Do basic checks, to ensure something unrelated isn't being pasted

    if (data.type !== 'contentservice.io') {
      return contentLayoutStore_handleError("Invalid paste object (not from contentservice.io).");
    }

    console.log("ok 3"); // Check the data, according to the version

    var toInsert;

    if (data.version === '1.0') {
      // Check it complies to version 1.0
      if (typeof data.layout === 'undefined') {
        return contentLayoutStore_handleError("Invalid paste object (missing layout).");
      }

      toInsert = data.layout;
    } else {
      return contentLayoutStore_handleError("Invalid paste object (unknown version ".concat(data.version, ")."));
    }

    console.log("ok 4"); // Check we have all the required dependencies
    //ZZZZ

    console.log("Will insert ", toInsert);
    console.log("Position is", position); // Ok, let's do it

    commit('insertLayoutMutation', {
      vm: vm,
      parent: parent,
      position: position,
      layout: toInsert
    }); // Start the timer, to save after a short delay

    rememberToSave(commit, state, vm);
  },
  // Reposition a child within an element.
  moveChildAction: function moveChildAction(_ref7, _ref8) {
    var commit = _ref7.commit,
        state = _ref7.state;
    var vm = _ref8.vm,
        parent = _ref8.parent,
        from = _ref8.from,
        to = _ref8.to;
    console.log("Action contentLayout/moveChildAction(".concat(from, ", ").concat(to, ")"), parent); // Ok, let's do it

    commit('moveChildMutation', {
      vm: vm,
      parent: parent,
      from: from,
      to: to
    }); // Start the timer, to save after a short delay

    rememberToSave(commit, state, vm);
  },
  setPropertyAction: function setPropertyAction(_ref9, _ref10) {
    var commit = _ref9.commit,
        state = _ref9.state;
    var vm = _ref10.vm,
        element = _ref10.element,
        name = _ref10.name,
        value = _ref10.value,
        save = _ref10.save;
    console.log("action setPropertyAction(".concat(element, ", ").concat(name, ", ").concat(value, ", save=").concat(save, ")"));
    /*
     *  Two possibilities here:
     *    1. We are trying to update a fixed layout - error.
     *    2. We are updating an element within a layout - save the layout.
     */
    // Check that we are updating an element in a layout that is being edited.

    if (state.crowdhoundElement === null) {// Should not be trying to update this.
    }

    commit('updateElementPropertyMutation', {
      vm: vm,
      element: element,
      name: name,
      value: value
    }); //ZZZZ Timer should probably be set in the mutation?
    // There is a potential timing problem.
    // - the commit might not be instantaneous (is that correct), so
    // a timeout created here might run before the commit occurs.

    commit('setSaveMsg', {
      msg: contentLayoutStore_DIRTY
    }); // Start the timer, to save after a short delay

    if (typeof save === 'Boolean' && !save) {
      // Skip saving. This can be used when a value in the element is being
      // set just to pass information to the properties component. For example,
      // if there is a current 'tab' for which properties are to be displayed.
      console.error("NOT SAVING THIS TRANSITORY VALUE. WARP YIP WANZACKO!");
    } else {
      rememberToSave(commit, state, vm);
    }
  }
};
/********************************************
 *
 *                 MUTATIONS
 *
 ********************************************/

var mutations = {
  // Set the current layout, displayed in the middle panel.
  setLayout: function setLayout(state, _ref11) {
    var vm = _ref11.vm,
        layout = _ref11.layout,
        contentId = _ref11.contentId,
        crowdhoundElement = _ref11.crowdhoundElement,
        editable = _ref11.editable;
    //console.log('In Mutation contentLayout/setLayout()', state)
    console.log('In Mutation contentLayout/setLayout()', layout);

    if (layout) {
      state.layout = addAnyMissingValues(vm, layout); // console.log(`sanitized layout:`, state.layout)

      state.crowdhoundElement = crowdhoundElement;
    } else {
      console.error("Mutation contentLayout/setLayout requires 'layout' parameter");
      state.layout = null;
      state.contentId = null;
      state.crowdhoundElement = null;
      state.editable = false; // Hack
      // if (element) {
      //   console.error(`We do have 'element'`)
      // }

      return;
    }

    if (crowdhoundElement) {
      state.crowdhoundElement = crowdhoundElement;
      state.contentId = contentId;
    } else {
      state.crowdhoundElement = null;
      state.contentId = null;
    }

    if (editable) {
      state.editable = editable;
    } else {
      state.editable = false;
    }
  },
  // Set property values in a specific element
  // This *should* be an element in the current layout
  setPropertyInElementMutation: function setPropertyInElementMutation(state, _ref12) {
    var vm = _ref12.vm,
        element = _ref12.element,
        name = _ref12.name,
        value = _ref12.value;
    // console.log('In Mutation contentLayout/setPropertyInElementMutation()', element)
    // console.log(`LOOKING FOR ${element.id}`)
    var path = trackDownElementInLayout(state, element.id);

    if (path) {
      var specifiedElement = path[path.length - 1]; // Do this such that a new reactive property is created.
      // https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
      // NOT: specifiedElement[name] = value

      vm.$set(specifiedElement, name, value);
    } else {
      console.error("setPropertyInElementMutation: element not found in current layout");
    }
  },
  // Set the element shown in the properties panel.
  // This *should* be an element in the current layout
  setPropertyElementMutation: function setPropertyElementMutation(state, _ref13) {
    var element = _ref13.element;
    // console.log('In Mutation contentLayout/setPropertyElementMutation()', element)
    var path = trackDownElementInLayout(state, element.id); //console.log(`path to selected element=`, path)

    state.pathToSelectedElement = path ? path : [];
    state.expandedElement = path ? path[path.length - 1] : null; // console.log(`Path to selected element=`, path)

    path.forEach(function (element) {
      console.log("  ".concat(element.type, ": ").concat(element.id));
    });
  },
  // Set the element currently expanded in the properties panel.
  // This *must* be an element in pathToSelectedElement.
  setExpandedElementMutation: function setExpandedElementMutation(state, _ref14) {
    var element = _ref14.element;
    console.log('In Mutation contentLayout/setExpandedElementMutation()', element); //return
    // console.log('State is ', state)
    // Clone the element
    //let duplicate = JSON.parse(JSON.stringify(data.element));
    // console.log(`Before`)
    // Check this element is in the path to the current property element.

    for (var i = 0; i < state.pathToSelectedElement.length; i++) {
      if (state.pathToSelectedElement[i].id === element.id) {
        // Found it
        state.expandedElement = element;
        return;
      }
    }

    console.error("setExpandedElementMutation: element not in pathToSelectedElement");
  },
  // Set the screen mode [view | edit | layout | debug]
  setEditMode: function setEditMode(state, _ref15) {
    var mode = _ref15.mode,
        previousEditMode = _ref15.previousEditMode;
    //ZZZZ Check the parameters
    // console.log(`mutation contentLayout/setEditMode(${mode}, ${previousEditMode})`)
    state.mode = mode;

    if (previousEditMode) {
      state.previousEditMode = previousEditMode;
    }
  },
  // Start dragging. This should temporarily switch to layout mode.
  dragStart: function dragStart(state, _ref16) {
    _objectDestructuringEmpty(_ref16);

    // console.log(`mutation contentLayout/dragStart()`)
    state.dragging = true;
  },
  dragStop: function dragStop(state, _ref17) {
    _objectDestructuringEmpty(_ref17);

    // console.log(`mutation contentLayout/dragStop()`)
    state.dragging = false;
  },
  // Set the message shown above the page (CLEAN | DIRTY | SAVING, etc).
  setSaveMsg: function setSaveMsg(state, _ref18) {
    var msg = _ref18.msg;
    //ZZZZ Check the parameters
    // console.log(`mutation contentLayout/setSaveMsg(${msg})`)
    state.saveMsg = msg;
  },
  // Set the value of a property in an element.
  // The element is not necessarily the 'propertyElement',
  // it *should* be an element in the current layout.
  updateElementPropertyMutation: function updateElementPropertyMutation(state, _ref19) {
    var vm = _ref19.vm,
        element = _ref19.element,
        name = _ref19.name,
        value = _ref19.value;

    //ZZZZ Check the parameters
    if (!element) {
      console.log("Update property in currently selected property element");
      element = state.expandedElement;
    } // console.log(`mutation contentLayout/updateElementPropertyMutation(${element.id}, ${name}, ${value})`, element)
    // Do this such that a new reactive property is created.
    // https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
    // NOT: element[name] = value


    vm.$set(element, name, value);
  },
  insertLayoutMutation: function insertLayoutMutation(state, _ref20) {
    var vm = _ref20.vm,
        parent = _ref20.parent,
        position = _ref20.position,
        layout = _ref20.layout;
    console.log('In Mutation contentLayout/insertLayoutMutation()', parent, position, layout); //let toInsert = layout
    // if (position === 'last' || position < 0) {
    //   position = parent.children.length
    // }
    // Clone the hierarchy (this is the cheat's way)
    //let newchild = JSON.parse(JSON.stringify(child));

    var toInsert = JSON.parse(safeJson(layout)); // Before inserting, check we have unique IDs for all elements in the
    // layout. By preference we will retain the IDs, so when a user cuts and
    // pastes any existing references will be retained. However if they copy
    // and paste, we don't want duplicate IDs already in our parent's layout.

    replaceIdsAlreadyInLayout(state, toInsert);
    console.log("ok 5", toInsert); // Check it is sane

    addAnyMissingValues(vm, toInsert); // For other element types, we insert the actual element.

    if (toInsert.type === 'layout') {
      // If an entire 'layout' is being inserted, we insert the children one by one.
      console.log("Inserting layout element. ".concat(toInsert.children.length, " items."));
    } else {
      // For non-layout elements, we insert the actual element
      console.log("Inserting non-layout element: ".concat(toInsert.type, " at position ").concat(position));

      if (position === 'last' || position < 0) {
        // Add to the end
        parent.children.push(toInsert);
        console.log("ok 6a");
      } else if (position <= parent.children.length) {
        // Insert at a specific position
        parent.children.splice(position, 0, toInsert);
        console.log("ok 6b");
      } else {
        // Invalid position
        alert('insertLayoutMutation: Internal error #2963 (invalid position)');
        return;
      }
    } // Show the properties for the new element


    var path = trackDownElementInLayout(state, toInsert.id); //console.log(`path to selected element=`, path)

    state.pathToSelectedElement = path ? path : [];
    state.expandedElement = path ? path[path.length - 1] : null; //console.log(`Path to new element=`, path)
    //(path ? path : [ ]).forEach(function (element) {
    //  console.log(`  ${element.type}: ${element.id}`, element)
    //})
  },
  moveChildMutation: function moveChildMutation(state, _ref21) {
    var vm = _ref21.vm,
        parent = _ref21.parent,
        from = _ref21.from,
        to = _ref21.to;
    console.log("In Mutation contentLayout/moveChildMutation(".concat(from, ", ").concat(to, ")"), parent);
    var path = trackDownElementInLayout(state, parent.id);

    if (path && path.length >= 1) {
      parent = path[path.length - 1];
      console.log("Parent is ".concat(parent.id, " (").concat(parent.type, ")"));

      if (from < parent.children.length) {
        // Remove the child from the array
        var removedChildren = parent.children.splice(from, 1); // Add it back to the array

        parent.children.splice(to, 0, removedChildren[0]);
      }
    }

    state.pathToSelectedElement = path ? path : [];
    state.expandedElement = path ? path[path.length - 1] : null;
  },
  // Delete an element from the current layout.
  deleteElementMutation: function deleteElementMutation(state, _ref22) {
    var vm = _ref22.vm,
        element = _ref22.element;
    console.log("In Mutation contentLayout/deleteElementMutation(".concat(element.id, " (").concat(element.type, "))")); // Find the path down to this element, so we know the parent.

    var path = trackDownElementInLayout(state, element.id);

    if (path && path.length >= 2) {
      var parent = path[path.length - 2];
      console.log("Parent is ".concat(parent.id, " (").concat(parent.type, ")"));

      for (var index = 0; index < parent.children.length; index++) {
        if (parent.children[index].id == element.id) {
          // We've found it, so remove it
          console.log("Found item to delete in position ".concat(index));
          parent.children.splice(index, 1);
          return;
        }
      }
    }
  },
  // // Set the element shown in the properties panel.
  // // This *should* be an element in the current layout
  // setMode (state, { mode } ) {
  //   console.log(`In Mutation setMode(${mode})`)
  //   console.log('State is ', state)
  //
  //   state.mode = mode
  // },
  // Call this method to trigger redrawing of components that monitor
  // the value of 'refreshCounter'.
  refreshMutation: function refreshMutation(state, _ref23) {
    _objectDestructuringEmpty(_ref23);

    console.log('In Mutation refreshMutation()', state.refreshCounter);
    state.refreshCounter++;
  }
}; //- mutations
// function overwriteElementIDs(element) {
//   element.id = Math.floor(Math.random() * 10000000000)
//   console.log('New Id is ', element.id)
//
//   if (element.children) {
//     element.children.forEach((child) => overwriteElementIDs(child))
//   }
// }
// Prepare a hierarchy of elements that will be used to lay out a page.

function addAnyMissingValues(vm, element) {
  // Create a new element ID, but do not modify an existing ID.
  if (!element.id) {
    vm.$set(element, 'id', Math.floor(Math.random() * 10000000000)); // console.log('New Id is ', element.id)
  } // Make sure we have a 'children' element


  if (!element.children) {
    vm.$set(element, 'children', []);
  } // Now sanitize any children


  for (var i = 0; i < element.children.length;) {
    var child = element.children[i];

    if (child) {
      addAnyMissingValues(vm, child);
      i++;
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
      element.children.splice(i, 1); // let b1 = element.children[i-1]
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

  return element;
}

function safeJson(element, compressed
/*boolean,optional*/
) {
  var spaces = compressed ? 0 : 4; // Custom replacer function - gets around "TypeError: Converting circular structure to JSON"
  // Modified from http://www.johnantony.com/pretty-printing-javascript-objects-as-json/

  var replacer = function replacer(key, value) {
    // ignore any circular links (they are circular)
    // if (key === '_parent') {
    //   return
    // }
    return value;
  }; // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify


  var json = JSON.stringify(element, jsonReplacerCallback, spaces);
  return json;
} //ZZKOP
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


function loadLayoutFromAnchor(commit, vm, contentId, editable) {
  console.log("store.loadlayout(".concat(contentId, ")")); // We select the content from crowdhound
  //console.log(`ContentTriplePane.loadLayout`)

  if (typeof vm.$content === 'undefined') {
    console.error('this.$content not defined. Remember to us Contentservice.use(Vue).');
    return;
  }

  if (vm.$content.disabled) {
    console.error('Contentservice disabled');
    return;
  }

  var canEdit = false;

  if (typeof editable === 'undefined') {
    canEdit = true; // Default to editable ZZZ
  } else if (editable) {
    canEdit = true;
  } //- let contentId = '$testpage.text1'
  //let shortAnchor = `$testpage.${this.anchorPrefix}.${this.anchorSuffix}`


  var shortAnchor = contentId.startsWith('$') ? contentId.substring(1) : contentId;
  var fullAnchor = "$" + shortAnchor;
  var elementType = 'layout';
  console.error(">>> contentId is ".concat(contentId, "."));
  vm.$content.select(this, fullAnchor, elementType) //- this.$content.select(this, params)
  .then(function (result) {
    // Use the elements
    // console.log(`>>> result=`, result)
    if (result.elements.length < 1) {
      // Should not be possible
      console.error("Selecting layout returned no element. How is this possible?");
      return;
    } // See if the description contains a valid layout
    // console.log(`result=`, result)


    var elementContainingLayout = result.elements[0];
    var json = elementContainingLayout.description; // console.log('json=', json)

    var layout = null;

    if (json === shortAnchor) {// console.error(`>>> NOT parsing json (it's the anchor)`)
      // New element/layout
    } else {
      // console.error(`>>> parsing JSON`)
      try {
        layout = JSON.parse(json);
      } catch (e) {
        console.error("Broken JSON: ", e);
        console.log("json=".concat(json));
      } // console.log('parsed JSON layout=', layout)
      // Check for errors

    }

    console.log(">>> layout=", layout); // If we don't already have a layout, create an initial layout now.

    if (layout === null) {
      console.error(">>> Creating default layout"); // Word out a heading, based on the contentId

      var heading = contentId;

      if (heading.startsWith('$')) {
        heading = heading.substring(1);
      }

      if (heading.startsWith('page-')) {
        heading = heading.substring(5);
      }

      var arr = heading.split('-');
      heading = '';
      arr.forEach(function (word, index) {
        if (index > 0) {
          heading += ' ';
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
            heading += word;
            break;

          default:
            // Capitalise the word
            heading += word.substring(0, 1).toUpperCase() + word.substring(1);
        }
      }); // Create an initial layout

      layout = {
        type: 'layout',
        children: [{
          type: 'section',
          children: [{
            type: 'container',
            children: [{
              "type": "froala",
              "text": "<h1 style=\"text-align: center;\"><span style=\"font-size: 48px;\">".concat(heading, "</span></h1>"),
              "id": 2,
              "children": []
            }]
          }]
        }]
      };
    } // Save the layout in our state store.


    var sanitized = addAnyMissingValues(vm, layout);
    commit('setLayout', {
      vm: vm,
      contentId: fullAnchor,
      layout: layout,
      crowdhoundElement: elementContainingLayout,
      // NOT an element in the layout
      // tenant: elementContainingLayout.tenant,
      // elementId: elementContainingLayout.id,
      editable: canEdit
    });
  }).catch(function (e) {
    var desc = "Error loading comments";
    console.log("Dirty rotten error: ", e);
    /* handleError(this, desc, params, e) */

    contentLayoutStore_state.selectError = true;
  }); //- select
} // If any of the IDs in the specified element or it's descendants exist
// in our currently-being-edited layout, replace them. This is
// typically used before pasting stuff into the current layout.


function replaceIdsAlreadyInLayout(state, layoutToInsert) {
  console.log("replaceIdsAlreadyInLayout(element: ".concat(layoutToInsert.id, ", elementType: ").concat(layoutToInsert.type, ")")); // Create a hash of all the element IDs already in use

  var ids = getCurrentlyUsedIds(state); // console.log(`ids=`, ids)
  // Recursively look at every element and it's children,
  // replacing element Ids that are already used.

  var recurse = function recurse(element) {
    // console.log(`  - check element ${element.id}`)
    var initialId = element.id;

    while (ids[element.id]) {
      element.id = Math.floor(Math.random() * 10000000000);
      console.log("  replacing id of element ".concat(initialId, " (").concat(element.type, ") -> ").concat(element.id));
    }

    if (element.children) {
      element.children.forEach(function (child) {
        return recurse(child);
      });
    }
  }; // Check, from the top down.


  recurse(layoutToInsert);
}
/*
 *  Create a has of all the element IDs in the current layout.
 *  returns [] of Id -> true
 */


function getCurrentlyUsedIds(state) {
  // console.log(`getCurrentlyUsedIds()`)
  // Recursive through the layout hierarchy, remembering the ids
  var hash = []; // id -> true

  var recurse = function recurse(element) {
    // console.log(` - ${element.id}`)
    hash[element.id] = true;

    if (element.children) {
      element.children.forEach(function (child) {
        return recurse(child);
      });
    }
  };

  recurse(state.layout);
  return hash;
}
/*
 *  We have changes, but we don't want to save every little keystroke.
 *  Delay a few seconds and then save.
 */


function rememberToSave(commit, state, vm) {
  // We'll need to save changes to Crowdhound. Don't save every
  // change, but rather wait a few seconds to batch up changes.
  console.log("save to Crowdhound (not yet)"); //this.crowdhoundElement.description = value

  if (saveTimer) {// Already set the timeout to save
  } else {
    // Save after five seconds
    commit('setSaveMsg', {
      msg: contentLayoutStore_DIRTY
    }); //state.saveMsg = DIRTY

    saveTimer = setTimeout(function () {
      // Save the changes
      saveTimer = null; //state.saveMsg = SAVING

      commit('setSaveMsg', {
        msg: contentLayoutStore_SAVING
      }); //saveToCrowdhound(vm)
      // Squeeze the layout into a single Crowdhound element

      var crowdhoundElement = {
        tenant: state.crowdhoundElement.tenant,
        rootId: state.crowdhoundElement.rootId,
        parentId: state.crowdhoundElement.parentId,
        id: state.crowdhoundElement.id,
        type: 'layout',
        description: safeJson(state.layout, true
        /*compressed*/
        )
      };
      console.log("saveToCrowdhound() in Store", crowdhoundElement);
      console.log("safeJson length is ".concat(safeJson(state.layout, true
      /*compressed*/
      ).length)); // Update the element (should already exist)

      commit('setSaveMsg', {
        msg: contentLayoutStore_SAVED
      });
      vm.$content.update(vm, crowdhoundElement).then(function (result) {
        setTimeout(function () {
          if (state.saveMsg === contentLayoutStore_DIRTY) {
            commit('setSaveMsg', {
              msg: contentLayoutStore_CLEAN
            });
          }
        }, 1700);
        console.log("result of save:", result);
        console.log("result of save:", result.data);
      }).catch(function (e) {
        var desc = "Error saving html content";
        console.log(desc, e); //state.saveMsg = ERROR

        commit('setSaveMsg', {
          msg: contentLayoutStore_ERROR
        });
        /* handleError(this, desc, params, e) */
        //this.selectError = true
      }); //- axios
    }, contentLayoutStore_SAVE_INTERVAL);
  }
}
/*
 *  Display an error message, by whatever means is possible.
 */


function contentLayoutStore_handleError(vm, msg) {
  // alert(msg)
  if (vm && vm.$toast) {
    vm.$toast.open({
      message: "".concat(msg),
      type: 'is-danger'
    });
  } else {
    console.error("Error: ".concat(msg));
    alert("Error ".concat(msg));
  }

  return false;
}
/*
 *  Recursively find this element within the current layout.
 *  (We don't use parent links, because it's simpler
 *  if we avoid cyclic links in the hierarchy)
 */


function trackDownElementInLayout(state, requiredID) {
  // console.log(`trackDownElementInLayout(state, requiredID:${requiredID})`)
  // console.log(`state=`, state)
  // console.log(`state.layout=`, state.layout)
  var recurse = function recurse(elementInLayout) {
    // console.log(`  - ${elementInLayout.id} (${elementInLayout.type})`)
    if (elementInLayout.id === requiredID) {
      return [elementInLayout];
    }

    if (elementInLayout.children) {
      for (var i = 0; i < elementInLayout.children.length; i++) {
        var child = elementInLayout.children[i];
        var path = recurse(child);

        if (path) {
          return [elementInLayout].concat(_toConsumableArray(path));
        }
      }
    }

    return null;
  };

  return recurse(state.layout);
} // function trackDownElement_recursive(elementInLayout, requiredID) {
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


function jsonReplacerCallback(key, value) {
  // ignore any circular links
  // if (key === '_parent') {
  //   return
  // }
  return value;
}

var namespaced = true;
/* harmony default export */ var contentLayoutStore = ({
  "namespaced": true,
  state: contentLayoutStore_state,
  mutations: mutations,
  getters: getters,
  actions: actions
});
// EXTERNAL MODULE: external "@fortawesome/fontawesome-svg-core"
var fontawesome_svg_core_ = __webpack_require__("b0b2");

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__("368f");

// EXTERNAL MODULE: external "@fortawesome/vue-fontawesome"
var vue_fontawesome_ = __webpack_require__("07a2");

// EXTERNAL MODULE: ./src/assets/css/content-editor.scss
var content_editor = __webpack_require__("9035");

// EXTERNAL MODULE: ./src/assets/css/editor-icons.scss
var editor_icons = __webpack_require__("9c74");

// CONCATENATED MODULE: ./src/components/index.js
// External libraries





 // Our main class
//import { ContentService }  from '../lib/ContentService.js'

 // Editing-related stuff.










 // Widgets






















 // Video widgets







 // Property Types

 // import { sanitizeLayout, safeJson, layoutRoot, layoutChanged } from '../lib/hierarchy'
// Our store

 // Install font-awesome icons


var faLibrary = fontawesome_svg_core_["library"];

 // require('../assets/css/editor-icons.scss')
// require('../assets/css/content-variables.scss')
// require('../assets/css/content-editor.scss')

 // import Bulma from 'bulma'


var _Vue = null;
var _content = null;

function install(Vue, options) {
  console.log('Contentservice.install()', options);

  if (_content) {
    console.error("Vue.use(ContentService) has already been called.");
    return;
  }

  _Vue = Vue; // Create ourselves a ContentService Object

  console.log('Getting our _content');
  _content = new ContentService(options);
  console.log('Have our _content', _content); //_content.checkInitialLoginStatus(false)
  //console.log('Finished checking status')

  var isDef = function isDef(v) {
    return v !== undefined;
  }; // Vue.mixin adds an additional 'beforeCreate' function to it's
  // list of functions to be called when new Vue is created. We'll
  // use it to look for new Vue({ ContentService }). If found, we'll
  // consider this to be the root. If it is not found, then we will
  // assume this is a child of the root, and create pointers back
  // to the root.
  //Vue.mixin({


  Vue.mixin({
    beforeCreate: function beforeCreate() {
      // console.log('vue-contentservice: index.js - beforeCreate()')
      if (!this.$parent) {
        //if (isDef(this.$options.contentservice)) {
        // console.error('Initializing ROOT *********')
        // This must be the root, since we found contentservice in it's options.
        this._contentRoot = this;
        this._content = _content; // this._content.init(this)

        Vue.util.defineReactive(this, '_content', this.$content); // Vue.util.defineReactive(this, '_content', this._content.jwt)
        // Vue.util.defineReactive(this, '_content', this._content.fromCache)
      } else {
        //console.log('Initialise new child')
        this._contentRoot = this.$parent._contentRoot;
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
    destroyed: function destroyed() {// registerInstance(this)
    }
  }); // As described above, the Vue instances form a hierachy. The mixin
  // above ensures that each instance has an '_contentRoot' field
  // that points to the instance where 'contentservice' was passed to new Vue({  }).
  // Note that it's _contentRoot might actually point to itself.

  Object.defineProperty(Vue.prototype, '$content', {
    get: function get() {
      return this._contentRoot._content;
    }
  });
  /*
   *  Define the components
   */

  Vue.component('crowdhound-minimal', CrowdhoundMinimal);
  Vue.component('content-layout-editor', ContentLayoutEditor);
  Vue.component('content-toolbox', ContentToolbox);
  Vue.component('content-pane', ContentPane); //ZZZZZ ???

  Vue.component('content-content', ContentContent);
  Vue.component('content-content-props', ContentContentProps);
  Vue.component('content-children', ContentChildren);
  Vue.component('content-admin-blog-list', ContentAdminBlogList);
  Vue.component('content-admin-blog-details', ContentAdminBlogDetails);
  Vue.component('edit-bar-icons', EditBarIcons); // Register the layout element types
  // _content.registerLayoutType(Vue, 'section', 'content-section', ContentSection, ContentSectionProps)
  // Section Widget

  _content.registerWidget(Vue, {
    name: 'section',
    label: 'Section',
    category: '',
    // iconClass: 'fa fa-arrows-v fas fa-arrows-alt-v contentservice-section-icon',
    // iconClass5: 'fas fa-arrows-alt-v contentservice-section-icon',
    iconClass: 'c-icon-section',
    // iconClass5: 'fas fa-arrows-alt-v contentservice-section-icon',
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
        type: 'section'
      }
    }
  }); // Container Widget


  _content.registerWidget(Vue, {
    name: 'container',
    label: 'Container',
    category: '',
    iconClass: 'c-icon-container',
    iconClass5: 'c-icon-container',
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
        type: 'container'
      }
    }
  }); // Columns Widget


  _content.registerWidget(Vue, {
    name: 'columns',
    label: 'Columns',
    category: '',
    iconClass: 'c-icon-columns',
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
        children: [{
          // Column 1
          type: 'panelWithoutProperties',
          children: []
        }, {
          // Column 2
          type: 'panelWithoutProperties',
          children: []
        }]
      }
    }
  }); // Text Widget


  _content.registerWidget(Vue, {
    name: 'text',
    label: 'Text',
    category: '',
    iconClass: 'c-icon-text',
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
        text: 'Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.'
      }
    }
  }); // Youtube Widget


  _content.registerWidget(Vue, {
    name: 'youtube',
    label: 'Youtube',
    category: '',
    iconClass: 'c-icon-youtube',
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
        type: 'youtube' //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'

      }
    }
  }); // Vimeo Widget


  _content.registerWidget(Vue, {
    name: 'vimeo',
    label: 'Vimeo',
    category: '',
    iconClass: 'c-icon-vimeo',
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
        type: 'vimeo' //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'

      }
    }
  }); // Special widget - an invisible panel under columns, tabs, etc


  _content.registerLayoutType(Vue, 'panelWithoutProperties', 'panel-without-properties', PanelWithoutProperties, PanelWithoutPropertiesProps); // Register components that are toolbox widgets
  // _content.registerLayoutType(Vue, 'container', 'content-container', ContentContainer, ContentContainerProps)


  _content.registerLayoutType(Vue, 'element', 'content-element', ContentElement, ContentElementProps); // _content.registerLayoutType(Vue, 'text', 'content-text', ContentText, ContentTextProps)


  _content.registerLayoutType(Vue, 'froala', 'content-froala', ContentFroala, ContentFroalaProps);

  _content.registerLayoutType(Vue, 'html', 'content-html', ContentFroala, ContentFroalaProps);

  _content.registerLayoutType(Vue, 'field', 'content-field', ContentField, ContentFieldProps);

  _content.registerLayoutType(Vue, 'form', 'content-form', ContentForm, ContentFormProps);

  _content.registerLayoutType(Vue, 'fixed-position-container', 'content-fixed-position-container', ContentFixedPositionContainer, ContentFixedPositionContainerProps); // _content.registerLayoutType(Vue, 'columns', 'content-columns', ContentColumns, ContentColumnsProps)


  _content.registerLayoutType(Vue, 'layout', 'content-layout', ContentLayout, ContentLayoutProps);

  _content.registerLayoutType(Vue, 'card', 'card', ContentCardProps, ContentCardProps); // Components not in the toolbox


  Vue.component('edit-bar-icons', EditBarIcons);
  Vue.component('edit-properties-header', ContentPropertiesHeader); // Set up external libraries
  // hotkey

  Vue.use(external_v_hotkey_default.a); // Vue-split-panel

  Vue.use(external_vue_split_panel_default.a); // Font-awesome

  faLibrary.add(free_solid_svg_icons_["faCut"]);
  faLibrary.add(free_solid_svg_icons_["faCopy"]);
  faLibrary.add(free_solid_svg_icons_["faDownload"]);
  faLibrary.add(free_solid_svg_icons_["faTrash"]);
  Vue.component('font-awesome-icon', vue_fontawesome_["FontAwesomeIcon"]); // Froala. Unfortunately requires jQuery.
  // https://github.com/froala/vue-froala-wysiwyg

  if (typeof window != 'undefined') {
    window.$ = __webpack_require__("c5e1");
    window.jQuery = window.$;
  }

  __webpack_require__("25ac");

  __webpack_require__("b4f3"); // require('font-awesome/css/font-awesome.css')


  __webpack_require__("0ee6");

  Vue.use(external_vue_froala_wysiwyg_default.a); // vue-drag-drop

  Vue.use(external_vue_drag_drop_default.a); // v-clipboard

  Vue.use(external_v_clipboard_default.a); // Initialise the store

  Vue.use(external_vuex_default.a);
  var store = new external_vuex_default.a.Store(contentLayoutStore);
  _content.store = store;
  return _content;
} //- install()


var ContentServiceLib = {
  install: install //ZZZ Is this used?

};
Object.defineProperty(ContentServiceLib, '_content', {
  get: function get() {
    return _content;
  }
}); // Version 1:
// Works for full npm publish and import, but not for npm link because the
// ECM cannot import default exports, so results in errors when including
// this module in a Nuxt project:
//
//    "export 'default' (imported as 'ContentService') was not found in 'vue-contentservice'""

/* harmony default export */ var components = (ContentServiceLib); // Version 2:
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
  window.ContentService = ContentServiceLib;
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (components);



/***/ }),

/***/ "fc74":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2cd6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainerProps_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-contentservice.umd.js.map