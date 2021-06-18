# Adding to a Nuxt Project


<!--YARP nuxt-bulma, etc? -->

```bash
npm install @tooltwist/vue-loginservice debounce vue-awesome vue-bulma --save

    or

yarn add @tooltwist/vue-loginservice debounce vue-awesome vue-bulma
```

Loginservice is added to a Nuxt project by creating a Nuxt plugin.

`~/plugins/vue-loginservice`:
```vue
import Vue from 'vue'
import Loginservice from 'vue-loginservice'

Vue.use(Loginservice, options)
```

`nuxt.config.js`:
```JS
module.exports = {
  ...
  plugins: [
    ...
    { src: '~plugins/vue-loginservice.js', ssr: false },
  ],
}
```

> Note: this is plugins under module.exports, not to be confused with any of the Webpack plugins defined inside build.


### Create the Login Page
```html
<template lang="pug">
  .my-login-page
    my-header
    section
      loginservice-login
    my-footer
</template>
```

### Access User Details

From your template:
```html
<template lang="pug">
  div
    // Display the user's name, or a link to the Login page
    h1(v-if="$loginservice.user") Hello {{$loginservice.user.firstname}}
    router-link(v-else to="login") Sign In
</template>
```
From your code:
```JS
methods: {
  doSomething: function () {
    let jwt = this.$loginservice.jwt // Can be passed to a backend server
    let user = this.$loginservice.user // null if not logged in
  }
}
```













To get started quickly, the Tooltwist has created a [starter template](https://github.com/tooltwist/nuxt-starter-template).

[Download the .zip](https://github.com/tooltwist/nuxt-starter-template/archive/master.zip) starter template or install it with vue-cli:

```bash
$ vue init tooltwist/nuxt-starter-template my-project
```

If [vue-cli](https://github.com/vuejs/vue-cli) is not installed, please install it with `npm install -g vue-cli`

then install the dependencies:

```bash
$ cd <project-name>
$ npm install
```

and launch the project with:

```bash
$ npm run dev
```

The application is now running on http://localhost:3000.

<p class="tip">Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.</p>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).

## Steps To Create a Project Manually

These steps were used to create the template directory in this repo.


### Before Starting

- [Install nodeJS/npm](https://nodejs.org/en/download/)
- [Install Atom (editor)](https://atom.io/)

> <b>Notes for Atom<b>:
> - Use ⌘-t to jump to a file quickly.
> - Use shift-⌘-t-\ to show the currently open file in the tree on the left.

### Create a default Nuxt project

```bash
$ vue init nuxt/starter <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

<p class="tip"><b>Info:</b> replace <code>&lt;project-name&gt;</nom-du-projet></code> by the name of the project.</p>


Open browser at http://localhost:3000.

> <b>Notes<b>:
> - Look at pages/index.vue
>   - Make a change and see it appear on the browser.
>   - Notice the 3 sections to the page -&lt;template&gt; contains html, &lt;script&gt; contains Javascript, and &lt;style&gt; contains CSS.
> - Look at components/AppLogo.vue
>   - Contains sections, similar to index.vue, but missing &lt;script> (he &lt;script&gt; and &lt;style&gt; sections are optional).
>   - Notice that index.vue:
>     - imports AppLogo.vue
>     - registers it as a component
>     - uses it in the HTML, as &lt;app-logo&gt;&lt;/app-logo&gt;



### Add Pug, SCSS

```bash
npm install --save-dev pug@2.0.0-beta6 pug-loader node-sass sass-loader
```

Modify `pages/index.vue` to use Pug:

```vue
<template lang="pug">
  section.container.has-text-centered
    div
      app-logo
      h1.title
        | j1
      h2.subtitle
        | Nuxt.js project
      .links
        a.button--green(href="https://nuxtjs.org/", target="_blank") Documentation
        a.button--grey(href="https://github.com/nuxt/nuxt.js", target="_blank") GitHub
</template>

```

Check the page still works.


> Notes:
> - uses indentation to indicate nesting, which removes the need for closing tags.
> - uses CSS-like syntax for tags definitions: `h1.title#heading Hello` is equivalent to `<h1 class=“title” id=“heading”>Hello</h1>`
> - Everything is assumed a tag unless prfixed with `‘|’`.
> - Indentation must correctly reflect the nesting of the html elements.

Details about ‘pug’ (previously called ‘jade’) can be found at https://pugjs.org.



### Add Bulma / Buefy

```bash
npm install nuxt-buefy --save
```

In `nuxt.config.js` add:


```JS
modules: [
  ['nuxt-buefy'],
],
buefy: { defaultIconPack: 'fas' }
```

<p class="tip">Bulma = CSS library, like Bootstrap but newer and simpler. It makes creating responsive pages easy. See `https://bulma.io/documentation`</p>

Modify `pages/index.vue`:
- Remove the styles (we’ll use Bulma instead):

  ```vue
  <style>
  </style>
  ```
- Delete the .links section and it’s two buttons.

- Do alignment using Bulma classes. Modify the template to match this div section.container.has-text-centered br br app-logo
  ```vue
    section.container.has-text-centered
      br
      h1.title.is-1
        | z58b
      h2.subtitle.is-4
        | Nuxt.js project
  ```

Restart the server and see how this looks in the browser.

- Add a box using Bulma, below the subtitle, with the same indent as h2:
  ```vue
  br
  .box
    | Some nice text can go inside this box.
  ```

<p class="tip">
Buefy = Reusable components for VueJS, using Bulma https://buefy.github.io/#/documentation/start
<br>
Bulma only provides CSS. Buefy provides components that extends Bulma’s CSS and may also contain Javascript code.
</p>


Add the following below the box code from above (with the same indent):
```vue
br
b-collapse(:open="false")
  button.button.is-primary(slot="trigger") Click me!
  br
  .notification
    .content
      h3.subtitle.is-4 Blurb
      p
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        | Nulla accumsan, metus ultrices eleifend gravida, nulla nunceu lectus.
        | Ut vulputate semper dui. Fusce erat odio, sollicitudin vel.
```

<p class="tip">
Note that the button defined here is NOT the same as the default buttons that came with the generated project. The button—green and button—grey came from `layouts/default.vue`, whereas classes button and is-primary come from Bulma.
</p>


### Add Font-awesome

```bash
npm install @nuxtjs/font-awesome --save
```

In `nuxt.config.js` add:

```JS
modules: [
  ['nuxt-buefy'],
  '@nuxtjs/font-awesome',
],
```

In `pages/index.vue`:

```vue
.box
  i.fa.fa-user
  | &nbsp; Some nice text can go inside this box.
```

Restart the server and see how it looks.


### Adjusting the Site

#### Add a Header and Footer
- Copy `/assets/images/*` from new-nuxt-project.zip into your project
- Add `components/PublicHeader.vue`:

  ```vue
  <template lang="pug">
     // styles defined in assets/scss/main.cscc
      nav.navbar.is-dark.is-fixed-top.my-header
        .container
          .navbar-brand
            router-link.navbar-item(to="/")
              img(src="@/assets/images/tooltwist-logo-white.png", alt="My Project")

            .navbar-burger.burger(data-target="navbarExampleTransparentExample", @click="toggleNavbar()", v-bind:class="{'is-active': isActive}")
              span
              span
              span
          //- navbar-brand

          #navbarExampleTransparentExample.navbar-menu(v-bind:class="{'is-active': isActive}")
            .navbar-start
              router-link.navbar-item(to="/publicPage") publicPage
              router-link.navbar-item(to="/user/privatePage") privatePage
            //- navbar-start

            .navbar-end
              .navbar-item.has-text-grey-light.is-size-7.has-text-weight-light(v-show="isLoggedIn") [ {{userTitle}} ]
              router-link.navbar-item(v-show="!isLoggedIn", to="/login") Login
              a.navbar-item(v-show="isLoggedIn", @click="doLogout") Sign out
            //- navbar-end

          //- navbar-menu
        //- container
      //- nav
    </template>

    <script>
    export default {
      data: function() {
        return {
          isActive: false
        }
      },
      methods: {
        toggleNavbar() {
          this.isActive = !this.isActive
        },
        doLogout: function () {
          this.$loginservice.logout()
          this.$router.push('/')
        }
      },
      computed: {
        isLoggedIn: function () {
          if (this.$loginservice && this.$loginservice.user) {
            return true;
          }
          return false;
        },
        userTitle: function () {
          if (this.$loginservice && this.$loginservice.user) {
            if (this.$loginservice.user.username) {
              return this.$loginservice.user.username
            } else {
              return this.$loginservice.user.email
            }
          }
          return null
        }
      }
    }
    </script>
  ```
- Add `components/PublicFooter.vue`:
  ```vue
  <template lang="pug">
     // styles defined in assets/scss/main.cscc
     footer.footer.has-background-dark.has-text-light.has-text-centered.my-footer
       | Copyright &copy; ToolTwist 2018
   </template>
  ```
- Add `assets/scss/main.scss`:
  This contains styles that will be applied across the website.
  ```scss
  // Positioning of the footer
  $my-header-height: 52;
  $my-footer-height: 42;

  .above-my-footer {
    display: block;
    top: 0px;
    min-height: calc(100vh - #{$my-footer-height}px);
    padding-top: #{$my-header-height}px;
  }
  .my-footer {
    height: $my-footer-height;
    padding-top: 8px;
    padding-bottom: 10px;
    border-top: solid 1px #e0e0e0;
    border-bottom: solid 1px #e0e0e0;
  }
  ```
- Load the styles globally, by adding it to `nuxt.config.js`:
  ```
  module.exports = { … css: [ { src: '@/assets/scss/main.scss', lang: 'sass' } ], }
  ```


#### Update `layouts/default.vue`:

- remove .button—green and .button-grey and also their hover classes.
- import the header and footer.
- use header and footer on the page
- use the .above-my-footer and .my-footer classes to position the footer div .above-my-footer public-header nuxt
  ```
    public-footer.my-footer
  ```

The page should now have a header and footer.

#### Add a Couple of Pages
- Add `pages/publicPage.vue`:
  ```
  section.container br br h1.title Public Page br | This page can be seen irrespective of whether the user is logged in. <script> </script> <style> </style>
  ```
- Add `pages/user/privatePage.vue`:
  ```
  section.container br br h1.title Private Page br | This page should only be seen when the user is logged in. <script> </script> <style> </style>
  ```


You should now be able to navigate to these pages using the navbar at the top of the page.

<p class="tip">
Resize the screen and see how it adjusts. When the screen gets small enough it replaces the menu options with a “burger”, for mobile devices. This functionality is provided by a combination of Bulma and the toggleNavbar() method in PublicHeader.vue.
</p>


### Install libraries
```bash
npm install axios debounce v-hotkey vue-drag-drop vue-froala-wysiwyg vue-split-panel vue-awesome --save

npm install vue-loginservice vue-contentservice --save
```
- In nuxt.config.js:

  ```JS
  const nodeExternals = require('webpack-node-externals')
  const webpack = require('webpack')

  module.exports = {
    …
    build: {
      …
      extend…

      plugins: [
        /*
         *  These are the Webpack plugins (not to be mistaken for Nuxt plugins)
         *  https://nuxtjs.org/faq/webpack-plugins/
         */
        // https://nuxtjs.org/faq/webpack-plugins/
        // https://github.com/nuxt/nuxt.js/issues/843
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        })
      ],
    },
    …
    plugins: [
      /*
       *  These are our Nuxt plugins, defined in the /plugins directory.
       */
      { src: '~plugins/vue-awesome.js', ssr: true },
      { src: '~plugins/vue-loginservice.js', ssr: false },
      { src: '~plugins/vue-contentservice.js', ssr: false },
      { src: '~/plugins/nuxt-drag-drop.js', ssr: true },
      { src: '~/plugins/nuxt-froala.js', ssr: false },
      { src: '~/plugins/nuxt-vue-split-panel.js', ssr: false },
      { src: '~plugins/vue-hotkey.js', ssr: false },
    ],
    modules…
  ```

  <p class="tip">
  Note that there are two plugins sections. The section inside build refers to webpack plugins, while the other refers to Nuxt plugins.
  </p>

- Copy `/plugins/*` from <b>new-nuxt-project.zip</b> into your project
- Copy `/lib` from <b>new-nuxt-project.zip</b> into your project



### Using Tooltwist Components

- Copy `/protected-config/websiteConfig.js` from <b>new-nuxt-project.zip</b> into your project
- If you already have a Tooltwist account, define a new application, get an APIKey, and update `websiteConfig.js` with your new APIKey.

##### Login page

- Create `pages/login.vue`

  ```vue
  <template lang="pug">
  .my-login-page
    section
      br
      br
      loginservice-login(@userchange="onUserChange")
  </template>

  <script>
  import PublicHeader from '@/components/PublicHeader.vue'
  import PublicFooter from '@/components/PublicFooter.vue'

  export default {
    name: 'a3-login-page',
    components: {
      PublicHeader,
      PublicFooter
    },
    methods: {
      onUserChange () {
        if (this.$loginservice.user) {
          this.$router.push('/user/privatePage')
        }
      }
    }
  }
  </script>
  ```


> Notice how the menu bar changes when the user logs in:
> - Restart the server, and log in with demo/demo.
> - The computed value ‘isLoggedIn’ changes from false to true, causing the label to switch from ‘Login’ to ‘Sign out’.
> - The computed value ‘userTitle’ gets displayed when the user is logged in.


### Redirect Middleware

```
a) Some pages should be visible only when a user is logged in.

b) Other pages should not be shown when a user is logged in.

c) Using Nuxt middleware we can intercept the routing to a page, and forward instead to a different page if required.

d) The Server Side Rendering cannot access browser cookies, so the middleware cannot determine if the user is logged in. Instead it needs to return to a page to the browser that will immediately redirect to the required page, causing the middleware to run again, this time on the browser.

To provide this functionality, a Nuxt middleware named redirectIfServer is used.

```

- Copy `/middleware/only-if-logged-in.js` from <b>new-nuxt-project.zip</b> into your project.
- Copy `/pages/loginservice-redirect` from <b>new-nuxt-project.zip</b> into your project.
- Add the following to `nuxt.config.js`:
  ```JS
  module.exports = {
     …
     css: […],
    router: {
        middleware: 'only-if-logged-in'
     }
   }
  ```

<p class="tip">
Note that if you now try to go to privatePage without being logged in, you will be forwarded to the login page. Take a look at the output of npm run dev, and also the Javascript console of your browser and you will see debug messages explaining what the router is doing and why.
If you ever wonder why some pages cannot be accessed, this is the first place to look.
</p>


We should stop privatePage from being displayed in the user is not logged in.

- Add the following code in `components/PublicHeader.vue`:
  ```vue
  #navbarExampleTransparentExample.navbar-menu(v-bind:class="{'is-active': isActive}")
    .navbar-start
      router-link.navbar-item(to="/publicPage") publicPage
      router-link.navbar-item(to="/user/privatePage", v-show="isLoggedIn") privatePage
    //- navbar-start
  ```



### Bounce Page (required for social media login)

When logging in with Facebook/Google/Github/Twitter/LinkedIn the browser redirects to their authentication server, to loginservice, and finally back to an application page with the credentials provided as a URL parameter.> Our application (via vue-loginservice) saves these credentials in a cookie and will stay logged in until the user logs out.

This leaves a problem… after logging out, if the user returns to that page via the browser history or the back button, the URL parameters will log the user back in. To avoid this problem, we need to prevent the URL with the authentication parameters being saved in the browser history.

We do this with a page called loginservice-bounce. Loginservice will jump to this page with the credentials, and this page will save the credentials as a cookie then immediately redirect to the actually required application page, without the URL parameters for the credentials.

- Create `/pages/loginservice-bounce.vue` with the following:
  ```vue
  <template>
    <loginservice-bounce-component/>
  </template>
  ```
- In `plugins/vue-loginservice.js` un-comment the faceboook line:
  ```JS
  hints: {
    …
    sitename: 'ToolTwist',
    login: {
      facebook: true,       <----- here
      // google: true,
      // github: true,
      …
  ```



### Account Page

- Add a page `pages/user/account`:
  ```vue
  <template lang="pug">
  .a3-account-page
    .a3-above-the-footer
      a3-header
      section.my-header
        .container
          br
          .my-heading
            | My Profile

      br
      br
      .container
        loginservice-user-details(:tenant="$loginservice.user.tenant", :user-id="$loginservice.user.id", change-password)

    a3-footer.a3-the-footer
  </template>
  ```
- Add a link to this new page to `/components/PublicHeader`:
  ```vue
  router-link.navbar-item(to="/user/account", v-show="isLoggedIn") Account
  ```



### Next Steps

You now have a demonstration application running, however it’s running against the demonstration user database. To create your own application:

1. Go to tooltwist.com and register, click on the link in the verification email, create a new application, and allocate an APIKey. Replace the default ApiKey in /protected-config/websiteConfig.js and restart your server.

2. Create a Mailchimp/Mandrill account, and install the registration and forgot-password templates from new-nuxt-project.zip. You will also need to verify that you own the domain used to send emails to users.

3. If you wish to allow users to log in with a social media account, you will need to register the application with Facebook/Github/etc and enter the details into A3. The help links on the config pages explains how to configure Facebook, etc.
