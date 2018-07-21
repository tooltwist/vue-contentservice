<template lang="pug">


  .tt-container(v-bind:class="[(pageEditMode=='debug') ? 'tt-container-outline' : '']")

    // Preview mode
    .container(v-if="pageEditMode==='view'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Edit mode
    .container(v-else-if="pageEditMode==='edit'", v-on:click.stop="select(element)")
      content-children(:editcontext="editcontext", :element="element")

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .c-layout-mode-heading
        .c-heading-icons
          i.fa.fa-download.fas.fa-download(@click="downloadMyElement")
          | &nbsp;
          i.fa.fa-files-o.fas.fa-copy(v-clipboard="myElementCopyToClipboard" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler")
          | &nbsp;
          i.fa.fa-trash-o.fas.fa-trash-alt(@click="deleteMyElement")
        | container
      .container
        content-children.my-content(:editcontext="editcontext", :element="element")

    // Live
    .container(v-else)
      content-children(:editcontext="editcontext", :element="element")


</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'

export default {
  name: 'content-container',
  components: {
  },
  props: {
    editcontext: Object,
    element: Object,
  },
  mixins: [ ContentMixins, CutAndPasteMixins ],
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
      if (this.pageEditMode != 'view') {
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
  @import '../../assets/css/content-variables.scss';

  .tt-container-outline {
    border-left: dashed 2px lightgreen;
    border-bottom: dashed 2px lightgreen;
    border-right: dashed 2px lightgreen;
    margin: 1px;
    //- background-color: lightgreen;
    background-color: #f9fdff;
    background-color: #f6fff3;
  }
  .c-layout-mode-heading {
    height: $c-heading-height;
    line-height: $c-heading-height;
    background-color: lightgreen;
    font-size: $c-heading-font-size;
    color: darkgreen;
    margin-bottom: 1px;
  }
  .my-content {
    background-color: white;
  }
</style>
