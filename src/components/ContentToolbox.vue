<template lang="pug">
  .toolbox-pane(v-if="sane")
    .my-components
      div.my-category(v-for="cat in this.$content.toolboxCategories()")
        .my-category-name {{cat.name}}
        .my-widget(v-for="type in cat.types" v-if="type.dragtype == 'component'")
          drag.my-drag(:transfer-data="type", @dragstart="dragStart", @dragend="dragStop")
            .my-image(:class="iconClass(type)")
            //- i(v-else).fas.fa-2x.fa-file-word-o
            //- div(slot="image")
            //-   i.fas.fa-2x.fa-file-word-o
          .my-component-label(:style="labelStyle(type.label)") {{type.label}}

    .accreditation
      | (icons courtesy of&nbsp;
      a(href="https://icons8.com", target="_blank") icons8.com
      | )
</template>

<script>
//import Toolbox from '../lib/toolbox.conf.js'

export default {
  name: 'tooltwist-layout',
  props: {
    layout: Object,
    editable: String,
    toolbox: Object,
  },
  data: function () {
    return {
      // theToolbox: { },

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
    },//- iconClass
    labelStyle (label) {
      // let label = this.type.label
      if (label && label.length > 10) {
        return { fontSize: '9px' }
      } else {
        return { fontSize: '9px' }
      }
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

    // if (this.toolbox) {
    //   this.theToolbox = this.toolbox
    // } else {
    //   this.theToolbox = Toolbox
    // }
  }
}

function chooseIcon(rules) {

}
</script>


<style lang="scss" scoped>
//@import '../assets/css/editor-icons.scss';

// .toolbox-pane {
//   position: relative;
//   padding: 0px !important;
//   margin: 0px;
//
//   .my-components {
//     padding: 0px;
//     padding-top: 0px;
//     // background-color: pink;
//
//     .my-category {
//       // background-color: lightblue;
//       //display: flex;
//       padding: 0px;
//       margin: 0px;
//       vertical-align: top;
//
//       .my-category-name {
//         margin-top: 4px;
//         margin-left: 4px;
//         zfont-weight: 800;
//         font-weight: bold;
//       }
//
//       .my-widget {
//         display: inline-block;
//         margin: 5px;
//         width: 48px;
//         //height: 50px;
//         padding-top: 5px;
//         vertical-align: top;
//         text-align: center;
//         // background-color: yellow;
//
//         .my-drag {
//           // background-color: orange;
//           text-align: center;
//           padding: 0px;
//           margin: 0px;
//           height: 29px;
//
//           .my-image {
//             display: inline-block;
//             // left: auto;
//             // right: auto;
//             width: 26px;
//             height: 26px;
//             // background-color: pink;
//             // border: solid 1px pink;
//           }
//         }
//         .my-component-label {
//           //font-size: 11px;
//           margin-bottom: 2px;
//           overflow-x: hidden;
//         }
//       }
//     }
//   }
//
//
//   .accreditation {
//     font-size: 10px;
//     //position: absolute;
//     // bottom: 0;
//     margin-top: 20px;
//     text-align: center;
//   }
//
// }
</style>
