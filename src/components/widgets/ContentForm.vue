<template lang="pug">

  .content-form(v-bind:class="editModeClass")

    // Debug mode
    div(v-if="isPageMode('debug')", @click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | form
      content-children.my-content(:editcontext="editcontext", :element="element")

    // Edit mode
    div(v-else-if="isPageMode('edit')", @click.stop="selectThisElement")
      content-children(:editcontext="editcontext", :element="element")

    // Preview mode
    div(v-else-if="isPageMode('view')", @click.stop="selectThisElement")
      content-children(:editcontext="editcontext", :element="element")

    // Live
    form.form(v-else)
      content-children(:editcontext="editcontext", :element="element")

</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from './EditBarIcons'

export default {
  name: 'content-form',
  components: {
    EditBarIcons
  },
  props: {
    editcontext: Object,
    element: Object,
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
