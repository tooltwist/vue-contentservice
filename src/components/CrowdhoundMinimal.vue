<template lang="pug">
.content-dummy

  crowdhound-minimal-element(:element="element" v-bind:level="0")

</template>

<script>
import axios from 'axios'
import axiosError from '~/lib/axiosError.js'
import CrowdhoundMinimalElement from './CrowdhoundMinimalElement.vue'

export default {
  name: 'crowdhound-minimal',
  components: {
    CrowdhoundMinimalElement
  },
  props: {
    anchor: String
  },
  data () {
    return {
      element: { },

      selectError: false
    }
  },
  watch: {
    anchor: function(newAnchor, oldAnchor) {
      this.load()
    }
  },
  methods: {

    // Select the elements from the server
    load () {
      this.$content.select(this, {
        elementId: this.anchor,
        //elementId: '$example-text-comments',
        withChildren: true
      })
      .then(result => {
        if (result.elements.length > 0) {
          this.element = result.elements[0]
        } else {
          this.element = null
        }
      })
      .catch(e => {
        axiosError(vm, url, params, e)
        this.selectError = true
      })
    }
  },
  created () {
    this.load()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-dummy {
}
</style>
