<template lang="pug">

  .toolbox-pane
    .my-components
      .my-widget(v-for="component in theToolbox")
        drag(:transfer-data="component")
          i(v-if="component.iconClass", :class="component.iconClass").fa.fa-2x
          i(v-else).fa.fa-2x.fa-file-word-o
          div(slot="image")
            i.fa.fa-2x.fa-file-word-o
        .my-component-label {{component.name}}

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
