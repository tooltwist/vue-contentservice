<template lang="pug">
  div
    .tt-property-header
      .my-button(@click="deleteElement") D
      | Google Slides
    // {{element.id}}
    .tt-properties
      .tt-property
        .tt-property-label doc ID
        .tt-property-value
          input.input(v-model="docID")

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
    docID: {
      get () {
        let value = this.element['docID']
        return value ? value : '-'
      },
      set (value) {
        this.$store.dispatch('contentLayout/setProperty', { vm: this, element: this.element, name: 'docID', value })
      }
    },
  },
  methods: {
    deleteElement ( ) {
      console.log(`Delete element ${this.element.id}`)
      this.$store.dispatch('contentLayout/deleteElement', { vm: this, element: this.element })
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

  .my-button {
    position: absolute;
    right: 5px;
    cursor: pointer;
  }

</style>
