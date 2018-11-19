<template lang="pug">
  .c-properties-header
    | YARP AND stuff
</template>

<script>
import ContentMixins from '../mixins/ContentMixins'

export default {
  name: 'content-properties-header',
  mixins: [ ContentMixins ],
  // props: {
  //   // Index into 'pathToSelectedElement' in our store.
  //   // 0 = layout
  //   // Last element in array = our currently selected element
  //   level: Number,
  // },
  // data: function () {
  //   return {
  //
  //     // Did we pass sanity checks?
  //     sane: true
  //   }
  // },
  // computed: {
  //   element: function ( ) {
  //     let path = this.$content.store.state.pathToSelectedElement
  //     return (path.length > this.level) ? path[this.level] : null
  //   },
  //
  //   // Is there another property below this one?
  //   haveMore: function ( ) {
  //     let path = this.$content.store.state.pathToSelectedElement
  //     return path.length > (this.level + 1)
  //   },
  //
  //   propertyComponentNameForElement: function () {
  //     console.log(`propertyComponentNameForElement(${this.element.type})`);
  //     let type = this.element.type
  //     let def = this.$content.getLayoutType(type)
  //     return def ? def.propertyComponentName : null
  //   }
  //
  // },
  // created: function () {
  //
  //   // Sanity check
  //   if (!this.$content) {
  //     console.error(`ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?`);
  //     this.sane = false
  //     return
  //   }
  // }
}
</script>

<style lang="scss">
</style>
