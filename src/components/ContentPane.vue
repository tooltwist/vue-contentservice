<template lang="pug">
.my-content-pane.container.is-fluid.is-fullheight(v-hotkey="keymap")
  .has-text-centered(v-if="extraDebug")
    | &lt;content-pane&gt;
    br
    | pageEditMode={{pageEditMode}}
    br
  .multipane-container
    .tt-editable-header(v-if="pageEditMode !== 'view'" @click.stop="cycleEditMode")
      .tt-editable-mode {{pageEditMode}} mode
    slot


</template>

<script>
import Vue from 'vue'
import ContentFunctions from '../lib/ContentFunctions'

// Prevent double keypresses
let previousTimeStamp = 0

export default {
  name: 'content-pane',
  props: {
    editable: String,
  },
  computed: {

    ...ContentFunctions.computed,

    keymap () {
      let self = this
      return {
        // 'ctrl+alt+esc': {
        'alt+esc': {
          keydown: this.toggleEditing
        },
      }
    }
  },
  methods: {

    toggleEditing (e) {
      // Prevent duplicate event handling.
      if (e.timeStamp === previousTimeStamp) {
        return true
      }
      previousTimeStamp = e.timeStamp

      // Toggle between view and {edit|debug}
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
          this.$store.commit('contentLayout/setEditMode', { mode: 'debug', previousEditMode: 'debug' })
          break;

        // No 'layout' mode for <content-pane>
        case 'debug':
        case 'layout':
          this.$store.commit('contentLayout/setEditMode', { mode: 'edit', previousEditMode: 'edit' })
          break;
      }
    },
  },
  created: function () {
  }
}
</script>

<style lang="scss">

.tt-container .container {
  width: 90% !important;
}

</style>

<style lang="scss" scoped>
.tt-editable {
  position: relative;
}

//- .tt-editable-initiate {
//-   position: absolute;
//-   right: 5px;
//-   top: 5px;
//-   //color: #999;
//-   color: red;
//-   cursor: pointer;
//-   font-size: 20px;
//-   opacity: 0.5;
//-
//-   &:hover {
//-     //color: red;
//-     background-color: red;
//-     color: white;
//-     opacity: 1.0;
//-     border-radius: 5px;
//-   }
//- }
.tt-editable-header {
  height: 30px;
  //background-color: #e0e0e0;
  background-color: #dd0000;
  padding-top: 2px;
  // justify-content: center;
  align-items: center;
  text-align: center;

  border-bottom: solid 1px #999;
  cursor: pointer;

  .tt-editable-mode {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 600;
    margin-top: 2px;
    border-radius: 4px;
    background-color: white;
    color: black;
  }
}
.tt-editable-header:hover {
  .tt-editable-mode{
    //color: blue;
  }
  //border-bottom-color: #99e;
  //background-color: #e0e0f0;
}

.my-content-pane {
  // background-color: yellow;
  // min-height: 100vh;
  // display: flex;
  // justify-content: center;
  //align-items: center;
  //text-align: center;
  margin-left: 0px;
  margin-right: 0px;
  //- background-color: white;
}

//- .my-content-pane {
//-   // background-color: yellow;
//-   min-height: 100vh;
//-   // display: flex;
//-   justify-content: center;
//-   align-items: center;
//-   text-align: center;
//-   margin-left: 0px;
//-   margin-right: 0px;
//-   background-color: white;
//- }

//- .multipane-container {
//-   position: absolute;
//-   height: 100%;
//-   width: 100%;
//- }

//- .my-split {
//-   height: 100%;
//-   width: 100%;
//- }
//- .my-split > .Size {
//-   padding: 15px;
//-   overflow: scroll;
//-   border: 1px solid #ccc;
//-   position: relative;
//- }
//- .my-split > .pane ~ .pane {
//- }

//- .title {
//-   font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
//-   display: block;
//-   font-weight: 300;
//-   font-size: 100px;
//-   color: #35495e;
//-   letter-spacing: 1px;
//- }
//-
//- .subtitle {
//-   font-weight: 300;
//-   font-size: 42px;
//-   color: #526488;
//-   word-spacing: 5px;
//-   padding-bottom: 15px;
//- }

//- .links {
//-   padding-top: 15px;
//- }

//- .leftpane {
//-   position: relative;
//-   background: #eee;
//- }

//- .middlepane {
//-   position: relative;
//-   padding: 0px !important;
//-   height: 100%;
//- }
//-
//- .rightpane {
//-   position: relative;
//-   h1.title {
//-     font-size: 24px;
//-   }
//- }

//- .properties-pane {
//-   padding: 0px !important;
//-   margin: 0px;
//- }

//- .components-pane {
//-   padding: 0px !important;
//-   margin: 0px;
//- }

//- .box {
//-   // width: 50px;
//-   height: 50px;
//-   border: solid 1px #999;
//- }

</style>
