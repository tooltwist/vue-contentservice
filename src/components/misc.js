/* @ f low */

//module.exports.assert = function (condition, message) {
export function assert (condition, message) {
  if (!condition) {
    throw new Error(`[vue-contentservice] ${message}`)
  }
}

export function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    /* eslint-disable no-console */
    typeof console !== 'undefined' && console.warn(`[vue-contentservice] ${message}`)
    /* eslint-enable no-console */
  }
}

export function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

export const inBrowser = typeof window !== 'undefined'
