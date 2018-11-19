<template lang="pug">
div(v-if="sane")

  // Display the children of this element
  .content-children(v-if="element && element.children", :class="showDropAreas ? 'c-show-drop-areas' : ''")
    div(v-if="extraDebug")
      | &lt;content-children&gt;
      br
    //.my-children-debug(v-if="pageEditMode=='debug'") {{element.children && element.children.length}} children

    // Display each child
    //- div(v-for="(child, index) in element.children" v-bind:key="child.id")
    template(v-for="(child, index) in element.children")

      // children is an array, so it is possible for a child to be null
      template(v-if="child")
        // Drop area for adding before this child
        // https://www.npmjs.com/package/vue-drag-drop#events
        drop(v-if="showDropAreas" @drop="handleDrop(element, child, ...arguments)")
          template(slot-scope="props")
            .droparea(v-bind:class="[props.transferData ? 'dropover' : '']", contenteditable="true", @paste="onPaste($event, index)", @input="onInput")

        // Hack - does not display children without this.
        // | {{''}}

        // Display this child
        component(v-if="componentNameForElement(child)", v-bind:is="componentNameForElement(child)", :element="child", :context="context")
        template(v-else)
          | Unknown element type '{{child.type}}'
          br


      template(v-else)
        | Missing child {{index}}
        br

    // Drop area for adding after last child
    // https://www.npmjs.com/package/vue-drag-drop#events
    drop(v-if="showDropAreas" @drop="handleDrop(element, null, ...arguments)")
      template(slot-scope="props")
        .droparea(v-bind:class="[props.transferData ? 'dropover' : '']", contenteditable="true", @paste="onPaste($event,'last')", @input="onInput")
</template>

<script>
import ContentMixins from '../mixins/ContentMixins'

export default {
  name: 'content-children',
  components: {
  },
  props: {
    element: Object,

    // The context provides a means for a container to pass information down to
    // the elements it's contains, to provide elements context within the
    // hierarchy of elements. Why?
    // During editing there can only be one currently-being-edited layout,
    // and the store provides context about the single element being editing.
    // During normal rendering there may be multiple layouts on a page, but
    // the store only saves a single state, so the store cannot be used.
    // In cases where a container and it's elements need to know a bit about
    // each other, this context can contain that non-editing-related context.
    context: {
      type: Object,
      required: true
    },
  },
  data () {
    return {

      // Did we pass sanity checks?
      sane: true
    }
  },
  mixins: [
    ContentMixins
  ],
  methods: {
    componentNameForElement (element) {
      let type = element.type
      let def = this.$content.getLayoutType(type)
      return def ? def.componentName : null
    },
    onPaste (e, position) {
      console.log(`onPaste(${position})`, e)

      let clipboardData, pastedData;

      // See https://stackoverflow.com/a/6804718/96100, solution #1

      // Stop data actually being pasted into div
      e.stopPropagation();
      e.preventDefault();

      // Get pasted data via clipboard API
      clipboardData = e.clipboardData || window.clipboardData;
      pastedData = clipboardData.getData('Text');


      let parent = this.element
      console.log(`parent is ${parent.id} (${parent.type}) [${parent.children.length}]`)
      if (position === 'last') {
        position = parent.children.length
      }
      console.log(`insert at: ${position}`)

      // Check that the data makes sense
      console.log('data:', pastedData);
      console.log('data:', typeof(pastedData));
      if (typeof(pastedData) !== 'string') {
        return this.reportError(`Invalid paste object (not text).`)
      }
      this.$content.insertLayout({ vm: this, parent: parent, position: position, layout: pastedData })

      // let data
      // try {
      //   data = JSON.parse(pastedData);
      // } catch(e) {
      //   console.error('Error while pasting:', e);
      //   return this.reportError(`Invalid paste object (not JSON).`)
      // }
      // console.log(`data=`, data)
      //
      // if (data.type !== 'contentservice.io') {
      //   return this.reportError(`Invalid paste object (not from contentservice.io).`)
      // }
      // if (data.version === '2.0') {
      //   return this.reportError(`Invalid paste object (unknown version ${data.version}).`)
      // } else {
      //   // Assume version 1.0
      //   if (typeof(data.layout) === 'undefined') {
      //     return this.reportError(`Invalid paste object (missing layout).`)
      //   }
      //   console.log(`Will insert `, data.layout)
      //   this.$content.insertLayout({ vm: this, parent: parent, position: position, layout: data.layout })
      // }

      return false
    },

    onInput (event) {
      //console.log(`onInput()`, event)
      // console.log(`$el=`, this.$el)
      // console.log(`$el.text=`, this.$el.text)
      // event.preventDefault()
      event.target.textContent = ''
      //console.log(`  after:`, event)
      return false
    },

    reportError (msg) {
      alert(msg)
      return false
    },

    // The drop event normally provides (data, event) but we've added (element, child, ...) in front.
    handleDrop (element, child, data, event) {
      console.log(`Children.handleDrop(element=${element.id}, child=${child?child.id:'\"null\"'}), data=`, data)

      if (data.dragtype != 'component') {
        console.log(`Dropped non-component: '${data.dragtype}'`)
        return
      }

      // Get the element to be inserted, from the drop data.
      let insertContent = data.data

      // Note that 'child' is the existing child, not the child being inserted.
      if (child) {
        // Insert before the specified child.
        for (var i = 0; i < element.children.length; i++) {
          if (element.children[i] === child) {
            console.log(`Insert at position ${i}`)
            this.$content.insertLayout({ vm: this, parent: element, position: i, layout: insertContent })
            break
          }
        }
      } else {
        // No child specified - add at the end
        this.$content.insertLayout({ vm: this, parent: element, position: -1, layout: insertContent })
      }
    }
  },
  created: function () {

    // Sanity check
    if (!this.$content) {
      console.error(`ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?`);
      this.sane = false
      return
    }
  }
}
</script>

<style lang="scss" scoped>
.content-children {

  &.c-show-drop-areas {
    margin: 2px;
    border: dotted 1px blue;
    padding: 1px;
  }

  .my-children-debug-outline {
    border: dashed 1px green;
    margin: 1px;
  }
  .my-children-debug {
    background-color: green;
    color: white;
    font-size: 9px;
    text-align: center;
  }
  .droparea {
    display: block;
    min-height: 15px;
    background-image: url(../assets/drop-bg-1.png);
    position: relative;
    z-index: 1000;
  }
  .dropover {
    background-color: #ccc;
    border: dashed 1px cyan;
  }
}
</style>
