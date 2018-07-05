<template lang="pug">
  .x(v-bind:class="[(pageEditMode=='debug') ? 'my-columns-outline' : '']")
    .zzz(v-if="pageEditMode=='debug'")
      //- .my-columns-debug {{element.children.length}} columns
      .my-columns-debug columns
    .columns
      // Children are columns (and may not have a type sprecified)
      .column(v-for="child in element.children")
        content-children(:editcontext="editcontext", :element="child")

</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'

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
  @import '../../assets/css/content-variables.scss';

  .my-columns-outline {
    border-left: 2px dashed darkgreen;
    border-right: 2px dashed darkgreen;
    border-bottom: 2px dashed darkgreen;
    margin: 1px;
    padding: 1px;
  }
  .my-columns-debug {
    height: $c-heading-height;
    line-height: $c-heading-height;
    background-color: darkgreen;
    font-size: $c-heading-font-size;
    color: lightgreen;
    margin-bottom: 1px;
  }

</style>
