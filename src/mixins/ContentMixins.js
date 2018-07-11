import FileSaver from 'file-saver'

export default {
  computed: {

    extraDebug: function () {
      if (this.$store && this.$store.state && this.$store.state.contentLayout) {
        return this.$store.state.contentLayout.extraDebug
      }
      console.error('this.$store.state.contentLayout.extraDebug not defined');
      return true
    },

    isEditing: function () {
      switch (this.$store.state.contentLayout.mode) {
        case 'view':
        case 'live':
          return false
      }
      return true
    },

    pageEditMode: function () {
      if (this.$store && this.$store.state && this.$store.state.contentLayout && this.$store.state.contentLayout.mode) {
        return this.$store.state.contentLayout.mode
      }
      return 'view'
    },

    editModeClass: function () {
      if (this.$store && this.$store.state && this.$store.state.contentLayout && this.$store.state.contentLayout.mode) {
        return `c-edit-mode-${this.$store.state.contentLayout.mode}`
      }
      return 'c-edit-mode-view'
    },

    debugClass () {
      return (this.pageEditMode === 'debug') ? 'tt-debug' : ''
    },

    showDropAreas () {
      //console.log(`++++ showDropAreas: `, this.pageEditMode)
      if (this.pageEditMode === 'layout' || this.pageEditMode === 'debug') {
        return true
      }
      if (this.pageEditMode === 'edit' && this.$store.state.contentLayout.dragging) {
        return true
      }
      return false
    }

  },

  methods: {
    selectThisElement () {
      console.log(`selectThisElement()`)
      if (this.pageEditMode != 'view') {
        let element = this.element
        this.$store.commit('contentLayout/setPropertyElement', { element })
      }
    },

    copyStyle (from, to, name) {
      if (from[name]) {
        to[name] = from[name]
      }
    },

    safeJSON: function (element) {

      // Custom replacer function - gets around "TypeError: Converting circular structure to JSON"
      // Modified from http://www.johnantony.com/pretty-printing-javascript-objects-as-json/
      var replacer = function(key, value) {
        // ignore parent links (they are circular)
        if (key === '_parent') {
          return
        }
        return value
      }
      let json = JSON.stringify(element, replacer, 4);

      return json;
    },
  }
}
