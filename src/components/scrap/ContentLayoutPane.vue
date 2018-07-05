<template lang="pug">





// Is this used? ZZZZZZZ






.my-page.container.is-fluid.is-fullheight(zv-hotkey="keymap")
  | content-layout-pane

  .tt-editable-header(v-if="pageEditMode !== 'view'" @click.stop="switchMode")
    .tt-editable-mode mode is {{pageEditMode}}
    .tt-dump-button(zv-if="pageEditMode === 'layout'")
      | &nbsp;&nbsp;
      a(@click.stop="dump") dump

  br
  | LAYOUT
  //.tt-content-layout(v-if="sanitizedContentComp")
  //  content-children(:editcontext="editcontext", :element="sanitizedContentComp")



</template>

<script>
import Vue from 'vue'
//import { sanitizeLayout, safeJson, layoutChanged } from '~/lib/Tooltwist.js'

export default {
  name: 'content-layout-pane',
  props: {
    editcontext: Object,
    anchor: String,
    editable: String,
    toolbox: Object,
  },
  data: function () {
    return {
      //- editcontext: {
      //-   pageEditMode: 'view',
      //-   setMode: function (mode) {
      //-     console.log(`this.editcontext.setMode(${mode})`)
      //-     this.pageEditMode = mode;
      //-   }
      //- },
      previousEditMode: 'edit',
    }
  },
  computed: {

    keymap () {
      let self = this
      return {
        // 'ctrl+alt+esc': {
        'alt+esc': {

          keydown: function () {
            // console.log(`DOWN ${self.pageEditMode}`)
            //console.log(`=>`, self.editcontext)
            if (self.pageEditMode === 'view') {
              // Switch to one of the edit modes
              self.editcontext.setMode(self.previousEditMode)

            } else {
              // Switch back to view mode
              self.previousEditMode = self.pageEditMode
              self.editcontext.setMode('view')
            }
          },
          keyup: function () {
            //console.log('UP')
          },
        },
      }
    }
  },
  methods: {
    switchMode () {
      //console.log(`switchMode, from ${this.pageEditMode}`)
      switch (this.pageEditMode) {
        case 'edit':
          this.editcontext.setMode('layout');
          break;
        case 'layout':
          this.editcontext.setMode('debug');
          break;
        case 'debug':
          this.editcontext.setMode('edit');
          break;
        /*
        case 'live':
          this.editcontext.setMode('debug');
          break;
        case 'view':
          this.editcontext.setMode('debug');
          break;
        */
      }
      this.mode = this.pageEditMode;
    },
    dump () {
      console.log('dump', this.editcontext)
      console.log(`contentdata=`, this.contentdata)
      if (this.contentdata && this.contentdata.data && this.contentdata.data.layout) {
        console.log(`layout:\n`, this.contentdata.data.layout)

        // Convert to a string
        var json = safeJson(this.contentdata.data.layout)

        // Dump to the console
        console.log(`\n\nDUMP:\n\nexport default ${json}\n\n`)

      }
    },
    loadLayout () {

      // We select the content from crowdhound
      //console.log(`TooltwistText.created`)
      if (typeof(this.$content) === 'undefined') {
        console.error('this.$content not defined. Remember to us Contentservice.use(Vue).')
        return
      }
      if (this.$content.disabled) {
        console.error('Contentservice disabled')
        return
      }

      let shortAnchor = this.anchor
      let fullAnchor = `$`  + this.anchor
      let elementType = 'layout'
      console.error(`>>> anchor is ${fullAnchor}.`)

      //- let params = {
      //-   elementId: anchor,
      //-   withChildren: true
      //- }
      this.$content.select(this, fullAnchor, elementType)
        //- this.$content.select(this, params)
        .then(result => {
          // Use the elements
          let layout = null

          console.log(`>>> result=`, result)
          if (result.elements.length > 0) {
            console.log(`result=`, result)
            let json = result.elements[0].description
            console.log('json=', json)
            if (json === shortAnchor) {
              console.error(`>>> NOT parsing json (it's the anchor)`)
              // New element/layout
            } else {
              console.error(`>>> parsing JSON`)
              element = JSON.parse(json)
              console.log('element=', element)
            }
          }
          console.log(`>>> layout=`, layout)

          if (layout === null) {
            console.error(`>>> Creating default layout`)
            // Create an initial layout
            layout = {
              type: 'layout',
              children: [
                {
                  type: 'section',
                  children: [
                    {
                        "type": "froala",
                        "text": "<h1><span style=\"font-size: 48px;\">Example elemente!</span></h1>",
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
              ]
            }

          }

          // Save the layout in our state store.
          let sanitized = this.$content.util.sanitizeLayout(layout)
          this.$store.commit('contentLayout/setLayout', { element: sanitized })

        })
        .catch(e => {
          let desc = `Error loading comments`
          console.log(`Dirty rotten error: `, e)
          /* handleError(this, desc, params, e) */
          this.selectError = true
        })//- axios
    }
  },

  created: function () {
    //ZZZ Check props
    console.error('content-layout-pane.created')
    this.loadLayout()

    // Add a few functions
    // let self = this
    // this.editcontext.setMode = function (mode) {
    //   console.log(`this.editcontext.setMode(${mode})`)
    //   console.log(`was ${self.pageEditMode} -- ${this.pageEditMode}`)
    //     self.editcontext.pageEditMode = mode;
    //     this.pageEditMode = mode;
    // }
  }
}
</script>

<style lang="scss">

.tt-container .container {
  width: 90% !important;
  //background-color: yellow;
}

</style>

<style lang="scss" scoped>
.tt-editable {
  position: relative;
}

.tt-editable-initiate {
  position: absolute;
  right: 5px;
  top: 5px;
  //color: #999;
  color: red;
  cursor: pointer;
  font-size: 20px;
  opacity: 0.5;

  &:hover {
    //color: red;
    background-color: red;
    color: white;
    opacity: 1.0;
    border-radius: 5px;
  }
}
.tt-editable-header {
  height: 30px;
  //background-color: #e0e0e0;
  background-color: #dd0000;

  border-bottom: solid 1px #999;
  cursor: pointer;

  .tt-editable-mode {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 800;
    margin-top: 2px;
    border-radius: 5px;

    //background-color: red;
    //color: white;
    background-color: white;
    color: black;
  }
  .tt-dump-button {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 0px;
    a, a:visited, a:hover {
      color: white;
      font-size: 9px;
    }
  }
}
.tt-editable-header:hover {
  .tt-editable-mode{
    //color: blue;
  }
  //border-bottom-color: #99e;
  //background-color: #e0e0f0;
}

.my-page {
  // background-color: yellow;
  min-height: 100vh;
  // display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 0px;
  margin-right: 0px;
  background-color: white;
}

.multipane-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.my-split {
  height: 100%;
  width: 100%;
}
.my-split > .Size {
  padding: 15px;
  overflow: scroll;
  border: 1px solid #ccc;
  position: relative;
}
.my-split > .pane ~ .pane {
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.leftpane {
  position: relative;
  background: #eee;
}

.middlepane {
  position: relative;
  padding: 0px !important;
  height: 100%;
}

.rightpane {
  position: relative;
  h1.title {
    font-size: 24px;
  }
}

.properties-pane {
  padding: 0px !important;
  margin: 0px;
}

.components-pane {
  padding: 0px !important;
  margin: 0px;
}

.box {
  // width: 50px;
  height: 50px;
  border: solid 1px #999;
}

</style>
