<template lang="pug">
  div
    .tt-property-header RichText
    .tt-properties
      .tt-property
        .tt-property-label classes
        .tt-property-value {{element.classes}}

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
