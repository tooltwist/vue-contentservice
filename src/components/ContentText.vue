<template lang="pug">
div
  //- | &lt;content-text&gt;
  //- br


  // View mode - just show the text
  span(v-if="isPageMode('view')")
    | {{protectedContent}}
  // Debug mode - show a surround, click to edit
  .my-debug-box(v-else-if="isPageMode('debug')")
    .my-debug-header
      | text
      br
      | contentId: {{contentId}}

    // the click event's propagation will be stopped
    span.stop(@click="select(element), itemClick(element)")
      | {{protectedContent}}
  // Edit and layout mode - click to edit
  span.stop(v-else @click="select(element), itemClick(element)")
    | {{protectedContent}}

  // Here's the editing bit
  div(v-if="isPageMode('edit,layout,debug') && editing")
    hr
    | &nbsp;{{saveMsg}}
    br
    textarea.textarea.my-input(v-model="protectedContent")

</template>

<script>

import ContentFunctions from '../lib/ContentFunctions'

const CLEAN = ''
const DIRTY = '- waiting to save -'
const SAVING = '- saving -'
const SAVED = '- your changes have been saved -'
const ERROR = 'warning: your changes have not been saved'
const SAVE_INTERVAL = 2000


export default {
  name: 'content-text',
  components: {
  },
  props: {
    /*
     *  Must provide either contentId or an element.
     *  If contentId is provided, we'll select the content from Crowdhound.
     *  If an element is provided, we'll update it via $store.
     */
    //editcontext: Object,
    contentId: String,
    element: Object,
  },
  data: function () {
    return {
      'editing': false,
      //anchor: '$example-text-comments',
      //- anchor: '$example-text-comments',
      title: '',
      summary: '',
      description: '',

      // Element from server
      crowdhoundElement: { },

      // Saving to server
      saveMsg: '',
      saveTimeout: null,
    }
  },
  computed: {

    ...ContentFunctions.computed,

    useCrowdhound () {
      return typeof(this.contentId) != 'undefined'
    },

    protectedContent: {
      get () {
        if (this.useCrowdhound) {
          return this.crowdhoundElement.description
        } else {
          let name = 'text'
          return this.element[name]
          //- return this.element.text
        }
      },
      set (value) {
        if (this.useCrowdhound) {
          this.crowdhoundElement.description = value
          console.log('protectedContent.set: ', value)
          this.rememberToSave()
        } else {
          let name = 'text'
          this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: name, value })
        }
      }
    },
  },

  methods: {

    // Compare the page mode to a comma separated list
    isPageMode (modes) {
      return modes.split(',').includes(this.pageEditMode)
    },

    itemClick (element) {
      console.log('clicked !')
      if (this.pageEditMode != 'edit') {
        this.editing = false
      } else {
        this.editing = !this.editing
      }
    },

    // Select this element
    select (element) {
      console.log('Text.select()')

      if (this.pageEditMode != 'view') {
        this.$store.commit('contentLayout/setPropertyElement', { element })
      }
    },

    rememberToSave () {

      // We need to save changes to Crowdhound
      // Don't save every change, but rather wait five seconds to
      // batch up the changes.
      console.log( `save to Crowdhound (not yet)`)
      //this.crowdhoundElement.description = value
      if (this.saveTimeout) {
        // Already set the timeout to save
      } else {
        // Save after five seconds
        this.saveMsg = DIRTY
        this.saveTimeout = setTimeout(() => {
          // Save the changes
          this.saveTimeout = null
          this.saveMsg = SAVING
          this.saveToCrowdhound()
        }, SAVE_INTERVAL)
      }
    },

    saveToCrowdhound () {
      console.error(`saveToCrowdhound`)
      this.saveMsg = SAVED

      this.$content.update(this, this.crowdhoundElement)
        //- this.$content.select(this, params)
        .then(result => {
          setTimeout(() => { if (this.saveMsg === DIRTY) { this.saveMsg = CLEAN }}, 1700)
          console.log(`result of save:`, result)
          console.log(`result of save:`, result.data)
        })
        .catch(e => {
          let desc = `Error loading comments`
          console.log(`Dirty rotten error: `, e)
          this.saveMsg = ERROR
          /* handleError(this, desc, params, e) */
          this.selectError = true
        })//- axios

    }
  },
  created () {
    if (this.useCrowdhound) {

      // We select the content from crowdhound
      //console.log(`TooltwistText.created`)
      if (typeof(this.$content) === 'undefined') {
        console.error('this.$content not defined. Remember to us Contentservice.use(Vue).')
        return
      }
      if (this.$content.disabled) {
        console.error('Contentservice disabled')
        return
      }

      // Select the elements
      let anchor1 = `testpage.${this.contentId}`
      let anchor2 = `$testpage.${this.contentId}`
      //console.error(`Anchor is ${anchor}.`)
      let elementType = 'text'

      //- let params = {
      //-   elementId: anchor,
      //-   withChildren: true
      //- }
      this.$content.select(this, anchor2, elementType)
        .then(result => {

          // Use the elements
          if (result.elements.length > 0) {
            console.log(`result=`, result)
            this.crowdhoundElement = result.elements[0]

            // If this is a new element, use Lorem Ipsum text
            if (this.crowdhoundElement.description === anchor1) {
              this.crowdhoundElement.description = `Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.`
            }

          } else {
            // Should not get here
            this.crowdhoundElement = { }
          }
        })
        .catch(e => {
          let desc = `Error loading content`
          console.log(`Dirty rotten error: `, e)
          /* handleError(this, desc, params, e) */
          this.selectError = true
        })//- axios

    } else {//- !useCrowdhound
      // Edit the text in the provided element
      console.log('Using description from element in layout')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-debug-box {
  border-left: dashed 1px #ccc;
  border-bottom: dashed 1px #ccc;
  border-right: dashed 1px #ccc;
  margin: 1px;

  .my-debug-header {
    background-color: #ccc;
    color: black;
    font-size: 9px;
  }
}
.my-input {
  width: 100%;
}
</style>
