import FileSaver from 'file-saver'

export default {
  computed: {

  },

  methods: {

    /*
     *  Methods related to cut/copy/paste, delete, and download/drop.
    */
    deleteMyElement ( ) {
      console.log(`Deleting element ${this.element.id}`)
      this.$content.deleteElement({ vm: this, element: this.element })
    },

    myElementCopyToClipboard ( ) {
      console.log(`myElementCopyToClipboard()`)
      return this.bundleMyElement()
    },

    myElementCutToClipboard ( ) {
      console.log(`myElementCutToClipboard()`)
      let json = this.bundleMyElement()
      this.$content.deleteElement({ vm: this, element: this.element })
      return json
    },

    clipboardSuccessHandler ({ value, event }) {
      let type = this.element.type.substring(0, 1).toUpperCase() + this.element.type.substring(1)
      let msg = `${type} has been copied to the clipboard`
      if (this.$toast) {
        this.$toast.open({ message: `${msg}`, type: 'is-success' })
      } else {
        alert(msg)
      }
    },

    clipboardErrorHandler ({ value, event }) {
      console.log('error', value)
    },

    // Save the current element to file and download it.
    // See https://github.com/eligrey/FileSaver.js
    downloadMyElement ( ) {
      console.log(`downloadMyElement()`)
      let json = this.bundleMyElement()
      var blob = new Blob([json], {type: "text/plain;charset=utf-8"});

      let filename = 'layout'
      if (this.$content.store.state.contentId) {
        filename += '-' + this.$content.store.state.contentId.substring(1)
      }
      filename += `-${this.element.type}-${this.element.id}.txt`
      FileSaver.saveAs(blob, filename);
    },

    // Create a nicely packaged payload.
    bundleMyElement () {

      let payload = {
        type: 'contentservice.io',
        version: '1.0',
        source: this.$content.store.state.contentId,
        timestamp: new Date(),
        layout: this.element
      }
      if (this.$authservice && this.$authservice.user) {
        payload.user = this.$authservice.user
        payload.username = this.$authservice.user.fullname
      }
      let json = JSON.stringify(payload, null, 2);
      return json
    },
  }
}
