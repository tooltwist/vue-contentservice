<template lang="pug">

  .ch-elem
    div(v-if="element")
      //| {{element.type}} {{element.id}}
      // | [type:{{element.type}} children:{{element.children && element.children.length}}]
      content-section-props(v-if="element.type=='section'", :element="element")
      content-container-props(v-else-if="element.type=='container'", :element="element")
      content-columns-props(v-else-if="element.type=='columns'", :element="element")
      // content-children-props(v-else-if="element.type=='children'", :element="element")
      content-text-props(v-else-if="element.type=='text'", :element="element")
      content-form-props(v-else-if="element.type=='form'", :element="element")
      content-field-props(v-else-if="element.type=='field'", :element="element")
      content-froala-props(v-else-if="element.type=='froala'", :element="element")
      // content-intellidox-props(v-else-if="element.type=='ix'", :element="element")
      //content-layout-props(v-else-if="element.type=='layout'", :element="element")
      // span(v-else)
      //  | skipping '{{element.type}}'

      content-google-slides-props(v-else-if="element.type=='google-slides'", :element="element")


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
  computed: {
    element: function ( ) {
      let path = this.$store.state.contentLayout.pathToSelectedElement
      return (path.length > this.level) ? path[this.level] : null
    },

    // Is there another property below this one?
    haveMore: function ( ) {
      let path = this.$store.state.contentLayout.pathToSelectedElement
      return path.length > (this.level + 1)
    },
  }
}
</script>

<style lang="scss">
</style>
