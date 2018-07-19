<template lang="pug">
  div
    .tt-property-header RichText
    .c-element-properties
      .tt-property
        .c-property-label classes
        .c-property-value {{element.classes}}

</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-froala-props',
  mixins: [ PropertyMixins ],
  props: {
    element: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
