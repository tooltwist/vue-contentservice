<template lang="pug">
  div
    .tt-property-header
      | Field
    .tt-properties
      tt-string-property(:element="element", property="label", label="Label")
      tt-string-property(:element="element", property="placeholder", label="Placeholder")
      tt-string-property(:element="element", property="help", label="Help message")

</template>

<script>

export default {
  name: 'content-field-props',
  props: {
    element: Object
  },
}

</script>

<style lang="scss" scoped>
</style>
