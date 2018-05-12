# Introduction

Instantly add content management to a VueJS or Nuxt project.

* aa
* bb
* cc




# Quick Start

```sh
npm install vue-contentservice --save

    or

yarn add vue-contentservice vue-awesome
```    

## Add to a VueJS project

When used with a module system, you must explicitly install Vuex via Vue.use():

    import Vue from 'vue'
    import Contentservice from 'vue-contentservice'
    
    Vue.use(Contentservice, options)


## Add to a Nuxt project

Contentservice is added to a Nuxt project by creating a Nuxt plugin.

~/plugins/vue-contentservice:

    import Vue from 'vue'
    import Contentservice from 'vue-contentservice'
    
    Vue.use(Contentservice, options)

nuxt.config.js:

    module.exports = {
      ...
      plugins: [
        ...
        { src: '~plugins/vue-contentservice.js', ssr: false },
      ],
    }
    
Note: this is `plugins` under `module.exports`, not to be confused with any of the Webpack plugins defined inside `build`.

## Create the Login Page

```pug
<template lang="pug">
  .my-login-page
    my-header
    section
      contentservice-text
    my-footer
</template>
```

## Access user details

From your template:

```pug
<template lang="pug">
  div
    // Display the user's name, or a link to the Login page
    h1(v-if="$content.user") Hello {{$content.user.firstname}}
    router-link(v-else to="login") Sign In
</template>
```

From your code:

```javascript
methods: {
  doSomething: function () {
    let jwt = this.$content.jwt // Can be passed to a backend server
    let user = this.$content.user // null if not logged in
  }
}
```


# Your Account Dashboard
Create a free ToolTwist account at http://tooltwist.com, and press 'Add Application' to
get an APIKey for your application. This dashboard provides user administration, metrics,
and other functionality.


# Options

vue-contentservice requires that an `options` object is passed to Vue.use().

These options relate to how your client application connects to the remote Contentservice.io server.

Some of these values may change during the different stages of your development, so the endpoint
details are best saved in a configuration file, that can be overwritten during deployment. The
convention we use is to place such a file in a directory named `protected-config/contentservice-config.js`.

protected-config/websiteConfig.js:

```javascript
/*
 *  This file gets overwritten during production deployments.
 */
module.exports = {
  contentservice: {
    host: 'contentservice.io',
    version: 'v2',
    apikey: 'API10O0X1XXXXXXXXXXXKN15ZXXX9'
  }
}
```

We then reference this file when setting our endpoints. Note that not all the values need to be defined.

```javascript
// Load the configuration. This directory should be included in .gitignore.
import Config from '../protected-config/websiteConfig'

const options = {
  protocol: Config.contentservice.protocol,
  host: Config.contentservice.host,
  port: Config.contentservice.port,
  version: Config.contentservice.version,
  apikey: Config.contentservice.apikey,
  hints: {
    sitename: 'ToolTwist',
  }
  ...
}
```

Most of these endpoint values are provided when you get the APIKEY from the ToolTwist website.


Option | Default | Notes
------ | ------- | -----------
protocol | https              | http or https
host     | api.contentservice.io | Enterprise customers have dedicated servers
port     | 80                 |
version  | v2                 |
apikey   | mandatory          | Allocate APIKEYs with your tooltwist.com account
sitename | 'this site'        | Name of your website / company, used in prompts


### Registration

Allowing users to sign up using their email address is optional. To disable
email registration, set `register` to `false`.

```javascript
    const options = {

      hints: {
        register: false,

      }
    }
```

If you _do_ want to allow user self-registration, provide the options like this:

```javascript
    const options = {

      hints: {
        register: {
          password: true,
          firstname: false,
          middlename: false,
          lastname: false,
          resumeURL: 'http://mydomain.com/welcome',
          termsMessage: 'Agree to our terms?',
          termsRoute: '/terms-and-conditions'
        },
        login : {
          registerMessage: 'Don\'t have an account yet?'
        },

      }
    }
```

For most applications it is desirable to keep the registration process as simple as possible
    
    
Option | Default | Notes
------ | ------- | -----------
password | true              | If `false` the user will not be prompted for a password.
firstname | false | Prompt the user for their first name
middlename | false | Prompt the user for their middle name
lastname | false | Prompt the user for their last name
resumeURL | mandatory | Where the useer is sent after clicking the link in the email they are sent
termsMessage | By signing up to <sitename> you agree to our EULA | Message on the bottom of the sign up page
termsRoute | /terms-and-conditions | URL of your EULA page
registerMessage | 'New to <sitename>?' | Sign in message shown on the login page
    
### Forgotten password

The optional 'forgotten password' option allows an email to be sent to the user, containing a
link to a 'reset password' page on your site. You will need to provide this page, and provide
it's URL as `resumeURL`.

```javascript
    const options = {

      hints: {
        forgot: {
          resumeURL: 'http://mydomain.com/password-reset'
        }
      }
    }
```

To disable forgotten password functionality, set `forgot` to `false`.

```javascript
    const options = {

      hints: {
        register: false,

      }
    }
```

If you _do_ want to allow user self-registration, provide the options like this:

```javascript
    const options = {

      hints: {
        register: {
          password: true,
          firstname: false,
          middlename: false,
          lastname: false,
          resumeURL: 'http://mydomain.com/welcome',
          termsMessage: 'Agree to our terms?',
          termsRoute: '/terms-and-conditions'
        },
        login : {
          registerMessage: 'Don\'t have an account yet?'
        },

      }
    }
```

### Overriding default Login options
The options for a user logging in are downloaded from the Contentservice server, and are controlled
by the Dashboard for your account at tooltwist.com.

The options below can be used to disable this login options.

For example, you may have Facebook login configured on the Admin dashboard, but do not want to
allow it from this application.

However, if you do not have Facebook login configured in the Admin dashboard, an error will occur if
you try to enable it here.

```javascript
    const options = {
      //...
      hints: {
        usernames: true,
        login: {
          email: false,
          facebook: true,
          github: true,
          google: true,
          linkedin: true,
          twitter: true,
        }
      }
    }
```

Option | Default | Notes
------ | ------- | -----------
usernames | false | Are users required to have a unique username
email | true | If disabled, the user will be forced to use a social media login
facebook | false | Allow Facebook login
github | false | Allow Github login
google | false | Allow Google login
linkedin | false | Allow Linkedin login
twitter | false | Allow Twitter login
