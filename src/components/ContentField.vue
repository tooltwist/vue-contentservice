<template lang="pug">

  .x(v-bind:class="[(cPageEditMode=='debug') ? 'tt-field-outline' : '']")

    // Preview mode
    .tt-field(v-if="cPageEditMode==='view'")
      .field
        // Label
        .label(@click="clickEditLabel") {{protectedLabel}}
        // Input field
        .control
          input.input(@click="clickEditPlaceholder" type="text", :placeholder="protectedPlaceholder", :readonly="((cPageEditMode=='view') ? '' : 'readonly')")
        // Help
        p.help(@click="clickEditHelp") {{protectedHelp}}

    // Edit mode
    .tt-field(v-else-if="cPageEditMode==='edit'", v-on:click.stop="select(element)")
      .field(v-on:click="select(element)")
        // Label
        .label(@click="clickEditLabel") {{protectedLabel}}
        input.input.tt-field-edit(v-if="cPageEditMode=='edit' && editingLabel", v-model="protectedLabel")
        // Input field
        .control
          input.input(@click="clickEditPlaceholder" type="text", :placeholder="protectedPlaceholder", :readonly="((cPageEditMode=='view') ? '' : 'readonly')")
          //input.input.tt-field-edit(v-if="cPageEditMode=='edit' && editingPlaceholder", v-model="protectedPlaceholder")
        // Help
        p.help(@click="clickEditHelp") {{protectedHelp}}
        //input.input.tt-field-edit(v-if="cPageEditMode=='edit' && editingHelp", v-model="protectedHelp")

    // Debug mode
    .tt-field(v-else-if="cPageEditMode==='debug'", v-on:click.stop="select(element)")
      .tt-field-debug-heading field
      .field(v-on:click="select(element)")
        // Label
        .label(@click="clickEditLabel") {{protectedLabel}}
        input.input.tt-field-edit(v-if="cPageEditMode=='edit' && editingLabel", v-model="protectedLabel")
        // Input field
        .control
          input.input(@click="clickEditPlaceholder" type="text", :placeholder="protectedPlaceholder", :readonly="((cPageEditMode=='view') ? '' : 'readonly')")
          input.input.tt-field-edit(v-if="cPageEditMode=='edit' && editingPlaceholder", v-model="protectedPlaceholder")
        // Help
        p.help(@click="clickEditHelp") {{protectedHelp}}
        input.input.tt-field-edit(v-if="cPageEditMode=='edit' && editingHelp", v-model="protectedHelp")

    // Live
    .tt-field(v-else)
      .field
        // Label
        .label(@click="clickEditLabel") {{protectedLabel}}
        // Input field
        .control
          input.input(@click="clickEditPlaceholder" type="text", :placeholder="protectedPlaceholder", :readonly="((cPageEditMode=='view') ? '' : 'readonly')")
        // Help
        p.help(@click="clickEditHelp") {{protectedHelp}}

</template>

<script>
import copyStyle from '../lib/copyStyle.js'
import ProtectedTooltwistField from '../lib/ProtectedTooltwistField.js'

export default {
  name: 'content-field',
  components: {
  },
  props: {
    editcontext: Object,
    element: Object,
  },
  data: function () {
    return {
      'editingLabel': false,
      'editingPlaceholder': false,
      'editingHelp': false,
    }
  },
  methods: {
    clickEditLabel (node) {
      if (this.cPageEditMode != 'edit') {
        this.editingLabel = false
      } else {
        this.editingLabel = !this.editingLabel
      }
    },
    clickEditPlaceholder (node) {
      if (this.cPageEditMode != 'edit') {
        this.editingPlaceholder = false
      } else {
        this.editingPlaceholder = !this.editingPlaceholder
      }
    },
    clickEditHelp (node) {
      if (this.cPageEditMode != 'edit') {
        this.editingHelp = false
      } else {
        this.editingHelp = !this.editingHelp
      }
    },
    // Select this element
    select (element) {
      console.log('Field.select()')

      if (this.cPageEditMode != 'view') {
        this.$store.commit('contentLayout/setPropertyElement', { element })
      }
    },
  },
  computed: {

    cPageEditMode: function () {
      return this.$store.state.contentLayout.mode
    },

    ...ProtectedTooltwistField('label'),
    ...ProtectedTooltwistField('placeholder'),
    ...ProtectedTooltwistField('help'),

  }
}
</script>

<style lang="scss" scoped>
.tt-field-outline {
  border: dashed 1px #ccc;
  margin: 1px;
}
.tt-field-debug-heading {
  background-color: #ccc;
  color: black;
  font-size: 9px;
  text-align: center;
}
.tt-field {
  margin-bottom: 10px;
}
.tt-field-edit {
  font-size: 9px;
  background-color: #ffff99;
}
</style>
