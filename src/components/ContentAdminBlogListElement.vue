<template lang="pug">
.crowdhound-comment

  .surround(v-if="element")
    // Element details
    //- | {{level}}: \#{{element.id}} \#{{element.rootId}} {{element.status}} ({{element.type}})
    //- br
    //- | description = {{element.description}}
    //- br
    //- | summary = {{element.summary}}
    //- br
    //- | title = {{element.title}}
    //- br

    .list(v-show="selectStatus == 'loaded'")
      .columns
        .column.is-2.is-offset-10
          .field
            .control.has-icons-right
              input.input.is-small.is-rounded(type="text" placeholder="filter blogs" v-model="filterKey" autocomplete="off")
              .icon.is-small.is-right
                i.fa.fa-search
      table.table.is-fullwidth.is-bordered.is-narrow(:class=" {'is-hoverable': typeof(pathForDetails) === 'string'} ")
        thead
          tr
            th(v-for="key in ourColumns", @click="sortBy(key)", :class="{ active: sortKey == key }")
              | {{ key | capitalize }}
              span.arrow(:class="sortOrders[key] > 0 ? 'asc' : 'dsc'")
        tbody
          tr(@click="selectBlog({tenant: element.tenant, id: element.id})")
            //-   td(v-for="key in ourColumns" :class="classForStatus(entry, key)")
            //-     //- span(v-if="key === 'icon'" v-html="icon(entry)")
            //-     .has-text-centered(v-if="key === 'icon'")
            //-       i.fa.type-icon(:class="iconClass(entry)")
            //-     span(v-else) {{entry[key]}}
            td
              span {{element.title}}
            td
              span {{element.summary}}
            td
              span {{element.description}}

    // Now the children...
    div(v-for="child in element.children")
      content-admin-blog-list-element(:element="child", :level="level + 1")

</template>

<script>

export default {
  name: 'content-admin-blog-list-element',
  props: {
    element: Object,
    level: Number,
    tenant: String,
    pathForDetails: String
  },
  data: function () {

    // Has the user provided a list of columns?
    let ourColumns = this.columns
    if (typeof(this.columns) === 'undefined') {
      ourColumns = [
        // Default only - may be replaced with 'columns' prop
        'title',
        'summary',
        'description'
      ]
    }

    // Order for sorting fields
    let sortOrders = {}
    ourColumns.forEach(function (key) {
      sortOrders[key] = 1
    })

    // Return the data fields
    return {
      sortKey: '',
      sortOrders: sortOrders,
      filterKey: '',
      ourColumns,
      locallySelectedUsers: [ ],
      selectStatus: 'loaded'
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    selectBlog: function (blog) {
      console.log(`Selected blog:`, blog)
      console.log(this.pathForDetails)
      console.log('pathForDetails:', typeof(this.pathForDetails))
      if (this.pathForDetails) {

        // Check that we have places in the path where we insert tenant and blogId.
        // For example '/myapp/{TENANT}/blog/{BLOGID}'
        const tenantMarker = '{TENANT}'
        const blogIdMarker = '{BLOGID}'
        let replaceTenant = this.pathForDetails.includes(tenantMarker);
        let replaceBlogId = this.pathForDetails.includes(blogIdMarker);

        if (replaceTenant && replaceBlogId) {

          // Work out where are jumping to
          let path = this.pathForDetails
          path = path.replace(tenantMarker, blog.tenant)
          path = path.replace(blogIdMarker, blog.id)

          // Jump to the blog details page
          // See http://router.vuejs.org/en/essentials/navigation.html
          // this.$router.push({ path: `/blog-details/${blog.tenant}/${blog.id}` })
          this.$router.push({ path: path })
        } else {
          console.error(`path-for-details must include ${tenantMarker} and ${blogIdMarker}. e.g. /blog-details/{TENANT}/{BLOGID}`)
        }
      }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
