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
      | Google Sheets

    transition(name="fade")
      .c-element-properties(v-if="isExpandedElement")
        .tt-property
          .c-property-label
            | doc ID
          .c-property-value
            input.input(v-model="docID")
        .tt-property(v-show="haveDocId")
          //- .c-property-label-and-value
          .c-property-label Mode
          .c-property-value
            .select
              select(v-model="protectedDisplayMode")
                option(v-if="!published" value="editable") Editable
                option(v-if="!published" value="editable-nomenus") Editable, no menus
                option(v-if="!published" value="editable-dataonly") Editable, no menus/rows/tabs&nbsp;
                option(v-if="!published" value="preview") Preview
                option(v-if="!published" value="preview-notabs") Preview without tabs
                option(v-if="published" value="published") View published sheets
                option(v-if="published" value="published-notabs") View published sheets, no tabs&nbsp;
        .tt-property
          .c-property-label
            | Width
          .c-property-value
            input.input(v-model="protectedWidth", placeholder="default = 1000")
        .tt-property
          .c-property-label
            | Height
          .c-property-value
            input.input(v-model="protectedHeight", placeholder="default = 500")
</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-google-sheets-props',
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
        value = value.trim()
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'docID', value })
      }
    },
    haveDocId: function () {
      let id = this.element['docID']
      if (id) {
        return true
      }
      return false
    },
    published: function () {
      let id = this.element['docID']
      return (id && id.startsWith('2PACX-'))
    },
    protectedDisplayMode: {
      get () {
        let value = this.element['displayMode']
        console.error(`displayMode:`, value);
        return value ? value : 'preview'
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'displayMode', value })
      }
    },
    protectedWidth: {
      get () {
        let value = this.element['width']
        return value
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'width', value })
      }
    },
    protectedHeight: {
      get () {
        let value = this.element['height']
        return value
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'height', value })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .c-property-value {
    padding-right: 3px;
    input.input {
      margin-top: 2px;
      font-size: 9px;
    }
    select {
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
