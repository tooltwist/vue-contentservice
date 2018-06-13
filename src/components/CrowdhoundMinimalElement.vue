<template lang="pug">
.crowdhound-comment

  .surround(v-if="element")
    // Element details
    | {{level}}: \#{{element.id}} \#{{element.rootId}} {{element.status}} ({{element.type}})
    br
    | description = {{element.description}}
    br
    | summary = {{element.summary}}
    br
    | title = {{element.title}}
    br

    // Now the children...
    div(v-for="child in element.children")
      crowdhound-minimal-element(:element="child", :level="level + 1")

</template>

<script>

export default {
  name: 'crowdhound-minimal-element',
  props: {
    element: Object,
    level: Number
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .surround {
    border: solid 1px #ccc;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

</style>
