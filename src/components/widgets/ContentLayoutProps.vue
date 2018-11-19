<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      .my-button
        // handle font-awesome 4 and 5
        // Clipboard. See https://www.npmjs.com/package/v-clipboard
        span(@click="downloadMyElement")
          | &nbsp;
          i.fa.fa-download.fas.fa-download
          | &nbsp;
        span(v-clipboard="myElementCopyToClipboard" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler")
          | &nbsp;
          i.fa.fa-files-o.fas.fa-copy
          | &nbsp;
        span(@click="deleteMyElement")
          | &nbsp;
          i.fa.fa-trash-o.fas.fa-trash-alt
          | &nbsp;
      | Layout
    //- .my-restore
    //-   | drop here to restore layout

</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'

export default {
  name: 'content-layout-props',
  mixins: [ PropertyMixins, CutAndPasteMixins ],
  computed: {

    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    protectedMode: {
      get () {
        let value = this.element['mode']
        return value ? value : '-'
      },
      set (value) {
        this.$content.setProperty({ vm: this, element: this.element, name: 'mode', value })
      }
    },
    protectedIsFluid: {
      get () {
        let value = this.element['is-fluid']
        return value ? value : '-'
      },
      set (value) {
        this.$content.setProperty({ vm: this, element: this.element, name: 'is-fluid', value })
      }
    },
    protectedBgColor: {
      get () {
        let value = this.element['background-color']
        return value ? value : '-'
      },
      set (value) {
        this.$content.setProperty({ vm: this, element: this.element, name: 'background-color', value })
      }
    }
  }
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

  .my-restore {
    display: block;
    min-height: 15px;
    //height:
    font-size: 10px;
  }
</style>
