<template lang="pug">
  div
    .tt-property-header Columns
    // {{element.id}}
    .columns
      .column.c-property-label Columns
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
