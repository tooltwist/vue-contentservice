
module.exports = function (vm, url, params, e) {
  console.log('API ERROR')
  console.log('---------v')
  let msg = 'Error calling server'
  console.error(`Error calling API server:`)
  console.log(`${url}`)
  if (params) {
    console.log(params)
  }
  if (e.response) {
    console.log(`Status: ${e.response.status} ${e.response.statusText}`)
    if (e.response.data) {
      if (e.response.data.Error) {
        console.log(`Error: ${e.response.data.Error}`)
      }
      if (e.response.data.Code) {
        console.log(`Code: ${e.response.data.code}`)
      }
      if (e.response.data.Message) {
        console.log(`Message: ${e.response.data.message}`)
        msg = e.response.data.message
      }
      console.log('response.data: ', e.response.data)
    }
  } else {
    // Network error from browser
    // See https://github.com/axios/axios/issues/383#issuecomment-234079506
    console.error(`Could not contact server.`)
    console.log(`Error:`, e)
    msg = 'Could not communicate with server'
  }

  // Display an error on the screen
  if (vm && vm.$toast) {
    vm.$toast.open({ message: `${msg}`, type: 'is-danger' })
  } else {
    alert(msg)
  }
}
