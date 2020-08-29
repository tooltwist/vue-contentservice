<template lang="pug">
  .c-property-bar-icons
    // Clipboard. See https://www.npmjs.com/package/v-clipboard
    span(v-clipboard="myElementCutToClipboard" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler")
      | &nbsp;
      .c-property-element-header-icon.c-icon-cut
      | &nbsp;
    span(@click="downloadMyElement")
      | &nbsp;
      .c-property-element-header-icon.c-icon-download
      | &nbsp;
    span(v-clipboard="myElementCopyToClipboard" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler")
      | &nbsp;
      .c-property-element-header-icon.c-icon-copy
      | &nbsp;
    span(@click="deleteMyElement")
      | &nbsp;
      .c-property-element-header-icon.c-icon-trash
      | &nbsp;
</template>

<script>
import PropertyMixins from '../mixins/PropertyMixins'
import CutAndPasteMixins from '../mixins/CutAndPasteMixins'

export default {
  name: 'property-bar-icons',
  mixins: [ PropertyMixins, CutAndPasteMixins ],
  props: {
    element: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
