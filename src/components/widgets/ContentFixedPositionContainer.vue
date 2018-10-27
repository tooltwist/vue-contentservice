<template lang="pug">


  .c-content-container(v-bind:class="editModeClass")

    // Edit mode
    .container(v-if="pageEditMode==='edit'", @click.stop="selectThisElement")
      content-children(:editcontext="editcontext", :element="element")

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", @click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | container
      .container
        content-children.my-content(:editcontext="editcontext", :element="element")

    // Live
    .container(v-else)
      content-children(:editcontext="editcontext", :element="element")
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from '../EditBarIcons'

export default {
  name: 'content-fixed-position-container',
  components: {
    EditBarIcons
  },
  props: {
    editcontext: Object,
    element: Object,
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
  @import '../../assets/css/content-variables.scss';

  $frame-color: lightgreen;
  $text-color: darkgreen;

  .c-edit-mode-debug {
    border-left: dashed 2px $frame-color;
    border-bottom: dashed 2px $frame-color;
    border-right: dashed 2px $frame-color;
    margin: 1px;

    .container {
      width: 90% !important;
    }
  }
  .c-layout-mode-heading {
    // This overrides the definition in content-editor.scss
    background-color: $frame-color;
    color: $text-color;
  }
  .my-content {
    background-color: white;
  }
</style>
