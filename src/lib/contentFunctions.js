
const computed = {

  extraDebug: function () {
    return this.$store.state.contentLayout.extraDebug
  },

  pageEditMode: function () {
    console.error(`this`, this)
    return this.$store.state.contentLayout.mode
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
