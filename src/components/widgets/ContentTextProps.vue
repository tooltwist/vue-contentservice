<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      | Text

    transition(name="c-property-list-transition")
      .c-element-properties(v-show="isExpandedElement")
        .tt-property
          .c-property-label color
          .c-property-value {{value('color')}}
        .tt-property
          .c-property-label font-family
          .c-property-value {{value('font-family')}}
        .tt-property
          .c-property-label font-size
          .c-property-value {{value('font-size')}}
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
