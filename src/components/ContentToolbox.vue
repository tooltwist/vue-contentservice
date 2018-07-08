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
      console.log(`iconClass. tool=`, tool)
      console.log(`iconClass. this.$content=`, this.$content)
      console.log(`iconClass. this.$content=`, this.$content)
      console.log(`iconClass. this.$loginservice=`, this.$loginservice)
      if (this.$content) {

        if (this.$content.icons('fa')) {
          // Use FontAwesome version 4
          if (tool.iconClass) {
            return [ 'fa', 'fa-2x', tool.iconClass ]
          }
          return [ 'fa', 'fa-2x', 'fa-word-file-o' ]
        } else if (this.$content.icons('fas')) {
          // Use FontAwesome version 5
          if (tool.iconClass) {
            let arr = tool.iconClass5.split(' ')
            if (indexOf("fas")<0 && indexOf("far")<0 && indexOf("fal")<0 && indexOf("fab")<0) {
              arr.push("fas")
            }
            return arr
          }
        }

      }
      return [ 'fas', 'fa-2x', 'fa-word-file-o' ]
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
