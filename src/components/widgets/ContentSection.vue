<template lang="pug">

  .content-section(v-bind:class="[(pageEditMode=='debug') ? 'my-outline' : '']")

    // Debug mode
    template(v-if="pageEditMode==='debug'", v-on:click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | section
      .section.section
        content-children.my-content(:editcontext="editcontext", :element="element")

    // Edit mode
    .section.section(v-else-if="pageEditMode==='edit'", v-on:click.stop="selectThisElement")
      content-children(:editcontext="editcontext", :element="element")

    // Live
    .section.section(v-else)
      content-children(:editcontext="editcontext", :element="element")
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
    editcontext: Object,
    element: Object,
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
