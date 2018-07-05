<template lang="pug">
div
  //
  // See https://www.npmjs.com/package/vue-split-panel
  //

  Split.c-triple-pane(:style="splitStyle", :gutterSize="gutterSize", @onDragEnd="onDragEnd", :class="isEditing ? 'c-editing-layout' : 'c-not-editing-layout' ", v-hotkey="keymap")

    // Left pane
    SplitArea.c-left-pane(v-if="hasLeftSlot", :size="leftSize")
      slot(name="left-pane")

    // Middle pane
    SplitArea.c-middle-pane(:size="middleSize")

      // Edit bar
      .c-editbar(v-if="pageEditMode !== 'view'" @click.stop="cycleEditMode")
        .c-editbar-anchor {{anchor}}
        .c-editbar-mode-label {{pageEditMode}} mode
        //| &nbsp;{{ $store.state.contentLayout.saveMsg }}
        .c-editbar-dump-button(zv-if="pageEditMode === 'layout'")
          | &nbsp;&nbsp;
          a(@click.stop="dump") dump

      // Actual content
      .c-middle-pane-content
        div(v-if="haveLayout")
          //- | WE GOT A LAYOUT
          //- br
          //- | {{layoutAsJson}}
          //- br
          content-children(:editcontext="{}", :element="$store.state.contentLayout.layout")

        div(v-else)
          slot(name="middle-pane")
          slot

    // Right pane
    SplitArea.c-right-pane(zv-show="rightSize > 0", :style="rightPaneStyle", :size="rightSize", :minSize="rightSize > 0 ? 200 : 0")

      slot(v-if="hasRightSlot", name="right-pane")
      Split(v-else, :direction="'vertical'", :style="propertiesSplitStyle", :gutterSize="gutterSize")

        // Properties Pane
        SplitArea.c-properties-pane(:size="10", :minSize="300")
          h1.title Properties
          //content-element-props(:element="this.$store.state.contentLayout.propertyElement")
          content-element-props(:element="thePropertyElement")

        // Components pane
        SplitArea.c-components-pane(:size="90", :minSize="150")
          h1.title Toolbox
          content-toolbox


</template>

<script>
import Vue from 'vue'
import ContentMixins from '../mixins/ContentMixins'

let SAVE_MANUAL = 1
let SAVE_LAYOUT = 2
let SAVE_INDIVIDUAL = 3

// Prevent double keypresses
let previousTimeStamp = 0

export default {
  name: 'content-triple-pane',
  props: {

    // Initial pane sizes
    rightPane: {
      required: false,
      type: Number
    },
    leftPane: {
      required: false,
      type: Number
    },

    // Option 1 - Provide an anchor in Crowdhound
    anchor: {
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
  data: function () {
    return {

      // Panel sizes.
      myLeftPaneSize: 20, // percentage
      myRightPaneSize: 20,

      // Constants
      gutterSize: 3,

      // Do we have a layout, or are we using the slot provided by the host?
      haveLayout: false,
    }
  },
  mixins : [
    ContentMixins,
  ],
  computed: {


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

    layoutAsJson: function () {
      if (process.browser) {
        /*
        */
        console.log('^^^ 1', this.$store)
        console.log('^^^ 2', this.$store.state)
        console.log('^^^ 3', this.$store.state.contentLayout)
        console.log('^^^ 4', this.$store.state.contentLayout.layoutAsJson)
        return this.$content.util.safeJson(this.$store.state.contentLayout.layout)
      }
      return '-server side-'
    },

    propertyElementAsJson: function () {
      if (process.browser) {
        return this.$content.util.safeJson(this.$store.state.contentLayout.propertyElement)
      }
      return '-server side-'
    },

    hasLeftSlot () {
      return !!this.$slots['left-pane']
    },


    hasRightSlot () {
      return !!this.$slots['right-pane']
    },

    // Style definitions for the header
    splitStyle: function () {
      if (this.isEditing) {
        return ''
      } else {
        return '100%'
        return `height: ${this.height}`
      }
    },

    rightPaneStyle : function () {
      if (this.isEditing) {
        return ''
      } else {
        return `height: 0px;`
      }
    },

    propertiesSplitStyle : function () {
      if (this.isEditing) {
        return `width: 100%;`
      } else {
        return `width: 100%; height: 0px; position: absolute;`
      }
    },


    leftSize: function () {
      if (!this.hasLeftSlot) {
        return 0
      }
      if (this.myLeftPaneSize < 0) {
        return 5
      } else if (this.myLeftPaneSize > 100) {
        return 100
      }
      return this.myLeftPaneSize
    },
    middleSize: function () {
      let size = 100 - (this.leftSize + this.rightSize)
      if (size < 0) {
        size = 0
      }
      return size
    },
    rightSize: function () {
      if (this.pageEditMode === 'view' || this.pageEditMode === 'live') {
        return 0 // Hide the right pane
      }
      if (this.myRightPaneSize < 0) {
        return 5
      }
      if (this.myRightPaneSize + this.myLeftSize > 100) {
        return 100 - this.leftSize
      }
      return this.myRightPaneSize
    },

    keymap () {
      let self = this
      return {
        // 'ctrl+alt+esc': {
        'alt+esc': {
          keydown: this.toggleEditing
        },
      }
    },


    thePropertyElement () {
      if (process.browser) {
        if (this.$store.state.contentLayout) {
          return this.$store.state.contentLayout.propertyElement
        } else {
          // Has contentservice been installed?
          console.error(`ContentLayoutEditor: this.$store.state.contentLayout is not defined`)
          return null
        }
      }
      return null
    }

  },


  methods: {

    toggleEditing (e) {
      // Prevent duplicate event handling.
      if (e.timeStamp === previousTimeStamp) {
        return true
      }
      previousTimeStamp = e.timeStamp

      // Toggle between view and {edit|layout|debug}
      // When we switch to view mode, we remember which of the edit modes
      // we were in, so we can toggle back to the same mode.
      let mode = this.$store.state.contentLayout.mode
      let previousEditMode = this.$store.state.contentLayout.previousEditMode
      if (mode === 'view') {
        // Switch to one of the edit modes
        //console.log(` - switch to ${previousEditMode}`)
        this.$store.commit('contentLayout/setEditMode', { mode: previousEditMode })

      } else {
        // Switch back to view mode
        //console.log(` - switch to view mode`)
        this.$store.commit('contentLayout/setEditMode', { mode: 'view', previousEditMode: mode })
      }
    },

    cycleEditMode () {
      let mode = this.$store.state.contentLayout.mode
      switch (mode) {
        case 'edit':
          this.$store.commit('contentLayout/setEditMode', { mode: 'layout', previousEditMode: 'layout' })
          break;

        case 'layout':
          this.$store.commit('contentLayout/setEditMode', { mode: 'debug', previousEditMode: 'debug' })
          break;

        case 'debug':
          this.$store.commit('contentLayout/setEditMode', { mode: 'edit', previousEditMode: 'edit' })
          break;
      }
    },

    onDragEnd (size) {
      console.log('Drag End', size) // callback new size
      if (this.hasLeftSlot) {
        // Have three panes
        this.myLeftPaneSize = (size[0] > 70) ? 70 : size[0]
        if (this.rightSize > 0) {
          // i.e. The right pane is being shown
          console.log('Setting right pane size to ', size[2])
          this.myRightPaneSize = (size[2] < 10) ? 10 : size[2]
        }
      } else {
        // Only two panes
        //this.myLeftPaneSize = (size[0] > 70) ? 70 : size[0]
        if (this.rightSize > 0) {
          // i.e. The right pane is being shown
          console.log('Setting right pane size to ', size[1])
          this.myRightPaneSize = (size[1] < 10) ? 10 : size[1]
        }

      }

    },

    dump () {
      console.log('dump')
      //- console.log('dump', this.editcontext)
      //- console.log(`contentdata=`, this.contentdata)
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
    },
  },
  created: function () {

    // If the user has not defined the required options, do so now.
    if (this.rightPane) {
      this.myShowRightPage = true
    }
    if (this.rightPaneSize) {
      this.myRightPaneSize = this.rightPaneSize
    }
    if (this.leftPaneSize) {
      this.myLeftPaneSize = this.leftPaneSize
    }

    // Add a few functions
    let self = this


    console.log(`------------------------------`)
    console.log(`anchor=`, this.anchor)
    console.log(`layout=`, this.layout)

    if (this.anchor) {

      // Have an anchor - load the content from Crowdhound
      this.$store.dispatch('contentLayout/setContent', { vm: this, type: 'crowdhound', anchor: this.anchor })
      this.haveLayout = true
    } else if (this.layout) {

      // Layout is provided. The store will not load or save this layout.
      this.$store.dispatch('contentLayout/setContent', { vm: this, type: 'fixed', layout: this.layout })
      this.haveLayout = true
    } else {
      // Incorrect props
      console.error(`content-content must be provided prop 'layout' or prop 'anchor'`)
    }

    /*

    if (!process.server && this.contentdata && this.contentdata.data && this.contentdata.data.layout) {
      console.log('ContentLayoutEditor.created - setting layout')
      //this.$store.state.contentLayout.layout
      let sanitized = this.$content.util.sanitizeLayout(this.contentdata.data.layout)
      console.log(`sanitized=`, this.$content.util.safeJson(sanitized))

      //Sat-May-19
      // Convert and remember the content we are editing
      this.$store.commit('contentLayout/setLayout', { element: sanitized })
    } else {
      // We don't have a layout, maybe create one? ZZZZZ
      this.$store.commit('contentLayout/setLayout', { element: null })
    }
    */
  }
}
</script>

<style lang="scss" scoped>

  $editbar-height: 16;
  $editbar-color: #dd0038;

  .c-triple-pane {

    // When we are not editing, the left and middle panes take up the entire
    // width, which pushed the gutter before the right pane onto the next line.
    // In this case make that gutter zero height so it doesn't create empty
    // space below our content.
    // This takes a bit of black magic:
    //  1. The /deep/ is equivalent to >>> for scss, and with Vue's scoping
    //    resolves to something like
    //
    //        #my-triple-pane.c-not-editing-layout[0x277261] .gutter
    //        See https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
    //
    //  2. There is no CSS selector to find the second element that matches a
    //    class selector, but you can select the siblings of the first element
    //    using ~. So we set a rule for all .gutter elements, and then override
    //    the rule for all but the first. This works fine because there are only
    //    two. See
    //
    //        https://stackoverflow.com/questions/2717480/css-selector-for-first-element-with-class
    //
    &.c-triple-pane.c-not-editing-layout /deep/ .gutter-horizontal {
      min-height: 50px;
    }
    &.c-triple-pane.c-not-editing-layout /deep/ .gutter-horizontal ~ .gutter-horizontal {
      display: none;
    }

    .c-left-pane {
      padding: 0px !important;
    }

    /*
     *  The middle pane
     */
    .c-middle-pane {
      padding: 0px !important;
    }
    .c-middle-pane-content {
      padding: 3px;
    }

    .c-editbar {
      height: $editbar-height;
      background-color: $editbar-color;
      padding: 1px;
      margin: 0px;

      border: none;
      cursor: pointer;
      font-family: arial;
      font-size: 12px;

      &:hover {
        .c-editbar-mode-label{
          color: blue;
        }
      }

      .c-editbar-anchor {
        position: absolute;
        left: 15px;
        color: white;
        font-weight: 800;
        font-size: 11px;
      }

      .c-editbar-mode-label {
        display: inline-block;
        color: $editbar-color;
        height: $editbar-height;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 2px;

        background-color: white;
      }

      .c-editbar-dump-button {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 0px;
        a, a:visited, a:hover {
          color: white;
          font-size: 9px;
        }
      }
    }


    /*
     *  The right pane
     */
    .c-right-pane {
      padding: 0px !important;

      .c-properties-pane {
        h1.title {
          font-size: 24px;
        }
        padding: 0px !important;
        margin: 0px;
      }

      .c-components-pane {
        h1.title {
          font-size: 24px;
        }
        padding: 0px !important;
        margin: 0px;
      }

    }
  }

</style>
