<template lang="pug">
div
  div(v-if="selectError")
    .notification.is-danger
      p Error: We were unable to select the user details.
      p This may mean that you do not have permission
        | , or it could be a network or server error.

  div(v-else-if="crowdhoundElement")
    .columns
      .column.is-1
        //settings-frame
      //- column
      .column.is-3.has-text-centered
        .a3-logo(:class="{ 'a3-faded': crowdhoundElement.deleted }")
          i.fas.fa-edit
        .a3-switch
          .level
            b-switch(v-model="crowdhoundElement.deleted", type="is-success" true-value="0" false-value="1")
            span {{crowdhoundElement.deleted ? 'Inactive' : 'Active'}}
        br
        br
        button.button.is-info(v-on:click="rememberToSave") Save
      .column.is-6
        form
          .field
            .label Title
            .control
              input.input(type="text" placeholder="Title" autocomplete="off" v-model="crowdhoundElement.summary")
          .field
            .label Description
            .control
              input.input(type="text" placeholder="Description" autocomplete="off" v-model="crowdhoundElement.description")

</template>

<script>
import ContentMixins from '../mixins/ContentMixins'


const CLEAN = ''
const DIRTY = 'waiting to save'
const SAVING = 'saving'
const SAVED = 'your changes have been saved'
const ERROR = 'warning: your changes have not been saved'
const SAVE_INTERVAL = 2000

export default {
  name: 'content-admin-blog-details',
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

      // Element from server
      crowdhoundElement: null,

      // Saving to server
      saveMsg: '',
      saveTimeout: null,

      selectError: false
    }
  },
  mixins: [
    ContentMixins
  ],
  computed: {

    extraDebug: function () {
      return true
      //return this.$store.state.contentLayout.extraDebug
    },

    useCrowdhound () {
      return true
      // return typeof(this.contentId) != 'undefined'
    },
  },
  methods: {

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
    // We select the content from crowdhound
    if (this.useCrowdhound) {
      console.log(`Selecting text from Crowdhound`)
      if (typeof(this.$content) === 'undefined') {
        console.error('this.$content not defined. Remember to us Contentservice.use(Vue).')
        return
      }
      if (this.$content.disabled) {
        console.error('Contentservice disabled')
        return
      }

      // Select the elements
      console.log('Here we are before select...')
      this.$content.select(this, this.$route.params.blogId)
      .then(result => {

        // Use the elements
        if (result.elements.length > 0) {
          console.log(`result=`, result)
          this.crowdhoundElement = result.elements[0]
        } else {
          // Should not get here
          this.crowdhoundElement = { }
        }
      })
      .catch(e => {
        let desc = `Error loading content`
        console.log(`Dirty rotten error: `, e)
        //handleError(this, desc, params, e)
        this.selectError = true
      })//- axios

    } else {//- !useCrowdhound
      // Edit the text in the provided element
      console.log('Using description from element in layout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.a3-logo {
  margin-top: 5px;
  margin-bottom: 25px;
  font-size: 112px;
  line-height: 112px;
  &.a3-faded i.fa {
    color: #d0d0d0;
  }
}
.a3-switch {
  display: inline-block;
  width: 110px;
  //text-align: center;
}
</style>
