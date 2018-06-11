module.exports = function(from, to, name) {
  if (from[name]) {
    to[name] = from[name]
  }
}
