<template lang="pug">

  .content-dummy(v-if="sane")
    crowdhound-minimal-element(:element="element" v-bind:level="0")

</template>

<script>
import axios from 'axios'
import handleError from '../lib/handleError.js'
import CrowdhoundMinimalElement from './CrowdhoundMinimalElement.vue'

export default {
  name: 'crowdhound-minimal',
  components: {
    CrowdhoundMinimalElement
  },
  props: {
    contentId: String,
    anchor: String, // Deprecated
  },
  data () {
    return {
      element: null,

      selectError: false,

      // Did we pass sanity checks?
      sane: true
    }
  },
  watch: {
    anchor: function(newContentId, oldContentId) { // Deprecated
      this.load()
    },
    contentId: function(newContentId, oldContentId) {
      this.load()
    }
  },
  methods: {

    // Select the elements from the server
    load () {
      if (this.$content.disabled) {
        console.error('Contentservice disabled')
        return
      }

      // Select the elements
      let params = {
        elementId: (this.contentId ? this.contentId : this.anchor),
        withChildren: true
      }
      this.$content.select(this, params).then(result => {

        // Use the elements
        if (result.elements.length > 0) {
          this.element = result.elements[0]
        } else {
          this.element = null
        }
      })
      .catch(e => {
        let desc = `Error loading comments`
        handleError(this, desc, params, e)
        this.selectError = true
      })
    }
  },
  created () {

    // Sanity check
    if (!this.$content) {
      console.error(`CrowdhoundMinimal.created(): this.$content not defined: has ContentService been initialised?`);
      this.sane = false
      return
    }

    this.load()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-dummy {
}
</style>
