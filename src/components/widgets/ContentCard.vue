<template lang="pug">


  .c-google-slides(v-bind:class="[ editModeClass, (pageEditMode=='debug') ? 'tt-container-outline' : '']")

    // View mode
    .container(v-if="pageEditMode==='view'")
      .content-google-slides-embed-container
        // iframe.my-iframe(v-bind:src="src" frameborder="0" zwidth="640" zheight="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true")
        // iframe(width="560", height="315", src="https://www.youtube.com/embed/q1muKgsPWE8", frameborder="0", allow="autoplay; encrypted-media", allowfullscreen)
        .video-container
          //iframe(width="853" height="480", :src="url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen)
          iframe(src="https://player.vimeo.com/video/256916826" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)
          p
            a(href="https://vimeo.com/256916826")
              | Introduction to AWS Fargate
            | from
            a(href="https://vimeo.com/seajug")
              | Nimret Sandhu
            | on
            a(href="https://vimeo.com")
              | Vimeo.


    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="selectThisElement")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | Card
      .container
        //| {{element.docID}}
        .content-google-slides-embed-container
          .my-dummy-iframe

    // Edit, layout modes
    .container(v-else, v-on:click.stop="selectThisElement")
      .content-google-slides-embed-container
        .my-dummy-iframe
          | VIMEO
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from '../EditBarIcons'


export default {
  name: 'content-card',
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
      let src = `https://docs.google.com/presentation/d/${this.element.docID}/preview?slide=id.p1`
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
  // @import '../../assets/css/content-variables.scss';

  $frame-color: lightblue;
  $text-color: darkblue;

  .my-iframe {
    //width: 80%;
    //height: 400px;
  }

  .my-dummy-iframe {
    width: 1920px;
    height: 1109px;
    border: solid 1px #b0b0b0;
    background-color: #d0d0d0;
  }

  .c-layout-mode-heading {
    // This overrides the definition in vue-contentservice.scss
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

  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
  }

  .video-container iframe,
  .video-container object,
  .video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
