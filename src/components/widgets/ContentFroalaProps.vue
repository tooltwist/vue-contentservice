<template lang="pug">
  div
    .tt-property-header RichText
    .tt-properties
      .tt-property
        .tt-property-label classes
        .tt-property-value {{element.classes}}

</template>

<script>
export default {
  name: 'content-froala-props',
  props: {
    element: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
