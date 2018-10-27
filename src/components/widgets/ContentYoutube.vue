<template lang="pug">


  .c-youtube(v-bind:class="[ editModeClass, (pageEditMode=='debug') ? 'tt-container-outline' : '']")

    // View mode
    .container(v-if="pageEditMode==='view'")
      // See https://www.ostraining.com/blog/coding/responsive-videos/
      .youtube-container
        iframe(width="560", height="315", :src="src", frameborder="0", allow="autoplay; encrypted-media", allowfullscreen)

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | youtube
      .container
        //| {{element.docID}}
        .youtube-container.my-dummy-iframe

    // Edit, layout modes
    .container(v-else, v-on:click.stop="selectThisElement")
      .youtube-container.my-dummy-iframe
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from '../EditBarIcons'


export default {
  name: 'content-youtube',
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
      url: 'https://www.youtube.com/embed/NFJu0rnAAm8',
      url2: 'https://www.youtube.com/embed/q1muKgsPWE8'
    }
  },
  computed: {

    src: function ( ) {
      // let src = `https://docs.google.com/a/tooltwist.com/presentation/d/e/${this.element.docID}/embed?start=false&loop=false&delayms=3000`
      //let src = `https://docs.google.com/presentation/d/${this.element.docID}/preview?slide=id.p1`
      let src = `https://www.youtube.com/embed/${this.element.docID}`
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

  // .video-container {
  //   position: relative;
  //   padding-bottom: 56.25%;
  //   padding-top: 30px; height: 0; overflow: hidden;
  // }
  //
  // .video-container iframe,
  // .video-container object,
  // .video-container embed {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  // }

  .youtube-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    margin-top: $c-embed-margin-top;
    margin-bottom: $c-embed-margin-bottom;

    iframe {
      border: none;
    }

    &.my-dummy-iframe {
      background-color: #d0d0d0;
    }
  }

  .youtube-container iframe,
  .youtube-container object,
  .youtube-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
