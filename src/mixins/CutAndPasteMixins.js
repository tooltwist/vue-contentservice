import FileSaver from 'file-saver'

export default {
  computed: {
    //
    // extraDebug: function () {
    //   if (this.$store && this.$store.state && this.$store.state.contentLayout) {
    //     return this.$store.state.contentLayout.extraDebug
    //   }
    //   console.error('this.$store.state.contentLayout.extraDebug not defined');
    //   return true
    // },
    //
    // isEditing: function () {
    //   switch (this.$store.state.contentLayout.mode) {
    //     case 'view':
    //     case 'live':
    //       return false
    //   }
    //   return true
    // },
    //
    // pageEditMode: function () {
    //   if (this.$store && this.$store.state && this.$store.state.contentLayout && this.$store.state.contentLayout.mode) {
    //     return this.$store.state.contentLayout.mode
    //   }
    //   return mode
    // },
    //
    // debugClass () {
    //   return (this.pageEditMode === 'debug') ? 'tt-debug' : ''
    // },
    //
    // showDropAreas () {
    //   //console.log(`++++ showDropAreas: `, this.pageEditMode)
    //   if (this.pageEditMode === 'layout' || this.pageEditMode === 'debug') {
    //     return true
    //   }
    //   if (this.pageEditMode === 'edit' && this.$store.state.contentLayout.dragging) {
    //     return true
    //   }
    //   return false
    // }

  },

  methods: {
    // selectThisElement () {
    //   console.log(`selectThisElement()`)
    //   if (this.pageEditMode != 'view') {
    //     let element = this.element
    //     this.$store.commit('contentLayout/setPropertyElement', { element })
    //   }
    // },
    //
    // copyStyle (from, to, name) {
    //   if (from[name]) {
    //     to[name] = from[name]
    //   }
    // },
    //
    // safeJSON: function (element) {
    //
    //   // Custom replacer function - gets around "TypeError: Converting circular structure to JSON"
    //   // Modified from http://www.johnantony.com/pretty-printing-javascript-objects-as-json/
    //   var replacer = function(key, value) {
    //     // ignore parent links (they are circular)
    //     if (key === '_parent') {
    //       return
    //     }
    //     return value
    //   }
    //   let json = JSON.stringify(element, replacer, 4);
    //
    //   return json;
    // },

    /*
     *  Methods related to cut/copy/paste, delete, and download/drop.
    */
    deleteMyElement ( ) {
      console.log(`Deleting element ${this.element.id}`)
      this.$store.dispatch('contentLayout/deleteElementAction', { vm: this, element: this.element })
    },

    myElementCopyToClipboard ( ) {
      console.log(`myElementCopyToClipboard()`)
      return this.bundleMyElement()
    },

    myElementCutToClipboard ( ) {
      console.log(`myElementCutToClipboard()`)
      let json = this.bundleMyElement()
      this.$store.dispatch('contentLayout/deleteElementAction', { vm: this, element: this.element })
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
      if (this.$store.state.contentLayout.anchor) {
        filename += '-' + this.$store.state.contentLayout.anchor.substring(1)
      }
      filename += `-${this.element.type}-${this.element.id}.txt`
      FileSaver.saveAs(blob, filename);
    },

    // Create a nicely packaged payload.
    bundleMyElement () {

      let payload = {
        type: 'contentservice.io',
        version: '1.0',
        source: this.$store.state.contentLayout.anchor,
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
