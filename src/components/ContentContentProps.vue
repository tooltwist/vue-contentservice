<template lang="pug">
  div
    .tt-property-header Content
    .c-element-properties
      .tt-property
        .c-property-label ID
        .c-property-value {{element.id}}
    .tt-property-footer
</template>

<script>
export default {
  name: 'content-content-props',
  props: {
    element: Object
  }
}
</script>
