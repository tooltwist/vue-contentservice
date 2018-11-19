<template lang="pug">
  .c-content-columns(:class="editModeClass")

    template(v-if="isDesignMode")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | columns

    .columns
      // Children are columns (and may not have a type sprecified)
      .column(v-for="child in element.children")
        content-children(:element="child", :context="context", )
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from '../EditBarIcons'

export default {
  name: 'content-columns',
  components: {
    EditBarIcons
  },
  props: {
    element: Object,

    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    },
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
