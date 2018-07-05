<template lang="pug">

  .tt-form.tt-form-outline(v-bind:class="[(pageEditMode=='debug') ? 'my-outline' : '']")

    // Preview mode
    .tt-form(v-if="pageEditMode==='view'")
      content-children(:editcontext="editcontext", :element="element")

    // Edit mode
    .tt-form(v-else-if="pageEditMode==='edit'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .my-debug-heading form
      .tt-form
        content-children.my-content(:editcontext="editcontext", :element="element")

    // Live
    form.form(v-else)
      content-children(:editcontext="editcontext", :element="element")

</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'


export default {
  name: 'content-form',
  props: {
    editcontext: Object,
    element: Object,
  },
  mixins: [
    ContentMixins
  ],
  data: function () {
    return {
      'editing': false
    }
  },
  methods: {
    itemClick (node) {
      // console.log('clicked !')
      if (this.pageEditMode != 'edit') {
        this.editing = false
      } else {
        this.editing = !this.editing
      }
    },

    // Select this element
    select (element) {
      console.log('Form.select()')

      if (this.pageEditMode != 'view') {
        this.$store.commit('contentLayout/setPropertyElement', { element })
      }
    }
  },
  computed: {

    textStyle: function () {
      var style = { }
      if (this.pageEditMode == 'edit') {
        style['cursor'] = 'pointer'
      }
      if (this.editing) {
        style['color'] = 'magenta'
      }
      copyStyle(this.element, style, 'color')
      copyStyle(this.element, style, 'font-family')
      copyStyle(this.element, style, 'font-size')
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/content-variables.scss';


  /* .tt-form-debug-heading {
    background-color: #55f;
    color: white;
    font-size: 9px;
  }
  .tt-form-outline {
    border: dashed 1px #55f;
    margin: 2px;
    padding: 2px;
  }
  .my-text {

  }
  .my-input {
    width: 100%;
  } */

  /* .tt-form {
    margin: 50px;
    border: solid 1px black;
    padding: 30px;
    text-align: left;
  } */

  $header-color: #55f;
  $header-text-color: white;
  $shading-color: lightblue;


  .my-outline {
    border-left: dashed 2px lightblue;
    border-bottom: dashed 2px lightblue;
    border-right: dashed 2px lightblue;
    margin: 1px;
    background-color: $shading-color;
  }
  .my-debug-heading {
    height: $c-heading-height;
    line-height: $c-heading-height;
    font-size: $c-heading-font-size;
    margin-bottom: 1px;
    background-color: $header-color;
    color: $header-text-color;
  }
  .my-content {
    background-color: white;
  }

</style>
