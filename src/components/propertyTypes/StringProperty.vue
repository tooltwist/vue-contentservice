<template lang="pug">
  .tt-property
    .c-property-label
      | {{label}}
    .c-property-value
      input.input.tt-string-input(v-model="value")
</template>


<script>
export default {
  name: 'stringProperty',
  props: {
    label: String,
    element: Object,
    property: String,
  },
  computed: {

    value: {
      get () {
        return this.element[this.property]
      },
      set (value) {
        //console.log('-->' + this.property + ' <<< ' + value)
        this.$content.setProperty({ vm: this, element: this.element, name: this.property, value })

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
