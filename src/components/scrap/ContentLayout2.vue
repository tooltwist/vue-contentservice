<template lang="pug">

  .tt-content(:zclass="pageEditMode === 'view' ? 'tt-mode-view' : ''", :class="classForMode")
    | &lt;content-content(
    span(v-if="anchor") &nbsp;anchor
    span(v-if="layout") &nbsp;layout
    | &nbsp;)&gt;
    br
    .debug(v-if="pageEditMode=='debug'") content



    // Display the element
    .tt-content-layout(v-if="sanitizedContentComp")
      //content-children(:editcontext="editcontext", :element="sanitizedContentComp")
      content-children(:editcontext="editcontext", :element="$content.store.state.layout")

</template>

<script>


export default {
  name: 'content-content',
  props: {

    /*
     *  Three types of editing:
     *  1. manual
     *      The Layout is provided. Does not get saved to Crowdhound.
     *      - require layout
     *  2. 'layout'
     *      Layout stored in Crowdhound
     *      - require anchor
     *
     *  ZZZZZ INDIVIDUAL NO LONGER USED
     *  3. 'individual'
     *      There is no Layout. Components will need to save themselves.
     *      - require anchorPrefix
     */
    type: { // Not to confused with pageEditMode.
      type: String,
      required: true
    },

    layout: Object,
    anchor: String,
    //- anchorPrefix: String,

    editcontext: Object,


    // deprecate this. ZZZZ
    contentdata: Object,
    //element: Object,
  },
  data: function () {
    return {
        //sanitizedContent: { }
    }
  },
  computed: {

    dump() { return this.$content.elementToJson(this.contentdata.layout) },

    // Add a class, according to the current edit mode.
    classForMode () {
      switch (this.pageEditMode) {
        case 'view': return 'tt-mode-view';
        case 'edit': return 'tt-mode-edit';
        case 'layout': return 'tt-mode-layout';
        case 'debug': return 'tt-mode-debug';
        case 'live': return 'tt-mode-live';
      }
    },

    sanitizedContentComp () {
      if (this.$content && this.contentdata && this.contentdata.data && this.contentdata.data.layout) {
        //- console.log('--- 1', this.$content)
        //- console.log('--- 2', this.$content.util)
        //- console.log('--- 3', this.$content.util.sanitizeLayout)
        let sanitized = this.$content.util.sanitizeLayout(this.contentdata.data.layout)
        //console.log('sanitized:', typeof(sanitized))
        //console.log('sanitized:', sanitized)
        return sanitized
        // sanitized.tt_counter = 987
        // this.sanitizedContent = sanitized
        // console.log(`111: ${this.sanitizedContent.tt_counter}`)
        // console.log('Content.created(): sanitizedContent', this.sanitizedContent)
      } else {
        console.error('content-content: missing contentdata.data.layout')
        return { }
      }

    }

  },
  methods: {

  },
  created: function () {

    console.error(`------------------------------`)
    console.log(`anchor=`, this.anchor)
    console.log(`layout=`, this.layout)

    if (this.anchor) {

      // Have an anchor - load the content from Crowdhound
      this.$content.setContent({ vm: this, type: 'crowdhound', anchor: this.anchor })
    } else if (this.layout) {

      // Layout is provided. The store will not load or save this layout.
      this.$content.setContent({ vm: this, type: 'fixed', layout: this.layout })
    } else {
      // Incorrect props
      console.error(`content-content must be provided prop 'layout' or prop 'anchor'`)
    }
  }
}
</script>

<style lang="scss" scoped>

  // Marching Ant logic
  @mixin marching-ants-v2-init($ant-size,$ant-width,$speed,$id){
      padding: 5px + $ant-width;
      margin: 20px;
      background-size:
        $ant-size $ant-width,
        $ant-size $ant-width,
        $ant-width $ant-size,
        $ant-width $ant-size;
      background-position:
        0 0,
        0 100%,
        0 0,
        100% 0;
      background-repeat:
        repeat-x,
        repeat-x,
        repeat-y,
        repeat-y;
      animation: marching-ants-#{$id} $speed;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-play-state: paused;
    &:hover, &.marching {
      animation-play-state: running;
    }
    &.reverse {
      animation-direction: reverse;
    }
  };

  @mixin marching-ants-v2-color($a, $b){
      background-image:
        linear-gradient(to right, $a 50%, $b 50%),
        linear-gradient(to right, $a 50%, $b 50%),
        linear-gradient(to bottom, $a 50%, $b 50%),
        linear-gradient(to bottom, $a 50%, $b 50%);
  };

  @mixin marching-ants-v2-animation($ant-size, $id){
    @keyframes marching-ants-#{$id} {
      0% {
        background-position:
          0 0,
          0 100%,
          0 0,
          100% 0;
      }
      100% {
        background-position:
          2*$ant-size 0,
          -2*$ant-size 100%,
          0 -2*$ant-size,
          100% 2*$ant-size;
      }
    }
  }






// Main Styles
$edit-mode-font-size: 1.4em;
$edit-mode-button-color: magenta;
$edit-controls-height: 32px;

.tt-content {
  .debug {
    background-color: brown;
    font-size: 9px;
    color: white;
  }
}
.my-mode-button {
  margin: 2px;
}
.my-drop-areas-button {
  margin: 2px;
}
.my-dump-button {
  margin: 2px;
}

.my-enter-edit-mode {
  display: none;
  position: absolute;
  //right: 0px;
  //top: 0px;
  //right: 0px;
  font-size: $edit-mode-font-size;
  color: $edit-mode-button-color;
  margin: 5px;
  cursor: pointer;
}

.my-exit-edit-mode {
  display: relative;
  font-size: $edit-mode-font-size;
  color: $edit-mode-button-color;
  margin: 5px;
  cursor: pointer;
}
.tt-content {
  clear: both;
}
.tt-content.tt-mode-view {
}
.tt-content.tt-mode-edit {
  //border: dashed 2px magenta;
  padding-bottom: 2px;

  @include marching-ants-v2-init(5px, 2px, 4s, 1);
  @include marching-ants-v2-color(#fff,magenta);
  animation-play-state: running;
}
.tt-content.tt-mode-layout {
  //border: dashed 2px cyan;
  padding-bottom: 2px;

  @include marching-ants-v2-init(5px, 2px, 4s, 1);
  @include marching-ants-v2-color(#fff, cyan);
  animation-play-state: running;
}
.tt-content.tt-mode-debug {
  border: dashed 1px green;
}
.tt-content.tt-mode-live {
  //position: relative;
  border: dashed 1px red;
}
.Ztt-content:hover {
  box-sizing: border-box;
  border: solid 1px blue;

  .my-enter-edit-mode {
    display: block;
  }
}
.tt-content-controls {
  clear: both;
  height: $edit-controls-height;
  background-color: #f0f0f0;
  border-bottom: solid 1px #c0d0c0;
}

.control {
    background-color: red;
}
.tt-content {
  //clear: both;
  min-height: $edit-controls-height;
  //background-color: yellow;
}





.marching-ants {
  //@include marching-ants-v2-init(20px, 2px,1s,1);
  @include marching-ants-v2-init(5px, 2px, 4s, 1);

  &.bnw {
    @include marching-ants-v2-color(#fff,#000);

  }
  &.headline {
    @include marching-ants-v2-color(#fff,#444);
    color: #fff;
  }
  &.info {
    @include marching-ants-v2-color(#dd2,transparent);
    background-color: #ffa;
    color: #dd2;
  }
  &.warning {
    @include marching-ants-v2-init(40px, 4px,2s,2);
    @include marching-ants-v2-color(#f00,#fff);
    color: #a00;
    background-color: #faa;
  }
}

@include marching-ants-v2-animation(20px, 1);
@include marching-ants-v2-animation(20px, 2);
@include marching-ants-v2-animation(20px, 3);

</style>
