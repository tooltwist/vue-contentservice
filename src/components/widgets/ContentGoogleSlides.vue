<template lang="pug">


  .tt-container(v-bind:class="[(pageEditMode=='debug') ? 'tt-container-outline' : '']")

    // View mode
    .container(v-if="pageEditMode==='view'")
      .content-google-slides-embed-container
        iframe.my-iframe(v-bind:src="src" frameborder="0" zwidth="640" zheight="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true")

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .tt-container-debug-heading
        | google slides
      .container
        //| {{element.docID}}
        .content-google-slides-embed-container
          .my-dummy-iframe

    // Edit, layout modes
    .container(v-else, v-on:click.stop="select(element)")
      .content-google-slides-embed-container
        .my-dummy-iframe


</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'


export default {
  name: 'content-container',
  components: {
  },
  props: {
    element: Object,
  },
  mixins: [ ContentMixins ],
  data: function () {
    return {
      //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl',
    }
  },
  computed: {

    src: function ( ) {
      let src = `https://docs.google.com/a/tooltwist.com/presentation/d/e/${this.element.docID}/embed?start=false&loop=false&delayms=3000`
      console.log(`url=${src}`)
      return src
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
  //- #gbx4{
  //-   background-color: #000;
  //- }


  .my-iframe {
    //width: 80%;
    //height: 400px;
  }

  .my-dummy-iframe {
    //- width: 640px;
    //- height: 389px;
    width: 1920px;
    height: 1109px;
    border: solid 1px #333;
    background-color: #d0d0d0;
  }


  .tt-container-outline {
    border-left: dashed 2px lightgreen;
    border-bottom: dashed 2px lightgreen;
    border-right: dashed 2px lightgreen;
    margin: 1px;
    //- background-color: lightgreen;
    background-color: #f9fdff;
    background-color: #f6fff3;
  }
  .tt-container-debug-heading {
    display: relative;
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
