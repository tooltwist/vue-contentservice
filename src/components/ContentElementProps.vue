<template lang="pug">
  .ch-elem(v-if="sane")
    div(v-if="element")

      // Show the properties for this element
      component(v-if="propertyComponentNameForElement", v-bind:is="propertyComponentNameForElement", :editcontext="editcontext", :element="element")
      div(v-else)
        | Unknown type ({{element.type}})

      // Now show the next level
      content-element-props(v-if="haveMore" :level="level+1")
</template>

<script>
import ContentMixins from '../mixins/ContentMixins'

export default {
  name: 'content-element-props',
  mixins: [ ContentMixins ],
  props: {
    // Index into 'pathToSelectedElement' in our store.
    // 0 = layout
    // Last element in array = our currently selected element
    level: Number,
  },
  data: function () {
    return {

      // Did we pass sanity checks?
      sane: true
    }
  },
  computed: {
    element: function ( ) {
      let path = this.$content.store.state.pathToSelectedElement
      return (path.length > this.level) ? path[this.level] : null
    },

    // Is there another property below this one?
    haveMore: function ( ) {
      let path = this.$content.store.state.pathToSelectedElement
      return path.length > (this.level + 1)
    },

    propertyComponentNameForElement: function () {
      console.log(`propertyComponentNameForElement(${this.element.type})`);
      let type = this.element.type
      let def = this.$content.getLayoutType(type)
      return def ? def.propertyComponentName : null
    }

  },
  created: function () {

    // Sanity check
    if (!this.$content) {
      console.error(`ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?`);
      this.sane = false
      return
    }
  }
}
</script>

<style lang="scss">
</style>
