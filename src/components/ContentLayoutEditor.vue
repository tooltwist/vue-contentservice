<template lang="pug">
div
  //
  // See https://www.npmjs.com/package/vue-split-panel
  //

  //Split.c-triple-pane(:style="splitStyle", :gutterSize="gutterSize", @onDragEnd="onDragEnd", :class="isEditing ? 'c-editing-layout' : 'c-not-editing-layout' ", v-hotkey="keymap")
  Split.c-triple-pane(:style="splitStyle", :gutterSize="gutterSize", @onDragEnd="onDragEnd", :class="[ { 'c-editing-layout': isEditing }, {'c-not-editing-layout': !isEditing}, {'c-has-left-pane': hasLeftSlot}, {'c-no-left-pane': !hasLeftSlot} ]", v-hotkey="keymap")

    // Left pane
    SplitArea.c-left-pane(v-if="hasLeftSlot", :size="leftSize")
      slot(name="left-pane")

    // Middle pane
    SplitArea.c-middle-pane(:size="middleSize")

      // Edit bar
      .c-editbar(v-if="pageEditMode !== 'view'" @click.stop="switchMode(null)")

        // left end of bar
        .c-editbar-anchor {{anchor}}

        // right end of bar
        .c-editbar-right
          | {{ $store.state.contentLayout.saveMsg }}

          //- .c-editbar-dump-button(zv-if="pageEditMode === 'layout'")
          //-   | &nbsp;&nbsp;
          //-   a(@click.stop="dump") dump

        // middle of bar
        .c-editbar-mode-label(v-if="pageEditMode==='edit' || pageEditMode==='layout' || pageEditMode==='debug'")
          span(:class="pageEditMode==='edit' ? 'c-selected-mode-style': ''", @click.stop="switchMode('edit')") edit
          | &nbsp;/&nbsp;
          //span(:class="pageEditMode==='layout' ? 'c-selected-mode-style': ''", @click.stop="switchMode('layout')") layout
          //| &nbsp;/&nbsp;
          span(:class="pageEditMode==='debug' ? 'c-selected-mode-style': ''", @click.stop="switchMode('debug')") design
        .c-editbar-mode-label(v-else)
          | {{pageEditMode}} mode

      // Actual content
      .c-middle-pane-content
        content-children(v-if="haveLayout", :editcontext="{}", :element="$store.state.contentLayout.layout")

        div(v-else)
          slot(name="middle-pane")
          slot

    // Right pane
    SplitArea.c-right-pane(zv-show="rightSize > 0", :style="rightPaneStyle", :size="rightSize", :minSize="rightSize > 0 ? 200 : 0")

      slot(v-if="hasRightSlot", name="right-pane")
      Split(v-else, :direction="'vertical'", :style="propertiesSplitStyle", :gutterSize="gutterSize")

        // Properties Pane
        SplitArea.c-properties-pane(:size="40", :minSize="300")
          h1.title Properties
          content-element-props(:level="0")

        // Components pane
        SplitArea.c-components-pane(:size="60", :minSize="150")
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

    switchMode (newMode) {

      // If the new mode is not specified, cycle through the editing options.
      if (!newMode) {
        // Switch based on existing mode
        let currentMode = this.$store.state.contentLayout.mode
        switch (currentMode) {
          case 'edit':
            newMode = 'layout'
            break;

          case 'layout':
            newMode = 'debug'
            break;

          case 'debug':
            newMode = 'edit'
            break;
        }
      }
      this.$store.commit('contentLayout/setEditMode', { mode: newMode, previousEditMode: newMode })
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
  }
}
</script>

<style lang="scss">
  @import '../assets/css/content-editor.scss'
</style>

<style lang="scss" scoped>
  @import '../assets/css/content-variables.scss';

  .c-triple-pane {

    // When we are not editing, the middle pane and/or left pane take up the entire
    // width, which pushes the gutter before the right pane onto the next line.
    // In this case we need to make that gutter zero height so it doesn't create empty
    // space below our content.
    //
    // This takes a bit of black magic:
    //  1. When we have a left pane, this will be the second gutter. When there is
    //    no left pane it will be the first gutter.
    //
    //  2. The /deep/ is the sccs equivalent of >>>, so with Vue's scoping
    //    resolves to something like
    //
    //        #my-triple-pane.c-not-editing-layout[0x277261] .gutter
    //        See https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
    //
    //  3. There is no CSS selector to find the second element that matches a
    //    class selector, but you can select the siblings of the first element
    //    using ~. So we set a rule for all .gutter elements, and then override
    //    the rule for all but the first. This works fine because there are only
    //    two. See
    //
    //        https://stackoverflow.com/questions/2717480/css-selector-for-first-element-with-class
    //
    &.c-not-editing-layout {

      // Not editing, have a left pane
      &.c-has-left-pane {


        & /deep/ .gutter-horizontal {
          height: 100%;
        }

        // Siblings of first
        & /deep/ .gutter-horizontal ~ .gutter-horizontal {
          height: 0px;
        }
      }

      // Not editing, no a left pane
      &.c-no-left-pane {
        & /deep/ .gutter-horizontal {
          height: 0px;
        }
      }
    }


    //
    //  Look after the left pane, if there is one.
    //
    .c-left-pane {
      padding: 0px !important;
    }



    //
    //  Look after the middle pane.
    //
    &.c-editing-layout {

      .c-middle-pane {
        position: relative;
        padding: 0px !important;
        //overflow-y: hidden;
      }

      .c-editbar {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        z-index: 100;

        display: block;
        width: 100%;
        //- position: absolute;
        top: 0px;
        left: 0px;
        height: $c-editbar-height;
        background-color: $c-editbar-color;
        padding: 1px;
        margin: 0px;

        border: none;
        border-bottom: solid 2px white;
        cursor: pointer;
        font-family: arial;
        font-size: 12px;

        text-align: center;


        .c-editbar-anchor {
          position: absolute;
          left: 15px;
          color: white;
          font-weight: 800;
          font-size: 11px;
        }

        .c-editbar-mode-label {
          display: table;
          color: $c-editbar-color;
          height: $c-editbar-height;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 2px;
          margin: 0 auto;
          background-color: white;
        }

        .c-selected-mode-style {
          color: blue;
          font-weight: 800;
        }
        .c-not-selected-mode-style {
        }
        .c-editbar-mode-label:hover {
          color: green;
        }

        .c-editbar-right {
          position: absolute;
          right: 15px;
          color: white;
          font-weight: 800;
          font-size: 11px;
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
      }//- c-editbar


      .c-middle-pane-content {
        margin-top: calc(#{$c-editbar-height} + 2px);
        padding: 0px;
      }
    }//- .c-editing-layout


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
