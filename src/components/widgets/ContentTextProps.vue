<template lang="pug">
  div
    .tt-property-header Text
    .tt-properties
      .tt-property
        .tt-property-label color
        .tt-property-value {{value('color')}}
      .tt-property
        .tt-property-label font-family
        .tt-property-value {{value('font-family')}}
      .tt-property
        .tt-property-label font-size
        .tt-property-value {{value('font-size')}}

</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-text-props',
  mixins: [ PropertyMixins ],
  props: {
    element: Object
  },
  methods: {

    // Display a property value
    value (name) {
      let value = this.element[name]
      return (value ? value : '-')
    }
  }
}
</script>
