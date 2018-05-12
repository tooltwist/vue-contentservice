
module.exports = function (vm, msg, params, e) {
  if (msg) {
    console.log(`${msg}`)
  }
  if (params) {
    console.log(`params=`, params)
  }
  // console.log('e=', e)
  // console.log('e.Error=', e.Error)
  // console.log('e.statusCode=', e.statusCode)
  // console.log('e.response=', e.response)
  // console.log('e.message=', e.message)
  if (e.message) {
    // An application error produced by:
    //  return reject(new Error('...'));
    console.error(`Error: ${e.message}`)
    if (e.stack) {
      console.log(e.stack)
    }
  } else if (e.response) {
    // An axios error
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
        //msg = e.response.data.message
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
