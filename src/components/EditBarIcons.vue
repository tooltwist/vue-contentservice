<template lang="pug">
  .c-heading-icons(v-if="sane")
    span(v-clipboard="myElementCutToClipboard" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler")
      | &nbsp;
      i.fa.fa-cut.fas.fa-cut
      | &nbsp;
    span(v-clipboard="myElementCopyToClipboard" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler")
      | &nbsp;
      i.fa.fa-files-o.fas.fa-copy
      | &nbsp;
    span(@click.stop="downloadMyElement")
      | &nbsp;
      i.fa.fa-download.fas.fa-download
      | &nbsp;
    span(@click.stop="deleteMyElement")
      | &nbsp;
      i.fa.fa-trash-o.fas.fa-trash-alt
      | &nbsp;
</template>

<script>
import ContentMixins from '../mixins/ContentMixins'
import CutAndPasteMixins from '../mixins/CutAndPasteMixins'


export default {
  name: 'edit-bar-icons',
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

      // Did we pass sanity checks?
      sane: true
    }
  },

  computed: {

    useCrowdhound () {
      //return true
      return typeof(this.contentId) != 'undefined'
    },

  },
  methods: {

  },
  created: function () {

    // Sanity check
    if (!this.$content) {
      console.error(`ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?`);
      this.sane = false
      return
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
