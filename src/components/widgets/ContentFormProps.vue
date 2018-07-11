<template lang="pug">
  div
    .tt-property-header Form
    // {{element.id}}
    .tt-properties
      .tt-property
        .tt-property-label ID
        .tt-property-value {{element.id}}

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
