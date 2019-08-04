<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      property-bar-icons(v-if="isExpandedElement", :element="element")
      | RichText

    transition(name="c-property-list-transition")
      .c-element-properties(v-show="isExpandedElement")
        //.tt-property
          .c-property-label classes
          .c-property-value {{element.classes}}
        .tt-property
          .c-property-label Style
          .c-property-value
            input.input(v-model="style")
        .tt-property
          .c-property-label Class
          .c-property-value
            input.input(v-model="clas")
</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-froala-props',
  mixins: [ PropertyMixins ],
  props: {
    element: Object
  },
  computed: {
    style: {
      get () {
        let value = this.element['style']
        return value ? value : ''
      },
      set (value) {
        this.$content.setProperty({ vm: this, element: this.element, name: 'style', value })
      }
    },
    clas: {
      get () {
        let value = this.element['class']
        return value ? value : ''
      },
      set (value) {
        this.$content.setProperty({ vm: this, element: this.element, name: 'class', value })
      }
    },
  }//- computed
}
</script>

<style lang="scss" scoped>
</style>
