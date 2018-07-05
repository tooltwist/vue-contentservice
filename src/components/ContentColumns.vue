<template lang="pug">
  .x(v-bind:class="[(pageEditMode=='debug') ? 'ch-columns-outline' : '']")
    .zzz(v-if="pageEditMode=='debug'")
      .ch-columns-debug {{element.children.length}} columns
    .columns
      // Children are columns (and may not have a type sprecified)
      .column(v-for="child in element.children")
        content-children(:editcontext="editcontext", :element="child")

</template>

<script>
import ContentMixins from '../mixins/ContentMixins'

export default {
  name: 'content-columns',
  props: {
    editcontext: Object,
    element: Object,
  },
  mixins: [
    ContentMixins
  ],
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
