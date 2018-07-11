<template lang="pug">

  .toolbox-pane
    .my-components

      // Using font awesome version 5
      .my-widget(v-for="tool in theToolbox")
        drag(:transfer-data="tool", @dragstart="dragStart", @dragend="dragStop")
          i(:class="iconClass(tool)")
          //- i(v-else).fas.fa-2x.fa-file-word-o
          //- div(slot="image")
          //-   i.fas.fa-2x.fa-file-word-o
        .my-component-label {{tool.name}}

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
      theToolbox: { }
    }
  },
  methods: {
    iconClass: function (tool) {
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
      this.$store.commit('contentLayout/dragStart', { })
    },
    dragStop () {
      this.$store.commit('contentLayout/dragStop', { })
    }
  },
  created: function () {
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
  padding: 0px !important;
  margin: 0px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}


.my-components {
  padding: 20px;
}

.my-widget {
  display: inline-block;
  margin: 5px;
  width: 50px;
  height: 50px;
  padding-top: 5px;
  // background-color: yellow;
  .my-component-label {
    font-size: 9px;
  }
}

</style>
