import Vue from 'vue'

// Prepare a hierarchy of elements that will be used to lay out a page.
export function sanitizeLayout (element, parent) {

  // Work out this new level
  // let level = parent ? parent.level + 1 : 0;
  //console.log(`sanitizeLayout(element, ${parent?parent.id:'-'}, ${level})`, element)

  // Create a new element ID, but do not modify an existing ID.
  if (!element.id) {
    Vue.set(element, 'id', Math.floor(Math.random() * 10000000000))
    // console.log('New Id is ', element.id)
  }

  // Check we have a parent
  element._parent = parent

  // Make sure we have a 'children' element
  if (!element.children) {
    //Vue.$set(element, 'children', [ ])
    Vue.set(element, 'children', [ ])
  }

  // Now sanitize any children
  element.children.forEach(child => {
    sanitizeLayout(child, element)
  })
  return element
}

export function safeJson (element, compressed/*boolean,optional*/) {

  let spaces = (compressed ? 0 : 4)

  // Custom replacer function - gets around "TypeError: Converting circular structure to JSON"
  // Modified from http://www.johnantony.com/pretty-printing-javascript-objects-as-json/
  var replacer = function(key, value) {
    // ignore parent links (they are circular)
    if (key === '_parent') {
      return
    }
    return value
  }
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  let json = JSON.stringify(element, replacer, spaces);

  return json;
}

export function layoutRoot (element) {
  while (element._parent) {
    element = element._parent
  }
  return element
}

export function layoutChanged (element) {
  let root = layoutRoot(element)
  root.tt_counter++
}
