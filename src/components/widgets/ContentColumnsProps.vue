<template lang="pug">
.c-property-element(:class="propertyClass")
  .tt-property-header(@click="setExpandedElement")
    | Columns

  transition(name="c-property-list-transition")
    .c-element-properties(v-if="isExpandedElement")
      .tt-property
        .c-property-label Columns
        .c-property-value
          .column.c-property-value {{element.children.length}}
</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-columns-props',
  mixins: [ PropertyMixins ],
  props: {
    element: Object
  }
}
</script>
