<template lang="pug">
  div
    .tt-property-header Content
    .tt-properties
      .tt-property
        .tt-property-label ID
        .tt-property-value {{element.id}}
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
