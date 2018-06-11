<template lang="pug">
  .x(v-bind:class="[(cPageEditMode=='debug') ? 'ch-columns-outline' : '']")
    .zzz(v-if="cPageEditMode=='debug'")
      .ch-columns-debug {{element.children.length}} columns
    .columns
      // Children are columns (and may not have a type sprecified)
      .column(v-for="child in element.children")
        content-children(:editcontext="editcontext", :element="child")

</template>

<script>

export default {
  name: 'content-columns',
  components: {
  },
  props: {
    editcontext: Object,
    element: Object,
  },
  data: function () {
    return {
    }
  },
  methods: {
    /* itemClick (node) {
      console.log(node.model.text + ' clicked !')
    } */
  },
  computed: {

    cPageEditMode: function () {
      return this.$store.state.contentLayout.mode
    }
  }

}
</script>

<style lang="scss" scoped>
  .ch-columns-outline {
    border: 1px dashed brown;
    margin: 1px;
  }
  .ch-columns-debug {
    background-color: brown;
    color: white;
    font-size: 9px;
    margin-bottom: 1px;
    .my-children-debug-outline {
      //border: dashed 1px green;
      margin: 1px;
    }
  }
</style>
