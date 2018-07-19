import FileSaver from 'file-saver'

export default {
  props: {
    element: Object
  },
  computed: {
    isExpandedElement: function ( ) {
      if (this.element === this.$store.state.contentLayout.expandedElement) {
        return true
      }
      return false
    },

    isSelectedElement: function ( ) {
      if (this.element === this.$store.state.contentLayout.propertyElement) {
        return true
      }
      return false
    }

  },

  methods: {

    propertyClass ( ) {
      let cls = ''
      if (this.element === this.$store.state.contentLayout.expandedElement) {
        cls += ' c-expanded'
      }
      if (this.element === this.$store.state.contentLayout.propertyElement) {
        cls += ' c-selected'
      }
      return cls
    },

    setExpandedElement () {
      console.log(`setExpandedElement()`)
      if (this.pageEditMode != 'view') {
        this.$store.commit('contentLayout/setExpandedElement', { element: this.element })
      }
    },

    // THESE ALL BECOME OBSOLETE
    // deleteMyElement ( ) {
    //   console.log(`Deleting element ${this.element.id}`)
    //   this.$store.dispatch('contentLayout/deleteElementAction', { vm: this, element: this.element })
    // },
    //
    // elementToClipboard ( ) {
    //   console.log(`elementToClipboard()`)
    //   return this.bundleMyElement()
    // },

    // clipboardSuccessHandler ({ value, event }) {
    //   let type = this.element.type.substring(0, 1).toUpperCase() + this.element.type.substring(1)
    //   let msg = `${type} has been copied to the clipboard`
    //   if (this.$toast) {
    //     this.$toast.open({ message: `${msg}`, type: 'is-danger' })
    //   } else {
    //     alert(msg)
    //   }
    // },
    //
    // clipboardErrorHandler ({ value, event }) {
    //   console.log('error', value)
    // },

    // Save the current element to file and download it.
    // See https://github.com/eligrey/FileSaver.js
    // downloadMyElement ( ) {
    //   console.log(`downloadElement()`)
    //   let json = this.bundleMyElement()
    //   var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
    //
    //   let filename = 'layout'
    //   if (this.$store.state.contentLayout.anchor) {
    //     filename += '-' + this.$store.state.contentLayout.anchor.substring(1)
    //   }
    //   filename += `-${this.element.type}-${this.element.id}.txt`
    //   FileSaver.saveAs(blob, filename);
    // },

    // Create a nicely packaged payload.
    // bundleMyElement () {
    //
    //   let payload = {
    //     type: 'contentservice.io',
    //     version: '1.0',
    //     source: this.$store.state.contentLayout.anchor,
    //     timestamp: new Date(),
    //     layout: this.element
    //   }
    //   if (this.$authservice && this.$authservice.user) {
    //     payload.user = this.$authservice.user
    //     payload.username = this.$authservice.user.fullname
    //   }
    //   let json = JSON.stringify(payload, null, 2);
    //   return json
    // },
  }
}
