export default function(from, to, name) {
  if (from[name]) {
    to[name] = from[name]
  }
}
