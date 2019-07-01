<template lang="pug">

  .c-content-container(v-bind:class="editModeClass")

    // Debug mode
    div(v-if="pageEditMode==='debug'", @click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | container
      .container
        content-children.my-content(:element="element", :context="context")

    // Edit mode
    .container(v-else-if="pageEditMode==='edit'", @click.stop="selectThisElement")
      content-children(:element="element", :context="context")

    // Live
    .container(v-else)
      content-children(:element="element", :context="context")
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from '../EditBarIcons'

export default {
  name: 'content-container',
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

    sectionStyle: function () {
      let style = { }
      copyStyle(this.element, style, 'background-color')
      copyStyle(this.element, style, 'padding')
      copyStyle(this.element, style, 'padding-top')
      copyStyle(this.element, style, 'padding-bottom')
      copyStyle(this.element, style, 'padding-left')
      copyStyle(this.element, style, 'padding-right')
      return style
    }
  }
}

/* function copyStyle(from, to, name) {
  if (from[name]) {
    to[name] = from[name]
  }
} */
</script>


<style lang="scss">
  // NOT SCOPED - Application wide definition
  .c-content-container .container {
    width: 90% !important;
  }
</style>

<style lang="scss" scoped>
//   @import '../../assets/css/content-variables.scss';
//
// .c-content-container {
//   $frame-color: red;
//   $text-color: darkgreen;
//
//   .c-edit-mode-debug {
//     border-left: dashed 2px $frame-color;
//     border-bottom: dashed 2px $frame-color;
//     border-right: dashed 2px $frame-color;
//     margin: 1px;
//
//     .container {
//       width: 90% !important;
//     }
//   }
//   .c-layout-mode-heading {
//     // This overrides the definition in vue-contentservice.scss
//     background-color: $frame-color;
//     color: $text-color;
//   }
//   .my-content {
//     background-color: white;
//   }
// }
</style>
