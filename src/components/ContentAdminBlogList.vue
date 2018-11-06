<template lang="pug">
div(v-if="sane")

  content-admin-blog-list-element(:element="element", v-bind:level="0", :tenant="tenant" path-for-details="/app-settings/{TENANT}/blog/{BLOGID}")
  //- .list(v-show="selectStatus == 'loaded'")
  //-   .columns
  //-     .column.is-2.is-offset-10
  //-       .field
  //-         .control.has-icons-right
  //-           input.input.is-small.is-rounded(type="text" placeholder="filter users" v-model="filterKey" autocomplete="off")
  //-           .icon.is-small.is-right
  //-             i.fa.fa-search
  //-   table.table.is-fullwidth.is-bordered.is-narrow(:class=" {'is-hoverable': typeof(pathForDetails) === 'string'} ")
  //-     thead
  //-       tr
  //-         th(v-for="key in ourColumns" @click="sortBy(key)" :class="{ active: sortKey == key }")
  //-           | {{ key | capitalize }}
  //-           span.arrow(:class="sortOrders[key] > 0 ? 'asc' : 'dsc'")
  //-     tbody
  //-       tr(v-for="entry in filteredData" @click="selectUser(entry)")
  //-         td(v-for="key in ourColumns" :class="classForStatus(entry, key)")
  //-           //- span(v-if="key === 'icon'" v-html="icon(entry)")
  //-           .has-text-centered(v-if="key === 'icon'")
  //-             i.fa.type-icon(:class="iconClass(entry)")
  //-           span(v-else) {{entry[key]}}
</template>

<script>
  import axios from 'axios'
  import axiosError from '../lib/axiosError.js'
  import ContentAdminBlogListElement from './ContentAdminBlogListElement.vue'

  export default {
    name: 'content-admin-blog-list',
    components: {
      ContentAdminBlogListElement
    },
    props: {
      anchor: String, // Deprecated
      contentId: String,
      tenant: String
    },
    data () {
      return {
        element: null,

        selectError: false,

        // Did we pass sanity checks?
        sane: true
      }
    },
    watch: {
      anchor: function(newAnchor, oldAnchor) { // Deprecated
        this.load()
      },
      contentId: function(newAnchor, oldAnchor) {
        this.load()
      }
    },
    methods: {
      // Select the elements from the server
      load () {
        if (this.$content.disabled) {
          console.error('Contentservice disabled')
          return
        }

        // Select the elements
        let params = {
          elementId: 1000,
          withChildren: true
        }
        this.$content.select(this, '$example-thread').then(result => {

          // Use the elements
          if (result.elements.length > 0) {
            this.element = result.elements[0]
          } else {
            this.element = null
          }
        })
        .catch(e => {
          let desc = `Error loading comments`
          handleError(this, desc, params, e)
          this.selectError = true
        })
      }
    },
    created () {

      // Sanity check
      if (!this.$content) {
        console.error(`ContentLayoutEditor.created(): this.$content not defined: has ContentService been initialised?`);
        this.sane = false
        return
      }

      this.load()
      console.log(this)
    }
  }
</script>

<style scoped lang="scss">

  //$default-color:
  $dim-color: #f4f7f9;
  $inactive-color: #f06060;

  .type-icon {
    color: #4a4a4a;
  }

  .status-active {
    font-weight: 500;
    //color: red;
  }
  .status-pending {
    //color: $inactive-color;
    background-color: $dim-color;
    font-weight: 250;
    &.status-field {
      background-color: green;
      color: white;
      font-weight: 400;
    }
  }
  .status-suspended {
    //color: $inactive-color;
    font-weight: 250;
    background-color: $dim-color;
    &.status-field {
      background-color: blue;
      color: white;
    }
  }
  .status-closed {
    //color: $inactive-color;
    font-weight: 250;
    background-color: $dim-color;
    &.status-field {
      background-color: red;
      color: white;
    }
  }
  .status-blacklisted {
    //color: $inactive-color;
    font-weight: 250;
    background-color: $dim-color;
    &.status-field {
      background-color: black;
      color: white;
    }
  }


  $table-color: #147698;
  // $table-color: #209cee;
  $hover-color: #e6edf4;

  table {
    font-family: "Avenir Next", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #4a4a4a;

    border: solid 1px $table-color;

    cursor: default;
    &.is-hoverable {
      cursor: pointer;
    }
  }

  th {
    background-color: $table-color;
    // color: rgba(255,255,255,0.66);
    //background-color: #666;
    //color: #f0f0f0;
    //color: white;
    color: white !important;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: 400;
    padding-left: 4px;
    white-space: nowrap;
  }

  th.active {
    // color: blue;
    color: #ffffff;
    font-weight: 600;
  }

  th.active .arrow {
    opacity: 1;
  }

  td {
    padding-left: 4px;
  }

  tr:hover {
    background-color: $hover-color;
  }

  .arrow {
    color: black;
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    //opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>
