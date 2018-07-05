
const computed = {

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
    return mode
  },

  debugClass () {
    return (this.pageEditMode === 'debug') ? 'tt-debug' : ''
  },

  showDropAreas () {
    console.log(`++++ showDropAreas: `, this.pageEditMode)
    if (this.pageEditMode === 'layout' || this.pageEditMode === 'debug') {
      return true
    }
    if (this.pageEditMode === 'edit' && this.$store.state.contentLayout.dragging) {
      return true
    }
    return false
  }

}

export default {
  computed
}
