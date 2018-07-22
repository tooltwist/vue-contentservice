<template lang="pug">
  .c-content-columns(:class="editModeClass")

    template(v-if="isPageMode('debug')")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | columns

    .columns
      // Children are columns (and may not have a type sprecified)
      .column(v-for="child in element.children")
        content-children(:editcontext="editcontext", :element="child")
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from './EditBarIcons'

export default {
  name: 'content-columns',
  components: {
    EditBarIcons
  },
  props: {
    editcontext: Object,
    element: Object,
  },
  mixins: [ ContentMixins, CutAndPasteMixins ],
}
</script>

<style lang="scss" scoped>

  $frame-color: darkgreen;
  $text-color: white;

  .c-layout-mode-heading {
    // This overrides the definition in content-editor.scss
    background-color: $frame-color;
    color: $text-color;
  }

  .c-edit-mode-debug {
    border-left: dashed 2px $frame-color;
    border-bottom: dashed 2px $frame-color;
    border-right: dashed 2px $frame-color;
    margin: 1px;
  }

</style>
