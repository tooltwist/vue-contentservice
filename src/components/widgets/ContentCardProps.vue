<template lang="pug">
  .c-property-element(:class="propertyClass")
    .tt-property-header(@click="setExpandedElement")
      | Card

      transition(name="c-property-list-transition")
      .c-element-properties(v-if="isExpandedElement")
        .tt-property
          .c-property-label doc ID
          .c-property-value
            input.input(v-model="docID")

</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-card-props',
  mixins: [ PropertyMixins ],
  computed: {

    // We cannot update the element directly - it is stored
    // in this.$content.store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    docID: {
      get () {
        let value = this.element['docID']
        return value ? value : ''
      },
      set (value) {
        this.$content.setProperty({ vm: this, element: this.element, name: 'docID', value })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
