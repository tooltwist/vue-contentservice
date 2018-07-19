<template lang="pug">
  div
    .tt-property-header Form
    // {{element.id}}
    .c-element-properties
      .tt-property
        .c-property-label ID
        .c-property-value {{element.id}}

</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-form-props',
  mixins: [ PropertyMixins ],
  props: {
    element: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
