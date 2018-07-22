<template lang="pug">
.my-page.container.is-fluid.is-fullheight(v-hotkey="keymap")
  .has-text-centered(v-if="extraDebug")
    | &lt;content-pane&gt;
    br
    | pageEditMode={{pageEditMode}}
    br

  .multipane-container(v-if="editcontext.showLeftPane")
    // https://github.com/bajaniyarohit/vue-split-panel
    split.my-split(:j1="editcontext.showLeftPane", :j2="editcontext.showRightPane", :j3="pageEditMode")
      // Left
      split-area.pane.leftpane(v-show="leftSize > 0", :size="leftSize", :minSize="200")
        slot(name="left-pane")



      // Middle
      split-area.pane.middlepane(:size="middleSize", :minSize="300")
        .tt-editable-header(v-if="pageEditMode !== 'view'" @click.stop="cycleEditMode")
          .tt-editable-mode mode is {{pageEditMode}}
          | &nbsp;{{ $store.state.contentLayout.saveMsg }}
          .tt-dump-button(zv-if="pageEditMode === 'layout'")
            | &nbsp;&nbsp;
            a(@click.stop="dump") dump

        slot



      // Right
      split-area.rightpane(v-show="rightSize > 0", :size="rightSize", :minSize="200")
        split.my-split(style="height: 100%; width: 100%;", :direction="'vertical'")

          // Properties Pane
          split-area.pane.properties-pane(:size="50", :minSize="150")
            h1.title Properties
            //content-element-props(:element="this.$store.state.contentLayout.propertyElement")
            content-element-props(:element="thePropertyElement", :level="0")

          // Components pane
          split-area.pane.components-pane(:size="50", :minSize="150")
            h1.title Toolbox
            content-toolbox

  .multipane-container(v-else)
    // https://github.com/bajaniyarohit/vue-split-panel
    split.my-split(:j1="editcontext.showLeftPane", :j2="editcontext.showRightPane", :j3="pageEditMode")


      // Middle
      split-area.pane.middlepane(:size="middleSize", :minSize="300")
        .tt-editable-header(v-if="pageEditMode !== 'view'" @click.stop="cycleEditMode")
          .tt-editable-mode mode is {{pageEditMode}}
          | &nbsp;{{ $store.state.contentLayout.saveMsg }}
          .tt-dump-button(zv-if="pageEditMode === 'layout'")
            | &nbsp;&nbsp;
            a(@click.stop="dump") dump

        slot



      // Right
      split-area.rightpane(v-show="rightSize > 0", :size="rightSize", :minSize="200")
        split.my-split(style="height: 100%; width: 100%;", :direction="'vertical'")

          // Properties Pane
          split-area.pane.properties-pane(:size="50", :minSize="150")
            h1.title Properties
            //content-element-props(:element="this.$store.state.contentLayout.propertyElement")
            content-element-props(:element="thePropertyElement")

          // Components pane
          split-area.pane.components-pane(:size="50", :minSize="150")
            h1.title Toolbox
            content-toolbox


</template>

<script>




/*


            THIS IS DEPRECATED.
            USE ContentLayoutPanes INSTEAD.


*/




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

    leftPane: {
      required: true,
      type: Boolean
    },



    editcontext: {
      required: true,
      type: Object
    },
    editable: String,
    contentdata: Object, // to allow dump
    toolbox: Object,

    // Prefix for contained element anchors
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
      previousEditMode: 'edit',

    }
  },
  mixins: [
    ContentMixins
  ],
  computed: {

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


    leftSize: function () {
      //console.log(`leftPaneSize=${this.editcontext.leftPaneSize}, showLeftPane=${this.editcontext.showLeftPane}`)
      if (this.editcontext.leftPaneSize < 0 || !this.editcontext.showLeftPane) {
        return 0
      } else if (this.editcontext.leftPaneSize > 100) {
        return 100
      }
      return this.editcontext.leftPaneSize
    },
    rightSize: function () {
      if (this.pageEditMode === 'view' || this.pageEditMode === 'live') {
        return 0 // Hide the right pane
      }
      if (this.editcontext.rightPaneSize < 0 || !this.editcontext.showRightPane) {
        return 0
      }
      if (this.editcontext.rightPaneSize + this.editcontext.leftSize > 100) {
        return 100 - this.leftSize
      }
      return this.editcontext.rightPaneSize
    },

    middleSize: function () {
      let size = 100 - (this.leftSize + this.rightSize)
      if (size < 0) {
        return 0
      }
      return size
    },

    keymap () {
      let self = this
      return {
        'ctrl+alt+esc': {
        //'alt+esc': {
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
          console.error(`ContentTriplePane: this.$store.state.contentLayout is not defined`)
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


    dump () {
      console.log('dump', this.editcontext)
      console.log(`contentdata=`, this.contentdata)
      if (this.contentdata && this.contentdata.data && this.contentdata.data.layout) {
        console.log(`layout:\n`, this.contentdata.data.layout)

        // Convert to a string
        var json = this.$content.safeJson(this.contentdata.data.layout)

        // Dump to the console
        console.log(`\n\nDUMP:\n\nexport default ${json}\n\n`)

      }
    },
  },
  created: function () {

    // Add a counter. By incrementing this, we can trigger a UI update.
    //Vue.set(this.editcontext, 'tt_counter', 0)

    // If the user has not defined the required options, do so now.
    if (typeof(this.editcontext.showRightPane) === 'undefined') {
      Vue.set(this.editcontext, 'showRightPane', true)
    }
    if (typeof(this.editcontext.showLeftPane) === 'undefined') {
      Vue.set(this.editcontext, 'showLeftPane', false)
    }
    if (typeof(this.editcontext.rightPaneSize) === 'undefined') {
      Vue.set(this.editcontext, 'rightPaneSize', 20)
    }
    if (typeof(this.editcontext.leftPaneSize) === 'undefined') {
      //console.log('Setting leftPaneSize')
      Vue.set(this.editcontext, 'leftPaneSize', 20)
    }

    // Add a few functions
    let self = this

  }
}
</script>


<style lang="scss" scoped>
.tt-editable {
  position: relative;
}

.tt-editable-initiate {
  position: absolute;
  right: 5px;
  top: 5px;
  //color: #999;
  color: red;
  cursor: pointer;
  font-size: 20px;
  opacity: 0.5;

  &:hover {
    //color: red;
    background-color: red;
    color: white;
    opacity: 1.0;
    border-radius: 5px;
  }
}
.tt-editable-header {
  height: 30px;
  //background-color: #e0e0e0;
  background-color: #dd0000;

  border-bottom: solid 1px #999;
  cursor: pointer;

  .tt-editable-mode {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 800;
    margin-top: 2px;
    border-radius: 5px;

    //background-color: red;
    //color: white;
    background-color: white;
    color: black;
  }
  .tt-dump-button {
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
.tt-editable-header:hover {
  .tt-editable-mode{
    //color: blue;
  }
  //border-bottom-color: #99e;
  //background-color: #e0e0f0;
}

.my-page {
  // background-color: yellow;
  min-height: 100vh;
  // display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 0px;
  margin-right: 0px;
  background-color: white;
}

.multipane-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.my-split {
  height: 100%;
  width: 100%;
}
.my-split > .Size {
  padding: 15px;
  overflow: scroll;
  border: 1px solid #ccc;
  position: relative;
}
.my-split > .pane ~ .pane {
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.leftpane {
  position: relative;
  background: #eee;
}

.middlepane {
  position: relative;
  padding: 0px !important;
  height: 100%;
}

.rightpane {
  position: relative;
  h1.title {
    font-size: 24px;
  }
}

.properties-pane {
  padding: 0px !important;
  margin: 0px;
}

.components-pane {
  padding: 0px !important;
  margin: 0px;
}

.box {
  // width: 50px;
  height: 50px;
  border: solid 1px #999;
}

</style>
