// initial state
export const state = () => {
  return {

    // original-document-id -> { userId, docID }
    documentMap: {
      // '1ESlBwmpaCcKm7prdeCKJfVXn6hhddXn7Y6c3XLcYgis': {
      //   docID: '161rGTvEyrk2XKUmHnf54Lh1RRntvG-q_E2s4hZrx_wA', userID: null
      // },
      '1sPBBmWIVvj-ytaAgfer0-j_3eHRXba6UMIo86Ov_ml4': {
        docID: '1GtiF5fM72nok7uXCrOSX13h1DciyxY78bwoqYsIIf6Y', userID: null
      },
      '16qDqMZdIX7VY7Ka4n4k14PuVhlu5KBxv03WOeytFNl4': {
        docID: '1RB5z_EHJhqdA35NFuE9Pf-LpMnwp5soEaPcS1urg8Aw', userID: null
      }
    },

    // Refresh for some components can be activated by incrementing this counter.
    refreshCounter: 1,

    // Set to true while we are waiting for the server to scan a document
    // and generate derived documents.
    currentlyScanning: false,
    scanMessage: ''

  }
}
//})

/********************************************
 *
 *                 GETTERS
 *
 ********************************************/
export const getters = {
  replacementDocID: (state) => (docID, userID) => {
    console.log(`GETTER replacementDocument(${docID}, ${userID})`);
    let replacement = state.documentMap[docID]
    if (replacement && state.refreshCounter > 1) {
      console.log(`Found replacement document ${replacement.docID}`);
      return replacement.docID
    }
    return docID
  }
}


/********************************************
 *
 *                 ACTIONS
 *
 ********************************************/
// see https://vuex.vuejs.org/guide/actions.html
export const actions = {
  scanDocument ({ commit, state }, { vm, docID }) {
    console.log(`In Action docservice/scanDocument(docID=${docID})`)

    commit('scanState', { currentlyScanning: true, message: 'scanning...'})
    vm.$content.scanDocument(vm, docID)
      .then(result => {
        commit('scanState', { currentlyScanning: true, message: 'updating...'})
        console.log(`result of save:`, result)

        // Wait a while, to give the Google permissions time to propagate
        setTimeout(() => {
          // console.log(`result of save:`, result.data)
          result.forEach(obj => {
            console.log(`obj is `, obj);
            let originalDocumentID = obj.originalDocumentID
            let replacementDocumentID = obj.replacementDocumentID
            let userID = null
            commit('mapDocument', { originalDocumentID, replacementDocumentID, userID })
          })
          commit('scanState', { currentlyScanning: false })
          commit('refreshMutation', { })
        }, 5000)
      })
      .catch(e => {
        commit('scanState', { currentlyScanning: false })
        let desc = `Error scanning document`
        console.log(desc, e)
        //state.saveMsg = ERROR
        // commit('setSaveMsg', { msg: ERROR })
        /* handleError(this, desc, params, e) */
        //this.selectError = true
      })//- axios
    // }, SAVE_INTERVAL)
  }
}




/********************************************
 *
 *                 MUTATIONS
 *
 ********************************************/
export const mutations = {

  // Calling this mutation will trigger redrawing of any components
  // that monitor the value of 'refreshCounter'.
  refreshMutation (state, { }) {
    console.log('In Mutation refreshMutation()', state.refreshCounter)
    state.refreshCounter++
  },

  mapDocument(state, { originalDocumentID, replacementDocumentID, userID }) {
    console.log(`MUTATION mapDocument ${originalDocumentID} -> ${replacementDocumentID}`);
    state.documentMap[originalDocumentID] = {
      docID: replacementDocumentID,
      userID: null
    }
    console.log(`map is now`, state.documentMap);
  },

  scanState(state, { currentlyScanning, message }) {
    state.currentlyScanning = currentlyScanning
    state.scanMessage = currentlyScanning ? message : ''
  }


}//- mutations


export const namespaced = true




export default {
  "namespaced": true,
  state,
  mutations,
  getters,
  actions,
}
