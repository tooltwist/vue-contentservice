<template lang="pug">
  div
    .tt-property-header Container
    // {{element.id}}
    .tt-properties
      .tt-property
        .tt-property-label Type
        .tt-property-value
          select(v-model="protectedIsFluid")
            option() navbar
            option() hero
            option() section
            option() footer
      .tt-property
        .tt-property-label
        .tt-property-value
          label.checkbox
            input(type="checkbox" v-model="protectedIsFluid")
            | &nbsp;full width
      .tt-property
        .tt-property-label Background
        .tt-property-value
          input.input(v-model="protectedBgColor")

</template>

<script>
export default {
  name: 'content-container-props',
  props: {
    element: Object
  },
  computed: {

    // We cannot update the element directly - it is stored
    // in this.$store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    protectedMode: {
      get () {
        let value = this.element['mode']
        return value ? value : '-'
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'mode', value })
      }
    },
    protectedIsFluid: {
      get () {
        let value = this.element['is-fluid']
        return value ? value : '-'
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'is-fluid', value })
      }
    },
    protectedBgColor: {
      get () {
        let value = this.element['background-color']
        return value ? value : '-'
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'background-color', value })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tt-property-value {
  input.input {
    margin-top: 2px;
    font-size: 9px;
  }
}
</style>
