<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      | Form

    transition(name="c-property-list-transition")
      .c-element-properties(v-show="isExpandedElement")
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
  },
}
</script>

<style lang="scss" scoped>
</style>
