<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      | Section

    transition(name="c-property-list-transition")
      .c-element-properties(v-show="isExpandedElement")

</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-section-props',
  mixins: [ PropertyMixins ],
  props: {
    element: Object
  }
}
</script>
