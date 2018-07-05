<template lang="pug">

  div(v-bind:class="[(pageEditMode=='debug') ? 'my-outline' : '']")
    //| SECTION {{this.editcontext}}
    //br

    // Preview mode
    .section.section(v-if="pageEditMode==='view'")
      content-children(:editcontext="editcontext", :element="element")

    // Edit mode
    .section.section(v-else-if="pageEditMode==='edit'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .my-debug-heading section
      .section.section
        content-children.my-content(:editcontext="editcontext", :element="element")

    // Live
    .section.section(v-else)
      content-children(:editcontext="editcontext", :element="element")



</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'

export default {
  name: 'content-section',
  components: {
  },
  props: {
    editcontext: Object,
    element: Object,
  },
  mixins: [
    ContentMixins
  ],
  computed: {

    sectionStyle: function () {
      let style = { }
      this.copyStyle(this.element, style, 'background-color')
      this.copyStyle(this.element, style, 'padding')
      this.copyStyle(this.element, style, 'padding-top')
      this.copyStyle(this.element, style, 'padding-bottom')
      this.copyStyle(this.element, style, 'padding-left')
      this.copyStyle(this.element, style, 'padding-right')
      return style
    }
  },
  methods: {
    select (element) {
      console.log('Section.select()')
      if (this.pageEditMode != 'view') {
        this.$store.commit('contentLayout/setPropertyElement', { element })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/content-variables.scss';

  .my-outline {
    border-left: dashed 2px lightblue;
    border-bottom: dashed 2px lightblue;
    border-right: dashed 2px lightblue;
    margin: 1px;
    background-color: #f9fdff;
  }
  .my-debug-heading {
    height: $c-heading-height;
    line-height: $c-heading-height;
    background-color: lightblue;
    font-size: $c-heading-font-size;
    color: blue;
    margin-bottom: 1px;
  }
  .my-content {
    background-color: white;
  }

</style>
