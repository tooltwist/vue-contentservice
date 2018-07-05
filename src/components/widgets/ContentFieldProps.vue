<template lang="pug">
  div
    .tt-property-header
      | Field
    .tt-properties
      string-property(:element="element", property="label", label="Label")
      string-property(:element="element", property="placeholder", label="Placeholder")
      string-property(:element="element", property="help", label="Help message")

</template>

<script>
import StringProperty from '../propertyTypes/StringProperty'

export default {
  name: 'content-field-props',
  components: {
    StringProperty
  },
  props: {
    element: Object
  },
}
</script>

<style lang="scss" scoped>
</style>
