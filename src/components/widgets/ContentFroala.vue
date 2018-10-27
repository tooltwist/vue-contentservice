<template lang="pug">

  .c-content-froala(:class="editModeClass")
    span(v-if="extraDebug")
      | &lt;content-froala
      span(v-if="element") &nbsp;have element
      span(v-if="contentId") &nbsp;contentId
      | &gt;
      br

    // Debug mode
    div(v-if="isPageMode('debug')", @click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | richtext
      froala(:tag="'div'", :config="config", v-model="protectedText")

    // Editing
    div(v-else-if="isPageMode('edit')", @click.stop="selectThisElement")
      froala(:tag="'div'", :config="config", v-model="protectedText")

    // layout
    div(v-else-if="isPageMode('layout')", @click.stop="selectThisElement")
      froala-view(:tag="'div'", v-model="element.text")

    // Live mode
    template(v-else)
      froala-view(:tag="'div'", v-model="protectedText")
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from '../EditBarIcons'

// Don't display a license error every time (intentionally global)
let missingLicenseCounter = 0


const CLEAN = ''
const DIRTY = 'waiting to save'
const SAVING = 'saving'
const SAVED = 'your changes have been saved'
const ERROR = 'warning: your changes have not been saved'
const SAVE_INTERVAL = 2000

export default {
  name: 'content-froala',
  components: {
    EditBarIcons
  },
  props: {
    /*
     *  Must provide either contentId or an element.
     *  If contentId is provided, we'll select the content from Crowdhound.
     *  If an element is provided, we'll update it via $content.store.
     */
    //editcontext: Object,
    contentId: String,
    element: Object,
  },
  mixins: [ ContentMixins, CutAndPasteMixins ],
  data: function () {
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
        toolbarButtons: [
          'fontFamily', 'fontSize', 'bold', 'italic', 'underline', /*'strikeThrough',*/ 'color', /*'emoticons',*/
          '-',
          'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-',
          'insertImage', 'insertLink',
          // 'insertFile', 'insertVideo',
          'undo', 'redo'
        ],
        charCounterCount: false,

        // Must be higher than drop areas, and less than the editbar at
        // top of layoutEditor (see ContentChildren, ContentLayoutEditor).
        zIndex: 1900,

        events: {
          'froalaEditor.initialized': function () {
            //console.log('Froala is initialized')
          }
        },

        // Froala activation key
        // Gets set from $content.options.froalaActivationKey
        // See https://www.froala.com/wysiwyg-editor/pricing
        key: null

      },
    }
  },

  computed: {

    useCrowdhound () {
      //return true
      return typeof(this.contentId) != 'undefined'
    },

    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    protectedText: {
      get () {
        if (this.useCrowdhound) {
          // Using content from Crowdhound
          return this.crowdhoundElement ? this.crowdhoundElement.description : ''
        } else {
          // Use text from the element
          let t = this.element.text
          return t
        }
      },
      set (value) {
        if (this.useCrowdhound) {
          // Save content to Crowdhound
          this.crowdhoundElement.description = value
          console.log('protectedContent.set: ', value)
          this.rememberToSave()
        } else {
          // Use text from the element
          let name = 'text'
          this.$content.setProperty({ vm: this, element: this.element, name: name, value })
        }
      }
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
      //console.log(`saveToCrowdhound`)
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
        })//- update

    }
  },

  created () {
    //console.log(`TooltwistFroala.created`)

    // See if we have a license key for Froala
    // console.log('this.$content.options=', this.$content.options)
    if (this.$content && this.$content.options && this.$content.options.froalaActivationKey) {
      // console.log(`Froala activation key: ${this.$content.options.froalaActivationKey}`)
      this.config.key = this.$content.options.froalaActivationKey
    } else {
      if ((missingLicenseCounter++ % 20) === 0) {
        console.error(`Froala activation key not provided to ContentService {options.froalaActivationKey}. Froala text areas may not function correctly.`)
      }
    }

    // See if we select the content from crowdhound, or if it's already provided.
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
      let anchor1 = `testpage.${this.contentId}`
      let anchor2 = `$testpage.${this.contentId}`
      let elementType = 'html'

      //- let params = {
      //-   elementId: anchor,
      //-   withChildren: true
      //- }
      console.log('Here we are before select...')
      this.$content.select(this, anchor2, elementType)
      .then(result => {

        // Use the elements
        if (result.elements.length > 0) {
          console.log(`result=`, result)
          this.crowdhoundElement = result.elements[0]

          // If this is a new element, use Lorem Ipsum text
          if (this.crowdhoundElement.description === anchor1) {
            this.crowdhoundElement.description = `
              Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.
              Proin commodo, ridiculus lorem vel fugit lacus, lorem purus pellentesque,
              imperdiet varius et sed amet. Etiam arcu neque lectus voluptas eros
              consectetuer. Magna dolores dui dui vestibulum wisi, in sit erat
              suspendisse habitasse volutpat lacinia. In diam faucibus semper enim
              est, risus urna faucibus elementum, fusce vitae, vestibulum aenean
              pellentesque, massa class donec. Consectetuer morbi iaculis quis quam,
              nec orci praesent lacus ante vitae, vestibulum dui consectetuer parturient.`
          }

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
      })//- select

    } else {//- !useCrowdhound
      // Edit the text in the provided element
      //console.log('Using description from element in layout')
    }
  }
}
</script>

<style lang="scss" scoped>

  $frame-color: lightblue;
  $text-color: darkblue;

  .c-layout-mode-heading {
    // This extends the definition in content-editor.scss
    background-color: $frame-color;
    color: $text-color;
  }

  .c-edit-mode-debug  {
    border-left: dashed 2px $frame-color;
    border-bottom: dashed 2px $frame-color;
    border-right: dashed 2px $frame-color;
    margin: 1px;
  }

</style>
