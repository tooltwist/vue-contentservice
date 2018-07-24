<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      .my-button
        // handle font-awesome 4 and 5
        // Clipboard. See https://www.npmjs.com/package/v-clipboard
        //- i.fa.fa-download.fas.fa-download(@click="downloadMyElement")
        //- | &nbsp;
        //- i.fa.fa-files-o.fas.fa-copy(v-clipboard="elementToClipboard" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler")
        //- | &nbsp;
        //- i.fa.fa-trash-o.fas.fa-trash-alt(@click="deleteMyElement")
      | Google Doc

    transition(name="fade")
      .c-element-properties(v-if="isExpandedElement")
        .tt-property
          .c-property-label doc ID
          .c-property-value
            input.input(v-model="docID")

</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-google-docs-props',
  mixins: [ PropertyMixins ],
  computed: {

    // We cannot update the element directly - it is stored
    // in this.$store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    docID: {
      get () {
        let value = this.element['docID']
        return value ? value : ''
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'docID', value })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .c-property-value {
    input.input {
      margin-top: 2px;
      font-size: 9px;
    }
  }

  .my-button {
    position: absolute;
    right: 5px;
    cursor: pointer;
  }

</style>
