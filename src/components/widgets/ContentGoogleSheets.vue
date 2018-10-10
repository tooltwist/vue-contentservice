<template lang="pug">


  .c-google-sheets(v-bind:class="[ editModeClass, (pageEditMode=='debug') ? 'tt-container-outline' : '']")

    // View mode
    .container(v-if="pageEditMode==='view'")
      | mode is&nbsp;
      b {{displayMode}}
      | &nbsp;{{modeDescription}} - {{refreshCounter}}
      div(v-if="displayMode==='editable'")
        .my-sheets-container(:style="contentEditStyle")
          // Regular embedded mode, to allow editing (with menus, rows and tabs)
          iframe(:src="`https://docs.google.com/spreadsheets/d/${replacementDocID}/edit?gid=0&chrome=false&single=true&widget=false&headers=false`", width="1000", height="500", frameborder="solid 1px red", scrolling="yes")
        button.button.is-primary(@click="doUpdate", :class="{ 'is-loading': currentlyScanning }") Update
        .scanMessage {{scanMessage}}
        .is-clearfix

      // Edit, no menus
      div(v-else-if="displayMode==='editable-nomenus'")
        .my-sheets-container(:style="contentEditStyle")
          iframe(:src="`https://docs.google.com/spreadsheets/d/${replacementDocID}/edit?gid=0&chrome=false&single=true&widget=false&headers=false&rm=minimal`", width="1000", height="500", frameborder="solid 1px red", scrolling="yes")
        button.button.is-primary(@click="doUpdate", :class="{ 'is-loading': currentlyScanning }") Update
        .scanMessage {{scanMessage}}
        .is-clearfix

      // Edit, no menus, no rows, no sheet tabs
      div(v-else-if="displayMode==='editable-dataonly'")
        .my-sheets-container
          // From http://metricrat.co.uk/google-sites-classic-embed-live-working-google-sheet-range
          div(:style="{float:'left', border:'1px solid #f3f3f3', overflow:'hidden', margin:'0px auto', maxWidth:`${width}px`, height:`${height}px`, zwidth:'1000px', backgroundColor:'yellow' }")
            div(:style="{overflow:'hidden', margin:'0px auto', maxWidth:`${width}px`, backgroundColor:'pink'}")
              iframe(:src="`https://docs.google.com/spreadsheets/d/${replacementDocID}/edit?gid=0&chrome=false&single=true&widget=true&headers=false&rm=minimal`", :style="{ border:'0px none', marginRight:'-10px', marginLeft:'-45px', height:'571px', marginTop:'-23px', width:`${width}px`, overflow:'hidden' }", scrolling="no")
          div(style="clear: both;")
        button.button.is-primary(@click="doUpdate", :class="{ 'is-loading': currentlyScanning }") Update
        .scanMessage {{scanMessage}}
        .is-clearfix

      // Preview unpublished document
      .my-sheets-container(v-else-if="displayMode==='preview'", :style="contentEditStyle")
        iframe(:src="`https://docs.google.com/spreadsheets/d/${replacementDocID}/preview?gid=0&chrome=false&single=true&widget=false&headers=false`" width="1000", height="500", scrolling="yes")

        // Preview unpublished document, without tabs
      .my-sheets-container(v-else-if="displayMode==='preview-notabs'", :style="contentEditStyle")
        // From http://metricrat.co.uk/google-sites-classic-embed-live-working-google-sheet-range
        div(style="float: left; border: 0px solid #f3f3f3; overflow: hidden; margin: 0px auto; max-width: 1000px; height: 500px;")
          div(style="overflow: hidden; margin: 0px auto; max-width: 1000px;")
            iframe(:src="`https://docs.google.com/spreadsheets/d/${replacementDocID}/preview?gid=0&chrome=false&single=true&widget=false&headers=false`", style="margin-right: -10px; margin-left: -45px; height: 650px; margin-top: -23px; width: 1010px; overflow: hidden; border: none;", scrolling="no")
        div(style="clear: both;")

      .my-sheets-container(v-else-if="displayMode==='published-notabs'", :style="contentEditStyle")
        // From http://metricrat.co.uk/google-sites-classic-embed-live-working-google-sheet-range
        div(style="float: left; border: 0px solid #f3f3f3; overflow: hidden; margin: 0px auto; max-width: 1000px; height: 500px;")
          div(style="overflow: hidden; margin: 0px auto; max-width: 1000px;")
            iframe(:src="`https://docs.google.com/a/tooltwist.com/spreadsheets/d/e/${element.docID}/pubhtml?widget=true&amp;headers=false`", style="margin-right: -10px; margin-left: 0px; height: 650px; margin-top: -29px; width: 1010px; overflow: hidden; border: none;", scrolling="no")
        div(style="clear: both;")


      .my-sheets-container(v-else, :style="contentEditStyle")
        iframe(:src="`https://docs.google.com/a/tooltwist.com/spreadsheets/d/e/${element.docID}/pubhtml?widget=true&amp;headers=false`")


    // Debug mode
    div(v-else-if="pageEditMode==='debug'", v-on:click.stop="select(element)")
      .c-layout-mode-heading
        edit-bar-icons(:element="element")
        | google sheets {{width}}
      .container
        .my-sheets-container.my-dummy-iframe(:style="contentEditStyle")
          .valign
            | Google Sheets
            br
            .modeDescription(v-if="haveDocId")
              | {{modeDescription}}
            .modeError(v-else)
              br
              | Document not specified

    // Edit, layout modes
    .container(v-else, v-on:click.stop="select(element)")
      .my-sheets-container.my-dummy-iframe(:style="contentEditStyle")
        .valign
          | Google Sheets
          br
          .modeDescription(v-if="haveDocId")
            | {{modeDescription}}
          .modeError(v-else)
            br
            | Document not specified
</template>

<script>
import ContentMixins from '../../mixins/ContentMixins'
import CutAndPasteMixins from '../../mixins/CutAndPasteMixins'
import EditBarIcons from './EditBarIcons'


export default {
  name: 'content-google-sheets',
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
    refreshCounter () {
      return this.$store.state.docserviceStore.refreshCounter
    },

    docID: function () {
      let value = this.element['docID']
      return value ? value : ''
    },

    replacementDocID: function ( ) {
      console.log(`ContentGoogleSheets METHOD replacementDocumentID`, this.$store.getters);
      let docID = this.element['docID']
      if (docID) {
        // Use a preview version of the sheet
        // console.log(`compute docID 1`, this.$store);
        let userID = null //ZZZZZZ
        let replacementDocID = this.$store.getters['docserviceStore/replacementDocID'](docID, userID)

        console.log(`replacementDocID: ${docID} -> ${replacementDocID}`);
        return replacementDocID
      }
      return ''
    },

    currentlyScanning: function () {
      return this.$store.state.docserviceStore.currentlyScanning
    },

    scanMessage: function () {
      return this.$store.state.docserviceStore.scanMessage
    },

    width: function () {
      let value = this.element['width']
      let w = 1000
      if (value && value.trim()) {
        w = parseInt(value)
      }
      if (w < 200) {
        w = 200
      }
      return w
    },

    height: function () {
      let value = this.element['height']
      let h = 500
      if (value && value.trim()) {
        h = parseInt(value)
      }
      if (h < 200) {
        h = 200
      }
      return h
    },

    contentEditStyle: function () {
      // console.log(`contentEditStyle()`);
      let style = { }

      // Width
      let value = this.element['width']
      // console.log(` width value=${value}`);
      let w = 1000
      if (value && value.trim()) {
        w = parseInt(value)
        console.log(`w=${w}`);
        if (w < 200) {
          w = 200
        }
        style.maxWidth = w + 'px'
      }

      // Height
      value = this.element['height']
      // console.log(` height value=${value}`);
      let h = 500
      if (value && value.trim()) {
        h = parseInt(value)
        if (h < 100) {
          h = 100
        }
      }
      style.height = h + 'px'
      // console.log(`contentEditStyle:`, style);
      return style
    },

    src: function ( ) {
      // https://stackoverflow.com/questions/26079476/google-views-in-a-frame-because-it-set-x-frame-options-to-sameorigin
      //let src = `https://docs.google.com/spreadsheets/d/${this.element.docID}`
      //- let src = `https://docs.google.com/a/tooltwist.com/spreadsheets/d/e/${this.element.docID}/pubhtml?widget=true&amp;headers=false`
      //- let src = `https://docs.google.com/a/tooltwist.com/spreadsheets/d/e/${this.element.docID}/pubhtml?widget=true&headers=false&embedded=true`

      // Refused to display '<URL>' in a frame because it set 'X-Frame-Options' to 'sameorigin'.
      // X-frame error solution:
      //
      /*
      let src= `https://docs.google.com/viewer?srcid=[${this.element.docID}]&pid=explorer&efh=false&a=v&chrome=false&embedded=true`
      console.log(`url=${src}`)
      return src
      */

      if (this.element.docID) {
        if (this.element.docID.startsWith('2PACX-')) {
          // Use the published version of the file
          //- let src = `https://docs.google.com/a/tooltwist.com/presentation/d/e/${this.element.docID}/embed?start=false&loop=false&delayms=3000`
          let src = `https://docs.google.com/a/tooltwist.com/spreadsheets/d/e/${this.element.docID}/pubhtml?widget=true&amp;headers=false`
          //- let src= `https://docs.google.com/viewer?srcid=[${this.element.docID}]&pid=explorer&efh=false&a=v&chrome=false&embedded=true`
          console.log(`published url=${src}`)
          return src
        } else {
          // Use a preview version of the sheet
          //- let src = `https://docs.google.com/presentation/d/${this.element.docID}/preview?slide=id.p1`
          //- let src = `https://docs.google.com/spreadsheets/d/1ESlBwmpaCcKm7prdeCKJfVXn6hhddXn7Y6c3XLcYgis/edit?gid=0&chrome=false&single=true&widget=false&headers=false&rm=minimal&embedded=true`
          console.log(`editable=${this.element.editable}`);
          console.log(`show-menus=${this.element['show-menus']}`);
          console.log(`show-tabs=${this.element['show-tabs']}`);

          // Default is editable, with menu and tabs
          let src = `https://docs.google.com/spreadsheets/d/${this.element.docID}/edit?gid=0&chrome=false&single=true&widget=false&headers=false&rm=minimal&embedded=true`

          // if (this.element.editable) {
          //   src = `https://docs.google.com/spreadsheets/d/${this.element.docID}/edit?gid=0&chrome=false&single=true&widget=false&headers=false&rm=minimal&embedded=true`
          // }
          console.log(`unpublished url=${src}`)

          // Modes:
          //  edit - regular
          //  edit without menus
          //  edit without menus or tabs
          //  preview
          //  preview without tabs


          return src
        }
      }
      return ``
    },

    displayMode: function () {
      let mode = this.element['displayMode']
      if (!mode) {
        mode = 'preview'
      }
      return mode
    },

    modeDescription: function() {
      let mode = this.element['displayMode']
      if (!mode) {
        mode = 'preview'
      }
      switch(mode) {
        case 'editable':
          return '(editable=true)'
        case 'editable':
          return '(editable)'
        case 'editable-nomenus':
          return '(editable, without menus)'
        case 'editable-dataonly':
          return '(editable, without menus, rows or tabs)'
        case 'preview':
          return '(view only)'
        case 'preview-notabs':
          return '(view only, without rows or tabs)'
        case 'published':
          return '(view published sheets)'
        case 'published-notabs':
          return '(view published sheets, without rows or tabs)'
        default:
          return `(mode=${mode}) ???`
      }
    },

    haveDocId: function () {
      let id = this.element['docID']
      if (id && id.trim()) {
        return true
      }
      return false
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

    doUpdate () {
      console.log(`doUpdate()`);
      // this.$store.commit('docservice/refreshMutation', { })
      let docID = this.element['docID']
      if (docID) {
        let vm = this
        this.$store.dispatch('docservice/scanDocument', { vm, docID })
      }
    }
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

  .my-sheets-container {
    position: relative;
    // padding-bottom: 56.25%;
    //height: 0;
    overflow: hidden;
    margin-top: $c-embed-margin-top;
    margin-bottom: $c-embed-margin-bottom;

    &.my-dummy-iframe {
      background-color: $c-embed-border-color;

      .valign {
        position: relative;
        text-align: left;
        margin-top: 25px;
        margin-left: 25px;
        // top: 120px;
        font-size: 1.5em;
        font-family: Arial;
        font-weight: lighter;
        color: #a0a0a0;

        .modeDescription {
          font-size: 16px;
        }
        .modeError {
          font-size: 20px;
          color: $c-editbar-color;
          font-weight: bold;
          font-style: italic;
        }
      }
    }

    iframe,
    object,
    embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: solid 1px $c-embed-border-color;
    }
  }

  .scanMessage {
    display: inline-block;
    margin-left: 15px;
    margin-top: 6px;
    width: 25px;
    font-size: 16px;
    color: #999;
  }

</style>
