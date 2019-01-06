<template lang="pug">
  .toolbox-pane(v-if="sane")
    .my-components
      div.my-category(v-for="cat in this.$content.toolboxCategories()")
        .my-category-name {{cat.name}}
        //br(v-if="cat.name != ''")
        //- hr(v-if="cat.name != ''")
        //div(v-for="type in cat.types")
          //- | type={{type.name}}-[{{type.iconClass}}, {{type.iconClass5}}]
          //- br
        .my-widget(v-for="type in cat.types" v-if="type.dragtype == 'component'")
          drag.my-drag(:transfer-data="type", @dragstart="dragStart", @dragend="dragStop")
            i.my-image(:class="iconClass(type)")
            //- i(v-else).fas.fa-2x.fa-file-word-o
            //- div(slot="image")
            //-   i.fas.fa-2x.fa-file-word-o
          .my-component-label {{type.label}}

      //hr
      //| OLD WIDGETS
      //br
      //// Using font awesome version 5
      //.my-widget(v-for="tool in theToolbox")
      //  drag(:transfer-data="tool", @dragstart="dragStart", @dragend="dragStop")
      //    i(:class="iconClass(tool)")
      //    //- i(v-else).fas.fa-2x.fa-file-word-o
      //    //- div(slot="image")
      //    //-   i.fas.fa-2x.fa-file-word-o
      //  .my-component-label {{tool.label}}
    .accreditation
      | (icons courtesy of&nbsp;
      a(href="https://icons8.com", target="_blank") icons8.com
      | )
</template>

<script>
import Toolbox from '../lib/toolbox.conf.js'

export default {
  name: 'tooltwist-layout',
  props: {
    layout: Object,
    editable: String,
    toolbox: Object,
  },
  data: function () {
    return {
      theToolbox: { },

      // Did we pass sanity checks?
      sane: true
    }
  },
  methods: {
    iconClass: function (tool) {
      //console.log(`iconClass()`, tool)
      if (this.$content) {

        if (this.$content.icons('fa')) {
          // Use FontAwesome version 4
          if (typeof(tool.iconClass) === 'string') {

            let arr = tool.iconClass.split(' ')
            let set = 'fa'
            let i
            if ((i = arr.indexOf('fa')) > -1) {
              set = arr[i]
              arr.splice(i, 1);
            }
            let size = 'fa-2x'
            if (
              (i=arr.indexOf('fa-2x')) > -1 ||
              (i=arr.indexOf('fa-3x')) > -1 ||
              (i=arr.indexOf('fa-4x')) > -1 ||
              (i=arr.indexOf('fa-5x')) > -1) {
              size = arr[i]
              arr.splice(i, 1);
            }
            arr.push(set)
            arr.push(size)
            return arr
          }
          return [ 'fa', 'fa-2x', 'fa-word-file-o' ]
        } else {
          // Probably use FontAwesome version 5
          if (typeof(tool.iconClass5) === 'string') {
            let arr = tool.iconClass5.split(' ')
            let set = this.$content.defaultIconPack
            let i
            if (
              (i = arr.indexOf('fas')) > -1 ||
              (i = arr.indexOf('far')) > -1 ||
              (i = arr.indexOf('fal')) > -1 ||
              (i = arr.indexOf('fab')) > -1
            ) {
              set = arr[i]
              arr.splice(i, 1);
            }
            let size = 'fa-2x'
            if (
              (i=arr.indexOf('fa-2x')) > -1 ||
              (i=arr.indexOf('fa-3x')) > -1 ||
              (i=arr.indexOf('fa-4x')) > -1 ||
              (i=arr.indexOf('fa-5x')) > -1) {
              size = arr[i]
              arr.splice(i, 1);
            }
            arr.push(set)
            arr.push(size)
            return arr
          }
        }
        return [ 'fas', 'fa-2x', 'fa-word-file-o' ]
      }

      // Default to font-awesome 4
      return [ 'fa', 'fa-2x', 'fa-word-file-o' ]
    },
    dragStart () {
      this.$content.store.commit('dragStart', { })
    },
    dragStop () {
      this.$content.store.commit('dragStop', { })
    }
  },
  created: function () {

    // Sanity check
    if (!this.$content) {
      console.error(`ContentToolbox.created(): this.$content not defined: has ContentService been initialised?`);
      this.sane = false
      return
    }

    if (this.toolbox) {
      this.theToolbox = this.toolbox
    } else {
      this.theToolbox = Toolbox
    }
  }
}

function chooseIcon(rules) {

}
</script>


<style lang="scss" scoped>

.toolbox-pane {
  position: relative;
  padding: 0px !important;
  margin: 0px;


  //h1 {
  //  background-color: purple;
  //}

  //.title {
  //  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  //  display: block;
  //  font-weight: 300;
  //  font-size: 100px;
  //  color: #35495e;
  //  letter-spacing: 1px;
  //  margin-bottom: 5px;
  //  background-color: red;
  //}


  .my-components {
    padding: 0px;
    padding-top: 0px;
    // background-color: pink;

    .my-category {
      // background-color: lightblue;
      //display: flex;
      padding: 0px;
      margin: 0px;

      .my-category-name {
        margin-left: -10px;
        zfont-weight: 800;
      }

      .my-widget {
        display: inline-block;
        margin: 5px;
        //width: 50px;
        //height: 50px;
        padding-top: 5px;
        //background-color: yellow;

        .my-image {
          width: 26px;
          height: 26px;
          // border: solid 1px red;
        }
        .my-component-label {
          font-size: 11px;
        }
      }
    }
  }


  .accreditation {
    font-size: 10px;
    //position: absolute;
    // bottom: 0;
    margin-top: 20px;
    text-align: center;
  }

}
</style>
