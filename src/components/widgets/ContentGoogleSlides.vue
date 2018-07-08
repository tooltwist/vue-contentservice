<template lang="pug">


  .tt-container(v-bind:class="[(pageEditMode=='debug') ? 'tt-container-outline' : '']")

    // Preview mode
    .container(v-if="pageEditMode==='view'", v-on:click.stop="select(element)")
      .embed-container
        iframe.my-iframe(v-bind:src="src" frameborder="0" width="640" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true")

    // Edit mode
    .container(v-else-if="pageEditMode==='edit'", v-on:click.stop="select(element)")
      .embed-container
        .my-dummy-iframe

    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .tt-container-debug-heading google slides
      .container
        .embed-container
          .my-dummy-iframe

    // Live
    .container(v-else)
      .embed-container
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
  mixins: [
    ContentMixins
  ],
  data: function () {
    return {
      docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl',
    }
  },
  computed: {

    editUrl: function ( ) {
      let url = `https://docs.google.com/presentation/d/${this.docId}/edit`
      console.log(`url=${url}`)
      return url
    },

    src: function ( ) {
      let src = `https://docs.google.com/a/tooltwist.com/presentation/d/e/${this.docId}/embed?start=false&loop=false&delayms=3000`
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

  // Make the slides responsive
  // From https://productforums.google.com/forum/#!topic/docs/tuufSoBoxKc
  .embed-container {
    position: relative;
    padding-bottom: 48.25%; /* 16/9 ratio */
    padding-top: 30px; /* IE6 workaround*/
    height: 0;
    overflow: hidden;

  }
  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 3%;
    left: 2%;
    right: 2%;
    width: 96%;
    height: 96%;
  }
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
