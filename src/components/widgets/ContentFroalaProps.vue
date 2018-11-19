<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      | RichText

    transition(name="c-property-list-transition")
      .c-element-properties(v-show="isExpandedElement")
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
