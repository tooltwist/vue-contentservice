<template>
<div>
  <h1>Hello from Vue</h1>
  <p> {{msg}} </p>
</div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>