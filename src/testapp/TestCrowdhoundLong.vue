<template lang="pug">
  //
  //  No left pane, not fixed to window.
  //
  div#app
    .above-my-triple-pane
      a(href="/")
        img(src="../assets/logo.png")
      br
      button.button.is-warning.is-pulled-right Hello
      h1.title.is-3 Long page + Crowdhound content
    //content-layout-editor#my-triple-pane(:editcontext="editcontext", editable="false", :contentdata="contentdata", :type="typeN", :anchorN="anchorN")
    content-layout-editor.my-triple-pane(:editable="editable", :anchor="anchor", height="300px", editingHeight="600px")

      template(slot="middle-pane")
        //content-layout2(type="fixed", :layout="layoutZ", :editcontext="editcontext")
        | HERE IS THE MIDDLE PANE
        .my-box
        .my-box
        .my-box
        .my-box
        .my-box
        .my-box
        .my-box
        .my-box
        .my-box
        br
        | end
    | After Content.
</template>

<script>

export default {
  name: 'app',
  components: {
    //HelloWorld
  },
  data () {
    return {
      // NEW
      leftPane: true,
      editable: true,
      anchor: 'mbc.test.layout',
      /*
      editable: Boolean,
      anchor: {
        required: false,
        type: String
      },
      layout: {
        required: false,
        type: Object
      }
      */



      // OLD
      editcontext: {
        showLeftPane: false,
        pageEditMode: 'view'
      },

      typeN: 'crowdhound',
      anchorN: 'mbc.test.layout',

      contentdata: { },

      layoutZ: [
        {
          type: 'section',
          children: [
            {
                "type": "froala",
                "text": "<h1><span style=\"font-size: 48px;\">$ Cost of Time</span></h1>",
                "id": 1664717185,
                "children": []
            }
          ]
        },
        {
          type: 'section',
          'padding-top': '0px',
          // 'padding-bottom': '50px',
          // 'padding-right': '250px',
          // 'background-color': 'cyan',
          children: [
            {
              type: 'container',
              mode: 'hero',
              children: [
                {
                  type: 'text',
                  text: 'Here we have some small purple text.',
                  'font-size': '12px',
                  'color': 'purple'
                }
              ]
            },
          ]
        }
      ] // layoutZ
    }
  },
  created() {
    console.log('this.$store: ', this.$store);
  },
}
</script>

<style lang="sass" src="bulma"></style>

<style lang="scss" scoped>

$border-color: #ee0000;


// Positioning of the footer
$above-triple-pane-size: 100;
$below-triple-pane-size: 80;


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  img {
    margin: 10px;
    height: 80px;
    float: left;
  }
}
.above-my-triple-pane {
  // display: block;
  // top: 0px;
  height: #{$above-triple-pane-size}px;
  padding: 0px;
}

// DOC_NOTE:
// This magic gives the pane a fixed size while editing. Without
// this the rsize bars will not be set.
//
.my-triple-pane /deep/ .c-editing-layout {
  height: calc(100vh - #{$above-triple-pane-size + $below-triple-pane-size}px);
}

.my-triple-pane /deep/ .c-editing-layout {
  border: solid 1px $border-color;
}

.my-box {
  display: block;
  border: solid 2px blue;
  width: 200px;
  height: 120px;
  margin-bottom: 10px;
}
</style>
