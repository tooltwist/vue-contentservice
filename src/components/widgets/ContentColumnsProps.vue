<template lang="pug">
  div
    .tt-property-header Columns
    // {{element.id}}
    .columns
      .column.tt-property-label Columns
      .column.tt-property-value {{element.children.length}}
</template>

<script>
export default {
  name: 'content-columns-props',
  props: {
    element: Object
  }
}
</script>
