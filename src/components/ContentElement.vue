<template lang="pug">

  .tt-element
    //| content-element
    //br
    //div(v-if="componentNameForElement")
    //  | KNOW TYPE ({{element.type}} => {{componentNameForElement}})
    //div(v-else)
    //  | Don't know type {{element.type}}

    component(v-if="componentNameForElement", v-bind:is="componentNameForElement", :editcontext="editcontext", :element="element")

    // | [type:{{element.type}} children:{{element.children && element.children.length}}]
    //content-section(v-else-if="element.type=='section'", :editcontext="editcontext", :element="element")
    //content-container(v-else-if="element.type=='container'", :editcontext="editcontext", :element="element")
    //content-columns(v-else-if="element.type=='columns'", :editcontext="editcontext", :element="element")
    //content-children(v-else-if="element.type=='children'", :editcontext="editcontext", :element="element")
    //content-documents(v-else-if="element.type=='documents'", :editcontext="editcontext", :element="element")
    ////- content-text(v-else-if="element.type=='text'", :editcontext="editcontext", :element="element")

    ////content-text(v-else-if="element.type=='text'", :editcontext="editcontext", :element="element")

    //// https://vuejs.org/v2/guide/components-dynamic-async.html
    //component(v-else-if="element.type=='text'", v-bind:is="'content-text'", :editcontext="editcontext", :element="element")

    //content-form(v-else-if="element.type=='form'", :editcontext="editcontext", :element="element")
    //content-field(v-else-if="element.type=='field'", :editcontext="editcontext", :element="element")
    //content-html(v-else-if="element.type=='froala'", :editcontext="editcontext", :element="element", :ZcontentId="'zzz'")
    //content-intellidox(v-else-if="element.type=='ix'", :editcontext="editcontext", :element="element")
    div(v-else)
      | Unknown element type '{{element.type}}'


</template>

<script>

export default {
  name: 'content-element',
  props: {
    editcontext: Object,
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
