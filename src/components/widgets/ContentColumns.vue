<template lang="pug">
  .c-content-columns(:class="editModeClass")

    template(v-if="isDesignMode")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | columns

    .columns(v-if="isDesignMode", @click.stop="selectThisElement")
      // Children are columns (and may not have a type sprecified)
      .column(v-for="child,index in element.children")
        .c-content-column(:class="editModeClass")
          .c-layout-mode-heading
            .c-editbar-icons
              span(v-if="index > 0", @click.stop="shiftLeft(index)")
                | &nbsp;
                .c-editbar-icon.c-icon-left
                | &nbsp;
              span(v-if="index < element.children.length - 1", @click.stop="shiftRight(index)")
                | &nbsp;
                .c-editbar-icon.c-icon-right
                | &nbsp;
              span(@click.stop="addColumn(index)")
                | &nbsp;
                .c-editbar-icon.c-icon-plus
                | &nbsp;
              span(@click.stop="deleteColumn(index)")
                | &nbsp;
                .c-editbar-icon.c-icon-trash
                | &nbsp;
            | column
          content-children(:element="child", :context="context")

    .columns(v-else, @click.stop="selectThisElement")
      .column(v-for="child,index in element.children")
        content-children(:element="child", :context="context")
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
  methods: {

    shiftLeft: function(index) {
      this.$content.moveChild({ vm: this, parent: this.element, from: index, to: index - 1 })
    },

    shiftRight: function(index) {
      this.$content.moveChild({ vm: this, parent: this.element, from: index, to: index + 1 })
    },

    addColumn: function(index) {
      let insertContent = {
        type: "contentservice.io",
        version: "1.0",
        source: "toolbox",
        layout: {
          type: 'panelWithoutProperties',
          children: [ ]
        }
      }
      this.$content.insertLayout({ vm: this, parent: this.element, position: index+1, layout: insertContent })
    },

    deleteColumn: function(index) {

      // Confirm first
      let result = confirm(`Are you sure you want to delete this column?`);
      if (result) {

        // Delete the column
        let child = this.element.children[index]
        this.$content.deleteElement({ vm: this, element: child })
      }
    },
  }
}
</script>

<style lang="scss" scoped>

  .c-content-columns {
    $frame-color: rgba(170, 230, 160, 1.0);
    $border-color: rgba(0, 100, 0, 0.5);
    $text-color: black;

    .c-layout-mode-heading {
      // This overrides the definition in content-editor.scss
      background-color: $frame-color;
      color: $text-color;
    }

    &.c-edit-mode-debug {
      //border-top: solid 1px $frame-color;
      border-left: dashed 2px $border-color;
      border-bottom: dashed 2px $border-color;
      border-right: dashed 2px $border-color;
      margin: 1px;
    }
  }

  .c-content-column {
    $frame-color: rgba(120, 180, 100, 1.0);
    $border-color: rgba(0, 50, 0, 0.5);
    $text-color: black;

    .c-layout-mode-heading {
      // This overrides the definition in content-editor.scss
      background-color: $frame-color;
      color: $text-color;
    }

    &.c-edit-mode-debug {
      //border: none;
      //border-top: solid 1px $border-color;
      border-left: dashed 2px $border-color;
      border-bottom: dashed 2px $border-color;
      border-right: dashed 2px $border-color;
      margin: 1px;
    }
  }
</style>
