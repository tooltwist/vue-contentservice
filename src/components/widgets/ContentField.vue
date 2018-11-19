<template lang="pug">

  .content-field(v-bind:class="[editModeClass, (pageEditMode=='debug') ? 'tt-field-outline' : '']")

    // Debug mode
    .tt-field(v-if="isDesignMode", @click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | field
      .field
        .label {{protectedLabel}}
        .control
          input.input(type="text", :placeholder="protectedPlaceholder", readonly)
        p.help {{protectedHelp}}

    // Edit mode
    .tt-field(v-else-if="isEditMode", @click.stop="selectThisElement")
      .field
        .label {{protectedLabel}}
        .control
          input.input(type="text", :placeholder="protectedPlaceholder", readonly)
        p.help {{protectedHelp}}

    // Live
    .field(v-else)
      .label {{protectedLabel}}
      .control
        input.input(type="text", :placeholder="protectedPlaceholder")
      p.help {{protectedHelp}}

</template>

<script>
import ProtectedTooltwistField from '../../lib/ProtectedTooltwistField.js'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import ContentMixins from '../../mixins/ContentMixins'
import EditBarIcons from '../EditBarIcons'


export default {
  name: 'content-field',
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
    ...ProtectedTooltwistField('label'),
    ...ProtectedTooltwistField('placeholder'),
    ...ProtectedTooltwistField('help'),
  }
}
</script>

<style lang="scss" scoped>

  $frame-color: #ccc;
  $text-color: black;

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

  .tt-field {
    margin-bottom: 10px;
  }

</style>
