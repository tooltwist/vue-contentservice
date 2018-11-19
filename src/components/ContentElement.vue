<template lang="pug">

  .tt-element
    component(v-if="componentNameForElement", v-bind:is="componentNameForElement", :context="context", :element="element")
    div(v-else)
      | Unknown element type '{{element.type}}'
</template>

<script>

export default {
  name: 'content-element',
  props: {
    // The context provides a means for a container to pass information down to it's children
    context: {
      type: Object,
      required: true
    },

    element: Object,
  },
  computed: {
    componentNameForElement: function () {
      let type = this.element.type
      let def = this.$content.getLayoutType(type)
      return def ? def.componentName : null
    }
  },
}
</script>

<style lang="scss">
.ch-elem {
  // display: block;
  // width: 100px;
  // min-height: 100px;
  // background-color: #f0f0f0;
  color: gray;
}
</style>
