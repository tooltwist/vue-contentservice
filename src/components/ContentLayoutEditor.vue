<template lang="pug">
div(v-if="sane")
  //
  // See https://www.npmjs.com/package/vue-split-panel
  //
  Split.c-layout-editor(:style="splitStyle", :gutterSize="gutterSize", @onDragEnd="onDragEnd", :class="[ { 'c-editing-layout': isEditing }, {'c-not-editing-layout': !isEditing}, {'c-has-left-pane': hasLeftSlot}, {'c-no-left-pane': !hasLeftSlot} ]", v-hotkey="keymap")

    // Left pane
    SplitArea.c-left-pane(v-if="hasLeftSlot", :size="leftSize")
      slot(name="left-pane")

    // Middle pane
    SplitArea.c-middle-pane(:size="middleSize")

      // Edit bar
      .c-editbar(v-if="pageEditMode !== 'view'" @click.stop="switchMode(null)")

        // left end of bar
        .c-editbar-contentId {{crowdhoundAnchor}}

        // right end of bar
        .c-editbar-right
          | {{ $content.store.state.saveMsg }}

          //- .c-editbar-dump-button(zv-if="pageEditMode === 'layout'")
          //-   | &nbsp;&nbsp;
          //-   a(@click.stop="dump") dump

        // middle of bar
        .c-editbar-mode-label(v-if="pageEditMode==='edit' || pageEditMode==='layout' || pageEditMode==='debug'")
          span(:class="pageEditMode==='edit' ? 'c-selected-mode-style': ''", @click.stop="switchMode('edit')") edit
          | &nbsp;/&nbsp;
          span(:class="pageEditMode==='debug' ? 'c-selected-mode-style': ''", @click.stop="switchMode('debug')") design
        .c-editbar-mode-label(v-else)
          | {{pageEditMode}} mode

      // Actual content
      .c-middle-pane-content
        content-children(v-if="haveLayout", :element="$content.store.state.layout", :context="mycontext")

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
    anchor: { // Deprecated. Not sure if this is actually used.
      type: String,
      required: false
    },
    contentId: { // Use this rather than 'anchor', even though it is used as an anchor in Crowdhound.
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

      // Did we pass sanity checks?
      sane: true
    }
  },
  mixins : [
    ContentMixins,
  ],
  watch: {
    // whenever anchor changes, this function will run
    anchor: function (newContentId, oldContentId) { // Deprecated
      // Deprecated
      //console.error(`anchor changed from ${oldContentId} to ${newContentId}`)
      this.$content.setContent({ vm: this, type: 'crowdhound', contentId: newContentId })
    },
    // whenever contentId changes, this function will run
    contentId: function (newId, oldId) {
      // console.error(`contentId changed from ${oldId} to ${newId}`)
      this.$content.setContent({ vm: this, type: 'crowdhound', contentId: newId })
    }
  },
  computed: {
    crowdhoundAnchor: function () {
      if (this.contentId) {
        return this.contentId
      }
      if (this.anchor) { // Deprecated
        return this.anchor
      }
      return null
    },

    mycontext: function () {
      if (this.context) {
        return this.context
      }
      return { }
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

    layoutAsJson: function () {
      if (process.browser) {
        /*
        */
        console.log('^^^ 1', this.$content.store)
        console.log('^^^ 2', this.$content.store.state)
        console.log('^^^ 3', this.$content.store.state.layoutAsJson)
        return this.$content.util.safeJson(this.$content.store.state.layout)
      }
      return '-server side-'
    },

    propertyElementAsJson: function () {
      if (process.browser) {
        return this.$content.util.safeJson(this.$content.store.getters.propertyElement)
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
        'ctrl+alt+esc': {
          keydown: this.toggleEditing
        },
        //- 'ctrl+enter': {
        //-   keydown: this.toggleEditing
        //- },
        //- 'ctrl+alt+m': {
        //-   keydown: this.switchMode(null)
        //- },
      }
    },


    thePropertyElement () {
      if (process.browser) {
        if (this.$content.store.state) {
          return this.$content.store.getters.propertyElement
        } else {
          // Has contentservice been installed?
          console.error(`ContentLayoutEditor: this.$content.store.state is not defined`)
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
      this.$content.toggleEditMode()
    },

    switchMode (newMode) {

      // If the new mode is not specified, cycle through the editing options.
      if (!newMode) {
        // Switch based on existing mode
        let currentMode = this.$content.store.state.mode
        switch (currentMode) {
          case 'edit':
            newMode = 'debug'
            break;

          case 'layout':
            newMode = 'debug'
            break;

          case 'debug':
            newMode = 'edit'
            break;
        }
      }
      this.$content.setEditMode({ mode: newMode, previousEditMode: newMode })
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
    console.log(`ContentLayoutEditor.created(): this.$content.store=`, this.$content.store);
    // console.log(`ContentLayoutEditor.created(): this=`, this);

    // Sanity check
    if (!this.$content) {
      console.error(`ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?`);
      this.sane = false
      return
    }

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
    console.log(`contentId=`, this.crowdhoundAnchor)
    console.log(`layout=`, this.layout)

    if (this.contentId) {

      // Have an ID - load the content from Crowdhound
      this.$content.setContent({ vm: this, type: 'crowdhound', contentId: this.contentId })
      this.haveLayout = true

    } else if (this.anchor) {

      // Deprecated, but supported for (probably unneeded) backwards compatibility.
      console.error(`ContentLayoutEditor: prop 'anchor' is deprecated. Please use 'contentId' instead.`);
      this.$content.setContent({ vm: this, type: 'crowdhound', contentId: this.anchor })
      this.haveLayout = true
    } else if (this.layout) {

      // Layout is provided. The store will not load or save this layout.
      this.$content.setContent({ vm: this, type: 'fixed', layout: this.layout })
      this.haveLayout = true
    } else {
      // Incorrect props
      console.error(`content-layout-editor must be provided prop 'layout' or prop 'contentId'`)
    }
  } // created()
}
</script>

<style lang="scss" scoped>
</style>
