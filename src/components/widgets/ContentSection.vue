<template lang="pug">

  .content-section(v-bind:class="[(pageEditMode=='debug') ? 'my-outline' : '']")

    // Debug mode
    template(v-if="pageEditMode==='debug'", v-on:click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | section
      .section.section
        content-children.my-content(:element="element", :context="context")

    // Edit mode
    .section.section(v-else-if="pageEditMode==='edit'", v-on:click.stop="selectThisElement")
      content-children(:element="element", :context="context")

    // Live
    .section.section(v-else)
      content-children(:element="element", :context="context")
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from '../EditBarIcons'

export default {
  name: 'content-section',
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
  computed: {

    //- sectionStyle: function () {
    //-   let style = { }
    //-   this.copyStyle(this.element, style, 'background-color')
    //-   this.copyStyle(this.element, style, 'padding')
    //-   this.copyStyle(this.element, style, 'padding-top')
    //-   this.copyStyle(this.element, style, 'padding-bottom')
    //-   this.copyStyle(this.element, style, 'padding-left')
    //-   this.copyStyle(this.element, style, 'padding-right')
    //-   return style
    //- }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/content-variables.scss';

  $frame-color: lightblue;
  $text-color: blue;

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

  .my-content {
    background-color: white;
  }
</style>
