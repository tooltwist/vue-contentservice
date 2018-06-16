<template lang="pug">

  // Display the children of this element
  .ch-children(v-if="element && element.children", :class="debugClass")
    div(v-if="extraDebug")
      | &lt;content-children&gt;
      br
    .my-children-debug(v-if="pageEditMode=='debug'") {{element.children && element.children.length}} children

    // Display each child
    .loop(v-for="child in element.children" v-bind:key="child.id")

      // Drop area for adding before this child
      // https://www.npmjs.com/package/vue-drag-drop#events
      drop(v-if="showDropAreas" @drop="handleDrop(element, child, ...arguments)")
        template(slot-scope="props")
          .droparea(v-bind:class="[props.transferData ? 'dropover' : '']")

      // Hack - does not display children without this.
      // | {{''}}

      // Display this child
      content-element(:editcontext="editcontext", :element="child")

    // Drop area for adding after last child
    // https://www.npmjs.com/package/vue-drag-drop#events
    drop(v-if="showDropAreas" @drop="handleDrop(element, null, ...arguments)")
      template(slot-scope="props")
        .droparea(v-bind:class="[props.transferData ? 'dropover' : '']")

</template>

<script>
import ContentFunctions from '../lib/ContentFunctions'

export default {
  name: 'content-children',
  components: {
  },
  props: {
    editcontext: Object,
    element: Object
  },
  data: function () {
    return {
      chickens2: 'kljgasdgy'
    }
  },
  methods: {
    // The drop event normally provides (data, event) but we've added (element, child, ...) in front.
    handleDrop (element, child, data, event) {
      console.log(`Children.handleDrop(element=${element.id}, child=${child?child.id:'\"null\"'}), data=`, data)

      if (data.dragtype != 'component') {
        console.log(`Dropped non-component: '${data.dragtype}'`)
        return
      }

      // Get the element to be inserted, from the drop data.
      let newchild = data.element

      // Note that 'child' is the existing child, not the child being inserted.
      if (child) {
        // Insert before the specified child.
        for (var i = 0; i < element.children.length; i++) {
          if (element.children[i] === child) {
            console.log(`Insert at position ${i}`)
            this.$store.commit('contentLayout/insertChild', { element, child: newchild, position: i })
            break
          }
        }
      } else {
        // No child specified - add at the end
        this.$store.commit('contentLayout/insertChild', { element, child: newchild, position: -1 })
      }
    }
  },
  computed: {
    ...ContentFunctions.computed,
  },

  created () {
    console.error(`ContentFunctions=`, ContentFunctions.computed)
  }
}
</script>

<style lang="scss" scoped>
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
  border: dashed 1px magenta;
}
.dropover {
  background-color: #ccc;
  border: dashed 1px cyan;
}
</style>
