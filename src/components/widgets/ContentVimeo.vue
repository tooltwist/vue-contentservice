<template lang="pug">


  .c-vimeo(v-bind:class="[ editModeClass, (pageEditMode=='debug') ? 'tt-container-outline' : '']")

    // View mode
    .container(v-if="pageEditMode==='view'")
      // See https://www.ostraining.com/blog/coding/responsive-videos/
      .vimeo-container
        iframe(:src="src" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | vimeo
      .container
        .vimeo-container.my-dummy-iframe

    // Edit, layout modes
    .container(v-else, v-on:click.stop="select(element)")
      .vimeo-container.my-dummy-iframe
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from './EditBarIcons'


export default {
  name: 'content-vimeo',
  components: {
    EditBarIcons
  },
  props: {
    element: Object,
  },
  mixins: [ ContentMixins, CutAndPasteMixins ],
  data: function () {
    return {
      //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl',
    }
  },
  computed: {

    src: function ( ) {
      // let src = `https://docs.google.com/a/tooltwist.com/presentation/d/e/${this.element.docID}/embed?start=false&loop=false&delayms=3000`
      //let src = `https://docs.google.com/presentation/d/${this.element.docID}/preview?slide=id.p1`
      let src = `https://player.vimeo.com/video/${this.element.docID}`
      console.log(`url=${src}`)
      return src
    },

    // sectionStyle: function () {
    //   let style = { }
    //   copyStyle(this.element, style, 'background-color')
    //   copyStyle(this.element, style, 'padding')
    //   copyStyle(this.element, style, 'padding-top')
    //   copyStyle(this.element, style, 'padding-bottom')
    //   copyStyle(this.element, style, 'padding-left')
    //   copyStyle(this.element, style, 'padding-right')
    //   return style
    // }
  },
  methods: {
    select (element) {
      console.log(`select()`, element)
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

  $frame-color: lightblue;
  $text-color: darkblue;

  .c-layout-mode-heading {
    // This overrides the definition in content-editor.scss
    background-color: $frame-color;
    color: $text-color;
  }

  .c-edit-mode-debug {
    border-left: dashed 2px $frame-color;
    border-bottom: dashed 2px $frame-color;
    border-right: dashed 2px $frame-color;
    padding-bottom: 30px;

    &.c-selected {
      border-color: $c-editbar-color;
    }
  }

  .vimeo-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    margin-top: $c-embed-margin-top;
    margin-bottom: $c-embed-margin-bottom;

    &.my-dummy-iframe {
      background-color: #d0d0d0;
    }

    iframe,
    object,
    embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
