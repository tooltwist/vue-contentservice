<template lang="pug">

  //.tt-form.tt-form-outline(v-bind:class="[(cPageEditMode=='debug') ? 'tt-element-outline' : '']")
  .x
    //| FORM
    //br

    // Preview mode
    .tt-form(v-if="cPageEditMode==='view'")
      content-children(:editcontext="editcontext", :element="element")

    // Edit mode
    .tt-form(v-else-if="cPageEditMode==='edit'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Debug mode
    .x(v-else-if="cPageEditMode==='debug'", v-on:click.stop="select(element)")
      .tt-form-debug-heading form
      .tt-form
        content-children(:editcontext="editcontext", :element="element")

    // Live
    .tt-form(v-else)
      content-children(:editcontext="editcontext", :element="element")

</template>

<script>
import copyStyle from '../lib/copyStyle.js'

export default {
  name: 'content-form',
  props: {
    editcontext: Object,
    element: Object,
  },
  data: function () {
    return {
      'editing': false
    }
  },
  methods: {
    itemClick (node) {
      // console.log('clicked !')
      if (this.cPageEditMode != 'edit') {
        this.editing = false
      } else {
        this.editing = !this.editing
      }
    },

    // Select this element
    select (element) {
      console.log('Form.select()')

      if (this.cPageEditMode != 'view') {
        this.$store.commit('contentLayout/setPropertyElement', { element })
      }
    }
  },
  computed: {

    cPageEditMode: function () {
      return this.$store.state.contentLayout.mode
    },

    textStyle: function () {
      var style = { }
      if (this.cPageEditMode == 'edit') {
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
.tt-form-debug-heading {
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
}

.tt-form {
  margin: 50px;
  border: solid 1px black;
  padding: 30px;
  text-align: left;
}
</style>
