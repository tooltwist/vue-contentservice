<template lang="pug">
  div#app
    img(src="../assets/logo.png")
    br
    br
    h1.title Layout Editing
    .columns.is-centered
      .column.is-one-fifth
        .card
          .section
            h1.title.is-4 App-provided Slot
            a(href="/layout-fixed") Fixed size area
            br
            a(href="/layout-fixed-left") Fixed area with a left pane
            br
            a(href="/layout-long") A long page
            br
            a(href="/layout-long-left") A long page with a left pane
            br

      .column.is-one-fifth
        .card
          .section

            h1.title.is-4 Layout from Crowdhound
            a(href="/crowdhound-fixed") Fixed page length
            br
            a(href="/crowdhound-fixed-left") Fixed page length + left pane
            br
            a(href="/crowdhound-long") Long page
            br
            a(href="/crowdhound-long-left") Long page + left pane
            br
            a(href="/google-sheets-variants") Google Sheets variants
            br

      .column.is-one-fifth
        .card
          .section
            h1.title.is-4 App-provided Layout
            a(href="/layout-fixed") Fixed size area
            br
            a(href="/layout-fixed-left") Fixed area with a left pane
            br
            a(href="/layout-long") A long page
            br
            a(href="/layout-long-left") A long page with a left pane
            br


</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    //HelloWorld
  },
  data () {
    return {
      editcontext: {
        showLeftPane: true,
        pageEditMode: 'view'
      },
      contentdata: null,
    }
  },
  created() {
    console.log('this.$store: ', this.$store);
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  a:visited, a:link, a:hover {
    text-decoration: none !important;
    color: green !important;
  }
  a:hover {
    color: blue !important;
  }
}
</style>
