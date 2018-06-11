
export default function (name) {
  let protectedName = `protected${name.substring(0,1).toUpperCase()}${name.substring(1)}`
  // console.log(`protectedName=${protectedName}`)
  let obj = {
    [protectedName]: {
      get () {
        return this.element[name]
      },
      set (value) {
        // console.log('-->' + protectedName)
        this.$store.commit('contentLayout/updateElementProperty', { vm: this, element: this.element, name: name, value })
      }
    }
  }
  // console.log('obj is ', obj)
  return obj
}
