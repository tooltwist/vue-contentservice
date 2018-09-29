import Vue from 'vue'

import TestHomePage from './testapp/TestHomePage.vue'
// import TestContentPane from './testapp/TestContentPane.vue'
// import TestContentTriplePane from './testapp/TestContentTriplePane.vue'
// import TestContentTriplePaneWithLeftPane from './testapp/TestContentTriplePaneWithLeftPane.vue'
import TestLayoutFixed from './testapp/TestLayoutFixed.vue'
import TestLayoutFixedLeft from './testapp/TestLayoutFixedLeft.vue'
import TestLayoutLong from './testapp/TestLayoutLong.vue'
import TestLayoutLongLeft from './testapp/TestLayoutLongLeft.vue'

// import TestCrowdhoundFixed from './testapp/TestCrowdhoundFixed.vue'
// import TestCrowdhoundFixedLeft from './testapp/TestCrowdhoundFixedLeft.vue'
import TestCrowdhoundLong from './testapp/TestCrowdhoundLong.vue'
// import TestCrowdhoundLongLeft from './testapp/TestCrowdhoundLongLeft.vue'
import TestGoogleSheetsVariants from './testapp/TestGoogleSheetsVariants.vue'


import FroalaKey from './protected-config/froalaKey.js'
console.error(`FroalaKey is ${FroalaKey}`)

Vue.config.productionTip = false

// Content Service
import ContentService from './components/index.js'
const options = {
  protocol: 'http',
  host: 'uat.crowdhound.io',
  port: 80,
  version: '2.0',
  apikey: 'API10O0X1NS8FWUTO3FXKN15ZOR09',
  froalaActivationKey: FroalaKey
}
Vue.use(ContentService, options);

ContentService.store


// Now run the site
new Vue({
  render (h) {
    let currentRoute = window ? window.location.pathname : '/'
    console.log(`Route is ${currentRoute}.`)
    switch (currentRoute) {
      case '/layout-long': return h(TestLayoutLong)
      case '/layout-long-left': return h(TestLayoutLongLeft)
      case '/layout-fixed': return h(TestLayoutFixed)
      case '/layout-fixed-left': return h(TestLayoutFixedLeft)

      case '/crowdhound-long': return h(TestCrowdhoundLong)
      case '/crowdhound-long-left': return h(TestCrowdhoundLongLeft)
      case '/crowdhound-fixed': return h(TestCrowdhoundFixed)
      case '/crowdhound-fixed-left': return h(TestCrowdhoundFixedLeft)

      case '/google-sheets-variants': return h(TestGoogleSheetsVariants)
    }
    return h(TestHomePage)
  },
  store: ContentService.store
}).$mount('#app')
