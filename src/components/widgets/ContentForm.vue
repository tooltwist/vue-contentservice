<template lang="pug">

  .content-form(v-bind:class="editModeClass")

    // Design mode
    div(v-if="isDesignMode", @click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | form
      content-children.my-content(:element="element", :context="context")

    // Editing
    div(v-else-if="isEditMode", @click.stop="selectThisElement")
      content-children(:element="element", :context="context")

    // Live
    form.form(v-else)
      content-children(:element="element", :context="context")
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'

export default {
  name: 'content-form',
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
  data: function () {
    return {
      //- 'editing': false
    }
  },
  computed: {

    //- textStyle: function () {
    //-   var style = { }
    //-   if (this.pageEditMode == 'edit') {
    //-     style['cursor'] = 'pointer'
    //-   }
    //-   if (this.editing) {
    //-     style['color'] = 'magenta'
    //-   }
    //-   copyStyle(this.element, style, 'color')
    //-   copyStyle(this.element, style, 'font-family')
    //-   copyStyle(this.element, style, 'font-size')
    //-   return style
    //- }
  }
}
</script>

<style lang="scss" scoped>
  $header-color: #55f;
  $header-text-color: white;
  $shading-color: lightblue;

  $frame-color: #55f;
  $text-color: white;
  $shading-color: #eef;

  .c-layout-mode-heading {
    // This extends the definition in content-editor.scss
    background-color: $frame-color;
    color: $text-color;
  }

  .c-edit-mode-debug  {
    border-left: dashed 2px $frame-color;
    border-bottom: dashed 2px $frame-color;
    border-right: dashed 2px $frame-color;
    margin: 1px;
  }

  .my-content {
    background-color: $shading-color;
    text-align: left;
    padding-left: 5px;
  }

</style>
