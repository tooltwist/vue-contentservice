<template lang="pug">


  .tt-container(v-bind:class="[(cPageEditMode=='debug') ? 'tt-container-outline' : '']")

    // Preview mode
    .container(v-if="cPageEditMode==='view'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Edit mode
    .container(v-else-if="cPageEditMode==='edit'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Debug mode
    .container(v-else-if="cPageEditMode==='debug'", v-on:click.stop="select(element)")
      .tt-container-debug-heading container
      content-children(:editcontext="editcontext", :element="element")

    // Live
    .container(v-else)
      content-children(:editcontext="editcontext", :element="element")


</template>

<script>
import copyStyle from '../lib/copyStyle.js'

export default {
  name: 'content-container',
  components: {
  },
  props: {
    editcontext: Object,
    element: Object,
  },
  data: function () {
    return {
    }
  },
  computed: {

    cPageEditMode: function () {
      return this.$store.state.contentLayout.mode
    },

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
      if (this.cPageEditMode != 'view') {
        this.$store.commit('contentLayout/setPropertyElement', { element })
      }
    },
  }
}

/* function copyStyle(from, to, name) {
  if (from[name]) {
    to[name] = from[name]
  }
} */
</script>

<style lang="scss" scoped>
  .tt-container {
  }
  .tt-container-outline {
    border: dashed 1px lightgreen;
    margin: 1px;
  }
  .tt-container-debug-heading {
    background-color: lightgreen;
    font-size: 9px;
    color: green;
    margin-bottom: 1px;
  }
</style>
