<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      | Content

    transition(name="c-property-list-transition")
      .c-element-properties(v-show="isExpandedElement")
        .tt-property
          .c-property-label ID
          .c-property-value {{element.id}}
</template>

<script>
export default {
  name: 'content-content-props',
  props: {
    element: Object
  }
}
</script>
