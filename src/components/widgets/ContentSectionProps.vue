<template lang="pug">
  div
    .tt-property-header Section
    // {{element.id}}
    .c-element-properties

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
