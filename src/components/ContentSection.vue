<template lang="pug">

  .tt-section(v-bind:class="[(pageEditMode=='debug') ? 'tt-section-outline' : '']")
    //| SECTION {{this.editcontext}}
    //br

    // Preview mode
    .section.section(v-if="pageEditMode==='view'")
      content-children(:editcontext="editcontext", :element="element")

    // Edit mode
    .section.section(v-else-if="pageEditMode==='edit'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Debug mode
    .section.section(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .tt-section-debug-heading section
      content-children(:editcontext="editcontext", :element="element")

    // Live
    .section.section(v-else)
      content-children(:editcontext="editcontext", :element="element")



</template>

<script>
import copyStyle from '../lib/copyStyle.js'
import ContentMixins from '../mixins/ContentMixins'

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
      copyStyle(this.element, style, 'background-color')
      copyStyle(this.element, style, 'padding')
      copyStyle(this.element, style, 'padding-top')
      copyStyle(this.element, style, 'padding-bottom')
      copyStyle(this.element, style, 'padding-left')
      copyStyle(this.element, style, 'padding-right')
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
  .tt-section {
    .tt-section-outline {
      border: dashed 1px lightblue;
      margin: 1px;
    }
    .tt-section-debug-heading {
      background-color: lightblue;
      font-size: 9px;
      color: blue;
      margin-bottom: 1px;
    }
  }
</style>
