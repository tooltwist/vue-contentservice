// This panel is used by containers that have multiple layouts
// as children. For example tabbed-panes, grids, etc. We want
// to be able to show those children as layout areas, but not
// on the properties tab. They are sort of invisible.
<template lang="pug">
  .c-panel-without-properties
    content-children(:element="element", :context="context")
</template>

<script>
// import ContentMixins from '../../mixins/ContentMixins'

export default {
  props: {
    element: {
      type: Object,
      required: true
    },

    context: {
      type: Object,
      required: true
    }
  },
  // mixins: [ ContentMixins ],
}
</script>
