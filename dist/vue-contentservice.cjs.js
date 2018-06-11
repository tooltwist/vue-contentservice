'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jwtDecode = _interopDefault(require('jwt-decode'));
var axios = _interopDefault(require('axios'));
var QueryString = _interopDefault(require('query-string'));
var axiosError = _interopDefault(require('~/lib/axiosError.js'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/* @ f low */
function assert(condition, message) {
  // export function assert (condition, message) {
  if (!condition) {
    throw new Error("[vue-contentservice] ".concat(message));
  }
}
var inBrowser = typeof window !== 'undefined';

/* @flZZow */

/*
 *  Client API for Contentservice.io
 *  See https://contentservice.io
 */
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
console.log('(index.js) 1'); //import { install } from './install'

console.log('(index.js) 2'); //const JWT_COOKIE_NAME = 'contentservice-jwt'
//const LOGIN_TIMEOUT_DAYS = 3

var NETWORK_ERROR_MSG = 'Could not contact authentication server';

var Contentservice =
/*#__PURE__*/
function () {
  // static install: (Vue) => void;
  // static version: string;
  // static install (Vue) {
  //   alert('Install 2...')
  //   // Vue.prototype.$auth = new Contentservice()
  //   Vue.prototype.$auth = 123
  //
  //   Object.defineProperty(Vue.prototype, '$content', {
  //     get () { return 987 }
  //   })
  // }
  function Contentservice(options) {
    _classCallCheck(this, Contentservice);

    console.log('&&& Contentservice constructor', options);
    this.host = options.host ? options.host : 'api.contentservice.io';
    this.port = options.port ? options.port : 80;
    this.version = options.version ? options.version : '2.0';
    this.apikey = options.apikey; // // See if we are supporting email login (default to yes)
    // if (options.login && typeof(options.login.email) !== 'undefined' && !options.login.email) {
    //   console.log(`Contentservice(): Email is NOT supported`);
    //   this.emailSupported = false;
    // } else {
    //   console.log(`Contentservice(): Email IS supported`);
    //   this.emailSupported = true;
    // }
    // // See if registration is allowed
    // if (!this.emailSupported) {
    //   // login.email: false
    //   console.log(`Contentservice(): Registration is NOT supported`);
    //   this.registrationSupported = false;
    // } else if (options.hints && typeof(options.hints.register) !== 'undefined' && !options.hints.register) {
    //   // Check for hints.register: false
    //   console.log(`Contentservice(): Registration is NOT supported`);
    //   this.registrationSupported = false;
    // } else {
    //   // We WILL allow registration. Check we have what we need.
    //   if (typeof(options.hints.register) !== 'object') {
    //     this.registrationSupported = false;
    //     console.error('options.hints.register must be false, or an object')
    //   } else if (!options.hints.register.resumeURL) {
    //     this.registrationSupported = false;
    //     console.log(`Contentservice(): Registration is NOT supported`);
    //     console.error('options.hints.register.resumeURL must be provided')
    //   } else if (typeof(options.hints.register.resumeURL) !== 'string') {
    //     this.registrationSupported = false;
    //     console.log(`Contentservice(): Registration is NOT supported`);
    //     console.error('options.hints.register.resumeURL must be a string')
    //   } else {
    //     // All good for registration
    //     this.registrationSupported = true
    //     //this.registerResume = options.hints.register.resumeURL
    //     console.log(`Contentservice(): Registration IS supported`);
    //   }
    // }
    // // See if forgotten password is allowed
    // if (!this.emailSupported) {
    //   // Email is not used (options.login.email is false)
    //   console.log(`Contentservice(): Forgotten password is NOT supported`);
    //   console.log(`(because email is not supported)`)
    //   this.forgottenPasswordSupported = false;
    // } else if (options.hints && typeof(options.hints.forgot) !== 'undefined' && !options.hints.forgot) {
    //   // Forgot password is specifically disallowed (options.hints.register is false)
    //   this.forgottenPasswordSupported = false;
    // } else {
    //   // We WILL allow forgot password. Check we have what we need.
    //   if (typeof(options.hints.forgot) !== 'object') {
    //     this.forgottenPasswordSupported = false;
    //     console.log(`Contentservice(): Forgotten password is NOT supported`);
    //     console.error('options.hints.forgot must be false, or an object')
    //   } else if (!options.hints.forgot || !options.hints.forgot.resumeURL) {
    //     this.forgottenPasswordSupported = false;
    //     console.log(`Contentservice(): Forgotten password is NOT supported`);
    //     console.error('options.hints.forgot.resumeURL must be provided')
    //   }
    //   else if (typeof(options.hints.forgot.resumeURL) !== 'string') {
    //     this.forgottenPasswordSupported = false;
    //     console.log(`Contentservice(): Forgotten password is NOT supported`);
    //     console.error('options.hints.forgot.resumeURL must be a string')
    //   } else {
    //     // All good for forgotten password
    //     this.forgottenPasswordSupported = true;
    //     this.forgotResume = options.hints.forgot.resumeURL
    //   }
    // }
    // Remember the options

    this.options = options; // Current user details
    // this.user = null
    // this.jwt = null
    // this.fromCache = false
  } // init (app: any /* Vue component instance */) {


  _createClass(Contentservice, [{
    key: "init",
    value: function init(app
    /* Vue component instance */
    ) {
      console.log('&&& ContentService.init'); // VVVVV This does not seem to be called
      // alert('za init()')

      process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(Contentservice)` " + "before creating root instance.");
    }
  }, {
    key: "endpoint",
    value: function endpoint() {
      // console.log('endpoint():', this)
      var protocol = this.protocol ? this.protocol : 'http';
      var endpoint = "".concat(protocol, "://").concat(this.host, ":").concat(this.port, "/api/").concat(this.version, "/").concat(this.apikey);
      return endpoint;
    } //----------------------------------------------------------------------------//
    //                          NEW STUFF FROM CROWDHOUND                         //
    //----------------------------------------------------------------------------//

    /**
     *	Select may be in various formats:
     *		select(vm, '$my-anchor', 'user-list', callback) - select a thread by it's anchor and anchorType.
     *		select(vm, rootId, callback) - select a thread. Anchor will not be created if it doesn't exist.
     *		select(vm, params, callback)
      *	Select may be in various formats:
     *		select(vm, '$my-anchor', 'user-list') - select a thread by it's anchor and anchorType.
     *		select(vm, rootId) - select a thread. Anchor will NOT be created if it doesn't exist.
     *		select(vm, params)
     */

  }, {
    key: "select",
    value: function select(vm, param1, param2) {
      var _this = this,
          _arguments = arguments;

      return new Promise(function (resolve, reject) {
        // return this.registerUsername.length > 2 ? null : false
        // if (this.registerUsername.length > 2) {
        // return resolve("wombat soup")
        // } else {
        //   return reject()
        // }
        if (_this.options.debug) {
          console.log('select()');
        }

        var type1 = _typeof(param1);

        var type2 = _typeof(param2);

        var type3 = typeof param3 === "undefined" ? "undefined" : _typeof(param3);

        if (_arguments.length === 3) {
          // Short form:  select(vm, anchor, anchorType)
          // Check the anchor starts with $
          var anchor = param1;
          var anchorType = param2;

          if (typeof anchor != 'string') {
            console.log('CrowdHound.select: anchor must be a string: ' + anchor + ', ' + _typeof(anchor));
            return reject(new Error('invalid anchor parameter'));
          }

          if (anchor.charAt(0) != '$') {
            console.log('CrowdHound.select: anchor must start with \'$\': ' + anchor);
            return reject(new Error('invalid anchor parameter - must start with \'$\''));
          }

          if (typeof anchorType != 'string') {
            console.log('CrowdHound.select: anchorType must be a string: ' + anchorType + ', ' + _typeof(anchorType));
            return reject(new Error('invalid anchor parameter'));
          }

          console.log('select anchor');
          var params = {
            elementId: anchor,
            type: anchorType
          };
        } else if (_arguments.length === 2) {
          if (type1 == 'object') {
            // select(vm, params)
            var params = param1;
          } else {
            // select(vm, rootId) - select a thread. Anchor will NOT be created if it doesn't exist.
            var params = {
              elementId: '' + param1
            };
          }
        } else {
          reject('Unknown parameters to CrowdHound.select'); // if (type1 == 'function') {
          //   var callback = param1;
          //   return callback(new Error('Invalid parameters'));
          // }
          // if (typeof(type4) == 'function') {
          //   var callback = param4;
          //   return callback(new Error('Invalid parameters'));
          // }
          // if (typeof(type5) == 'function') {
          //   var callback = param5;
          //   return callback(new Error('Invalid parameters'));
          // }

          return;
        } //var elementType = 'file';
        //		var url = _API_URL + '/elements?type=' + elementType;


        var url = "".concat(_this.endpoint(), "/elements"); // url = addAuthenticationToken(url);

        if (_this.options.debug) {
          console.log('URL= ' + url);
        }

        console.log('CrowdHound.select()');
        console.log('  url=' + url);
        console.log('  params=', params);
        axios({
          method: 'get',
          url: url,
          headers: {
            // 'Authorization': 'Bearer ' + this.$authservice.jwt,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          params: params
        }).then(function (response) {
          // JSON responses are automatically parsed.
          console.log("RESPONSE IS", response.data);
          var reply = response.data; // If the first item in the array is the current user, pluck it off the array now.

          var userdata = null;

          if (reply instanceof Array && reply.length > 0 && reply[0].__currentUser) {
            userdata = reply[0];
            reply.shift(); // remove from the array
          }

          var selection = {
            cooked: false,
            params: params,
            elements: reply
          };
          return resolve(selection);
        }).catch(function (e) {
          reject(e); // axiosError(vm, url, params, e)
          // this.selectError = true
          //
          // //alert("Error in CrowdHound.select()");
          // console.log("Error in CrowdHound.select(): ", e);
          // console.log("Error in CrowdHound.select(): ", e.response);
          // // return callback(error);
          //
          // console.log('this=', this)
          //
          // console.log('vm.$toast=', vm.$toast)
        }); // $.get(url, params, function selectElementsCB(reply) {
        //
        //   console.log('  reply=', reply)
        //
        //   // If the first item in the array is the current user, pluck it off the array now.
        //   if ((reply instanceof Array) && reply.length > 0 && reply[0].__currentUser) {
        //     _currentUserData = reply[0];
        //     reply.shift(); // remove from the array
        //   }
        //
        //   let selection = {
        //     cooked: false,
        //     params: params,
        //     elements: reply,
        //   };
        //   return callback(null, selection);
        // }, 'json')
        //   .fail(function(error) {
        //   //			alert("Error in CrowdHound.select()");
        //   //			console.log("Error in CrowdHound.select(): ", error);
        //   return callback(error);
        // })
      }); // new promise
    } //- select()
    //----------------------------------------------------------------------------//
    //                      BELOW HERE LIES AUTHSERVICE STUFFS                    //
    //----------------------------------------------------------------------------//
    //
    //  We've just arrived at a page.
    //  See if a JWT for the current user is provided in the URL parameters
    //  or in a cookie for this site.
    //

  }, {
    key: "checkInitialLoginStatus",
    value: function checkInitialLoginStatus(debug) {
      debug = true;
      console.log('+++++ checkInitialLoginStatus ++++++'); // If this is the browser, look for the JWT as a URL parameter

      if (window) {
        // See if we have AUTHSERVICE_JWT in the URL to this page
        var _jwt = this.getURLParameterByName("AUTHSERVICE_JWT");

        if (_jwt) {
          if (debug) {
            console.log("***");
            console.log("***");
            console.log("*** AUTHSERVICE_JWT IN URL");
            console.log("***");
            console.log("***");
          }

          var _isFromCookie = false;

          if (this.setCurrentUserFromJWT(_jwt, _isFromCookie)) {
            // Remember this JWT in a cookie for the next page.
            this.setCookie(JWT_COOKIE_NAME, _jwt, LOGIN_TIMEOUT_DAYS);
            return true;
          } else {
            // Invalid JWT
            this.removeCookie(JWT_COOKIE_NAME);
            return false;
          }
        }
      } // See if we have a cookie containing the current JWT


      var jwt = this.getCookie(JWT_COOKIE_NAME);

      if (jwt) {
        if (debug) {
          console.log("***");
          console.log("***");
          console.log("*** AUTHSERVICE_JWT IN A COOKIE");
          console.log("***");
          console.log("***");
        } // var isFromCookie = true;


        var _isFromCookie2 = false; // Check if it is stale ZZZZ

        if (this.setCurrentUserFromJWT(jwt, _isFromCookie2)) {
          // Good login from cookie
          return true;
        } else {
          // Dud cookie
          this.removeCookie(JWT_COOKIE_NAME);
          return false;
        }
      } // not a good cookie


      if (debug) {
        console.log("***");
        console.log("***");
        console.log("*** AUTHSERVICE_JWT NOT IN URL OR COOKIE");
        console.log("***");
        console.log("***");
      }

      var isFromCookie = false;
      this.setCurrentUserFromJWT(null, isFromCookie);
      return false;
    }
    /*
     *  Log in using username / password.
     */

  }, {
    key: "login",
    value: function login(email, password) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        console.log('login(email=' + email + ')'); // console.log('++++++++++ email=' + email + ', password=' + password)

        /*
         *  Call the server to authenticate the username/password.
         */

        axios({
          method: 'post',
          url: _this2.endpoint() + '/email/login',
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: {
            email: email,
            password: password
          }
        }).then(function (response) {
          // JSON responses are automatically parsed.
          // this.posts = response.data
          // console.log('axios reply (response.data)=', response.data)
          // return callback(null, response.data.data[0])
          if (response.data.status === 'ok') {
            // Logged in.
            // console.log('Back from login:', response.data)
            var jwt = response.data.jwt;
            var isFromCookie = false;

            if (_this2.setCurrentUserFromJWT(jwt, isFromCookie)) {
              // Good JWT login
              _this2.setCookie(JWT_COOKIE_NAME, jwt, LOGIN_TIMEOUT_DAYS);

              resolve(_this2.user.id);
              return;
            } else {

              // Bad JWT
              _this2.removeCookie(JWT_COOKIE_NAME);
              reject('Invalid credentials');
              return;
            }
          } else {
            // We did not sucessfully login
            // -> No current user
            var isFromCache = false;

            _this2.setCurrentUserFromJWT(null, isFromCache);

            _this2.removeCookie(JWT_COOKIE_NAME);

            reject(response.data.message);
            return;
          }
        }).catch(function (e) {
          // We did not sucessfully login
          // => No current user
          var isFromCache = false;

          _this2.setCurrentUserFromJWT(null, isFromCache);

          _this2.removeCookie(JWT_COOKIE_NAME);

          console.log("e=", e);
          console.log("e.response:", e.response);
          console.log("e.status:", e.status);

          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            console.log("e:", e);
            console.log("e.response:", e.response);
            console.log("e.data:", e.data);
            reject(e.response.data.message);
            return;
          }
        });
      }); // promise
    } // - login()

    /*
     *  Kick off the OAuth2 login process.
     */

  }, {
    key: "initiateOAuth",
    value: function initiateOAuth(me, authority, relativeResumeURL, relativeFailURL) {
      console.log("initiateOAuth(me, ".concat(authority, ")")); // See which URL we should use for errors in OAuth2 logins.
      // let errorURL = '/bower_components/pastac-login/test/test-error.html' // VVVVV
      // if (me.error) {
      //   errorURL = me.error
      // }
      // console.log('errorURL=' + errorURL)
      // Decide where we want to end up.
      // If a 'resume' URL has not been provided, we'll come back to this exact
      // same URL, however with any JWT or error parameters removed.

      var l = window.location;
      var baseURL = "".concat(l.protocol, "//").concat(l.hostname);

      if (l.port) {
        baseURL += ":".concat(l.port);
      }

      console.log('\n\nbaseURL=', baseURL); // Where to go if the login suceeds?

      var resumeURL;

      if (relativeResumeURL) {
        // Use the specified resume URL (which is a relative path)
        resumeURL = baseURL + relativeResumeURL;
      } else {
        // Use the current page, but with any JWT or error parameter removed.
        console.log('resume to current page after oauth login', l);
        var parsed = QueryString.parse(l.search);
        console.log(parsed);
        delete parsed['AUTHSERVICE_JWT'];
        delete parsed['AUTHSERVICE_ERROR'];

        var _params = QueryString.stringify(parsed);

        resumeURL = l.protocol + "//" + l.host + l.pathname;

        if (_params) {
          resumeURL += '?' + _params;
        }

        resumeURL += l.hash;
        console.log('\n\nresumeURL=', resumeURL);
        console.log(new Buffer(resumeURL).toString('base64'));
      } // Get the URL to a "bounce page". This is a page that sets the JWT
      // cookie from a URL parameter, and then redirects to the 'resume' page.


      var resume64 = new Buffer(resumeURL).toString('base64');
      var params = QueryString.stringify({
        next: resume64
      }); // let hash = `#/contentservice-bounce/${encodeURIComponent(resumeURL)}/true`
      // const hash = `/contentservice-bounce`

      var hash = ""; // const bounceURL = `${l.protocol}//${l.host}/contentservice-bounce?${params}#${hash}`

      var bounceURL = "".concat(baseURL, "/contentservice-bounce?").concat(params, "#").concat(hash);
      console.log('\n\nbounceURL=', bounceURL);
      var successURL = bounceURL; // Where to go if the login fails?

      var failURL;

      if (relativeFailURL) {
        // Use the specified error URL (which is a relative path)
        failURL = baseURL + relativeFailURL;
      } else {
        failURL = bounceURL;
      }

      console.log('successURL=' + successURL);
      console.log('successURL=' + encodeURIComponent(successURL));
      console.log('failURL=' + failURL);
      var url = "http://".concat(this.host, ":").concat(this.port, "/").concat(this.version, "/oauth2/initiate/").concat(this.apikey, "/").concat(authority);
      url += '?success=' + encodeURIComponent(successURL);
      url += '&fail=' + encodeURIComponent(failURL); // alert('Initiate URL:' + url)

      window.location = url;
    } // initiateOAuth2

    /*
     *  Log out
     */

  }, {
    key: "logout",
    value: function logout() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        // VVVVV Call the server
        var isFromCache = false;

        _this3.setCurrentUserFromJWT(null, isFromCache);

        _this3.removeCookie(JWT_COOKIE_NAME);

        resolve(0);
        return;
      }); // new Promise
    }
  }, {
    key: "register",
    value: function register(options) {
      var _this4 = this;

      console.log('$content.register()', options);
      console.log('ok 0');
      return new Promise(function (resolve, reject) {
        // let email = options.email
        // let username = options.username
        // let password = options.password
        // let firstName = options.firstName
        // let middleName = options.middleName
        // let lastName = options.lastName
        // let resume = options.resume
        console.log('ok 0a'); // Check email and password is valid

        switch (_typeof(options.email)) {
          case 'string':
            if (options.email.indexOf('@') < 1) {
              reject('Please enter a valid email address');
            }

            break;

          case 'undefined':
            return reject('options.email must be provided');

          default:
            return reject('options.email must be a string');
        } // Check we have a URL to go to after email verification.


        var registerOpts = _this4.options.hints && _this4.options.hints.register ? _this4.options.hints.register : {};

        switch (_typeof(registerOpts.resumeURL)) {
          case 'string':
            break;

          case 'undefined':
            return reject('options.hints.register.resumeURL must be provided');

          default:
            return reject('options.hints.register.resumeURL must be a string');
        }

        var params = {
          email: options.email,
          resume: registerOpts.resumeURL // Maybe check username is valid

        };
        console.log('username is ' + options.username);

        switch (_typeof(options.username)) {
          case 'string':
            var username = options.username.trim().toLowerCase();

            if (username.indexOf(' ') >= 0) {
              reject('Username may not contain spaces');
              return;
            }

            if (username.indexOf('@') >= 0) {
              reject('Username may not contain @');
              return;
            }

            params.username = username;
            break;

          case 'undefined':
            // alert('using email for username')
            params.username = params.email;
            break;

          default:
            return reject('If provided, options.username must be a string');
        } // if (me.registerRequiresUsername) {
        //   username = username.trim().toLowerCase()
        //   if (username.indexOf(' ') >= 0) {
        //     return failCallback('Username may not contain spaces')
        //   } else if (username.indexOf('@') >= 0) {
        //     return failCallback('Username may not contain @')
        //   }
        //   params.username = username
        // } else {
        //   params.username = email
        // }


        console.log('ok 1'); // Maybe check password is valid

        switch (_typeof(options.password)) {
          case 'string':
            if (options.password.length < 5) {
              return reject('Please enter a longer password');
            }

            params.password = options.password;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.password must be a string');
        }

        console.log('ok 2'); // Maybe check first name is valid

        switch (_typeof(options.firstName)) {
          case 'string':
            if (options.firstName.length < 1) {
              return reject('Please enter a first name');
            }

            params.firstName = options.firstName;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.firstName must be a string');
        }

        console.log('ok 3'); // Maybe check middle name is valid

        switch (_typeof(options.middleName)) {
          case 'string':
            if (options.middleName.length < 1) {
              return reject('Please enter a middle name');
            }

            params.middleName = options.middleName;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.middleName must be a string');
        }

        switch (_typeof(options.lastName)) {
          case 'string':
            if (options.lastName.length < 1) {
              return reject('Please enter a last name');
            }

            params.lastName = options.lastName;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.lastName must be a string');
        } // Call the server


        console.log('params=', params);
        axios({
          method: 'put',
          url: _this4.endpoint() + '/email/register',
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: params
        }).then(function (response) {
          // JSON responses are automatically parsed.
          console.log('response is ', response);

          if (response.data && response.data.status === 'ok') {
            // If we have a new JWT, re-set the current user
            if (response.jwt) {
              var jwt = response.jwt;
              var isFromCookie = false;

              if (_this4.setCurrentUserFromJWT(jwt, isFromCookie)) {
                // Good registration
                _this4.setCookie(JWT_COOKIE_NAME, jwt, LOGIN_TIMEOUT_DAYS);
              } else {
                // All okay, but no auto-login in from registration
                _this4.removeCookie(JWT_COOKIE_NAME);
              }
            }

            resolve(jwt);
            return;
          } else {
            // Display an error message
            var error = response.data && response.data.message ? response.data.message : 'Error while registering';
            reject(error);
            return;
          }
        }).catch(function (e) {
          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            // Error registering
            var error = e.response.data && e.response.data.Error ? e.response.data.Error : 'Error while registering';
            reject(error);
            return;
          }
        });
      }); // new Promise
    } // register()

  }, {
    key: "forgot",
    value: function forgot(email, options) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (!_this5.forgottenPasswordSupported) {
          var error = 'Password retrieval is not available.';
          reject(error);
          return;
        } // Check email and password is valid


        if (email === null || email.indexOf('@') < 1) {
          var _error = 'Please enter a valid email address';
          reject(_error);
          return;
        } // Decide where we want to end up.
        // If a 'resume' URL has not been provided, we'll come back to this exact
        // same URL, however with any JWT or error parameters removed.


        var l = window.location;
        var baseURL = "".concat(l.protocol, "//").concat(l.hostname);

        if (l.port) {
          baseURL += ":".concat(l.port);
        }

        console.log("this.forgotResume=".concat(_this5.forgotResume)); // Where to go when they click on the email link?

        var resumeURL = _this5.forgotResume;

        if (resumeURL.startsWith('/')) {
          resumeURL = baseURL + resumeURL;
        }

        console.log("resumeURL is ".concat(resumeURL)); // Get the URL to a "bounce page". This is a page that sets the JWT
        // cookie from a URL parameter, and then redirects to the 'resume' page.

        var resume64 = new Buffer(resumeURL).toString('base64');
        var params = QueryString.stringify({
          next: resume64
        });
        var bounceURL = "".concat(l.protocol, "//").concat(l.host, "/contentservice-bounce?").concat(params);
        console.log('bounceURL=', bounceURL); // Call the server

        console.log('params=', params);
        axios({
          method: 'post',
          url: _this5.endpoint() + '/email/forgot',
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: {
            email: email,
            resume: bounceURL
          }
        }).then(function (response) {
          // JSON responses are automatically parsed.
          if (response.data.status === 'ok') {
            // Email sent successfully
            resolve(response.data);
            return;
          } else {
            // Error sending the email
            var _error2 = response.data && response.data.message ? response.data.message : 'Error while sending email';

            reject(_error2);
            return;
          }
        }).catch(function (e) {
          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            // Error sending the email
            var _error3 = e.response.data && e.response.data.message ? e.response.data.message : 'Error while sending email';

            reject(_error3);
            return;
          }
        });
      });
    } // - forgot()
    //
    //  Get a URL parameter.
    //

  }, {
    key: "getURLParameterByName",
    value: function getURLParameterByName(name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    } // Set the current user from a JWT.
    // Does not change cookies.
    // Returns true on success.

  }, {
    key: "setCurrentUserFromJWT",
    value: function setCurrentUserFromJWT(jwt, fromCookie) {
      // console.log()
      // console.log('++++++++>  setCurrentUserFromJWT(): jwt=' + jwt)
      var haveUser = false;
      var ident = null;

      if (jwt) {
        // See https://github.com/auth0/jwt-decode
        try {
          var decoded = jwtDecode(jwt);
          console.log('decoded=', decoded);
          ident = decoded.identity;
          haveUser = true;
        } catch (e) {
          console.log('Error decoding JWT: ', e); // alert('Error decoding invalid JWT')

          haveUser = false;
        }
      } // Change the current user.
      // let oldCurrentUser = user


      if (haveUser) {
        var user = {
          tenant: ident.tenant,
          authority: ident.authority,
          avatar: ident.avatar,
          email: ident.email,
          emailStatus: ident.email_status,
          entityType: ident.entity_type,
          firstname: ident.first_name,
          fullname: ident.full_name,
          gender: ident.gender,
          id: ident.id,
          isAdmin: ident.is_admin,
          languages: ident.languages,
          lastname: ident.last_name,
          locale: ident.locale,
          location: ident.location,
          mediaPage: ident.media_page,
          middlename: ident.middle_name,
          privileges: ident.privileges,
          status: ident.status,
          timezone: ident.timezone,
          username: ident.username,
          rights: [] // type: ident.type,

        };

        if (ident.rights) {
          ident.rights.forEach(function (r) {
            var right = {
              realm: r.realm,
              name: r.name,
              sequence: r.sequence,
              value: r.value
            };
            user.rights.push(right);
          });
        } else {
          console.error("JWT does not contain field {rights}.");
        } // console.log('Setting user to ', user)


        this.user = user;
        this.jwt = jwt;
        this.fromCache = fromCookie;
        return true;
      } else {
        // No longer logged in
        this.user = null;
        this.jwt = null;
        this.fromCache = false;
        return false;
      }
    } // setCurrentUserFromJWT
    // See if a username is available

  }, {
    key: "usernameAvailability",
    value: function usernameAvailability(username) {
      var _this6 = this;

      // console.log('usernameAvailability()', username)
      return new Promise(function (resolve, reject) {
        // Check the length of the username
        username = username.trim().toLowerCase();

        if (username.length < 3) {
          reject('Username must be 3 or more characters');
          return;
        } // Ask the server if the username is in use


        var url = _this6.endpoint() + '/username-availability/' + encodeURIComponent(username); // console.log('url=', url)

        axios({
          method: 'get',
          url: url,
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then(function (response) {
          // JSON responses are automatically parsed.
          if (response.data.status === 'available') {
            // Name is available
            resolve(null);
            return;
          } else {
            // Name not available
            resolve(response.data.error);
            return;
          }
        }).catch(function (e) {
          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            // alert('Communications error: unable to determine if this username is available')
            var error = e.response.data.Error ? e.response.data.Error : 'Could not check availability';
            reject(error);
            return;
          }
        });
      }); // new Promise
    }
    /*
     *  Cookie handling
     */

  }, {
    key: "setCookie",
    value: function setCookie(cname, cvalue, exdays) {
      // console.log('setCookie(' + cname + ', ' + cvalue + ')')
      if (cvalue) {
        console.log('setting cookie (' + cname + ')');
      } else {
        console.log('clearing cookie (' + cname + ')');
      }

      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    } // setCookie()

  }, {
    key: "getCookie",
    value: function getCookie(cname) {
      // console.log('getCookie(' + cname + ')')
      var name = cname + "=";
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
          // console.log('- found cookie')
          return c.substring(name.length, c.length);
        }
      } // console.log('- no cookie with this name')


      return "";
    } // getCookie()

  }, {
    key: "removeCookie",
    value: function removeCookie(cname) {
      // console.log('removeCookie(' + cname + ')')
      this.setCookie(cname, null, 0);
    } // removeCookie()

  }, {
    key: "isEmailSupported",
    value: function isEmailSupported() {
      return this.emailSupported;
    }
  }, {
    key: "isRegistrationSupported",
    value: function isRegistrationSupported() {
      return this.registrationSupported;
    }
  }, {
    key: "isForgottenPasswordSupported",
    value: function isForgottenPasswordSupported() {
      return this.forgottenPasswordSupported;
    }
  }]);

  return Contentservice;
}(); //Contentservice.install = install // The imported install()


Contentservice.version = '__VERSION__';

if (inBrowser && window.Vue) {
  window.Vue.use(Contentservice);
}

var CrowdhoundMinimalElement = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "crowdhound-comment"
    }, [_vm.element ? _c('div', {
      staticClass: "surround"
    }, [_vm._v(_vm._s(_vm.level) + ": #" + _vm._s(_vm.element.id) + " #" + _vm._s(_vm.element.rootId) + " " + _vm._s(_vm.element.status) + " (" + _vm._s(_vm.element.type) + ")"), _c('br'), _vm._v("description = " + _vm._s(_vm.element.description)), _c('br'), _vm._v("summary = " + _vm._s(_vm.element.summary)), _c('br'), _vm._v("title = " + _vm._s(_vm.element.title)), _c('br'), _vm._l(_vm.element.children, function (child) {
      return _c('div', [_c('crowdhound-minimal-element', {
        attrs: {
          "element": child,
          "level": _vm.level + 1
        }
      })], 1);
    })], 2) : _vm._e()]);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-40628b22',
  name: 'crowdhound-minimal-element',
  props: {
    element: Object,
    level: Number
  }
};

var CrowdhoundMinimal = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "content-dummy"
    }, [_c('crowdhound-minimal-element', {
      attrs: {
        "element": _vm.element,
        "level": 0
      }
    })], 1);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-58fdeaaa',
  name: 'crowdhound-minimal',
  components: {
    CrowdhoundMinimalElement: CrowdhoundMinimalElement
  },
  props: {
    anchor: String
  },
  data: function data() {
    return {
      element: {},
      selectError: false
    };
  },
  watch: {
    anchor: function anchor(newAnchor, oldAnchor) {
      this.load();
    }
  },
  methods: {
    // Select the elements from the server
    load: function load() {
      var _this = this;

      this.$content.select(this, {
        elementId: this.anchor,
        //elementId: '$example-text-comments',
        withChildren: true
      }).then(function (result) {
        if (result.elements.length > 0) {
          _this.element = result.elements[0];
        } else {
          _this.element = null;
        }
      }).catch(function (e) {
        axiosError(vm, url, params, e);
        _this.selectError = true;
      });
    }
  },
  created: function created() {
    this.load();
  }
};

//import Vue from 'vue'
var _content = null;

function install$1(Vue, options) {
  console.log('Contentservice.install()', options);

  if (_content) {
    console.error("Vue.use(Contentservice) has already been called.");
    return;
  } // Create ourselves an Contentservice Object


  console.log('Getting our _content');
  _content = new Contentservice(options);
  console.log('Have our _content', _content); //_content.checkInitialLoginStatus(false)
  //console.log('Finished checking status')

  exports._Vue = Vue;
  // list of functions to be called when new Vue is created. We'll
  // use it to look for new Vue({ contentservice }). If found, we'll
  // consider this to be the root. If it is not found, then we will
  // assume this is a child of the root, and create pointers back
  // to the root.
  //Vue.mixin({


  Vue.mixin({
    beforeCreate: function beforeCreate() {
      // console.log('vue-contentservice: index.js - beforeCreate()')
      if (!this.$parent) {
        //if (isDef(this.$options.contentservice)) {
        // console.error('Initializing ROOT *********')
        // This must be the root, since we found contentservice in it's options.
        this._contentRoot = this;
        this._content = _content; // this._content.init(this)

        Vue.util.defineReactive(this, '_content', this.$content); // Vue.util.defineReactive(this, '_content', this._content.jwt)
        // Vue.util.defineReactive(this, '_content', this._content.fromCache)
      } else {
        //console.log('Initialise new child')
        this._contentRoot = this.$parent && this.$parent._contentRoot || this;
      }
      /*
      // this.$options is the options passed to new Vue({ })
      if (isDef(this.$options.contentservice)) {
        console.log('Initialise the root')
        // This must be the root, since we found contentservice in it's options.
        this._contentRoot = this
        this._content = this.$options.contentservice
        // this._content.init(this)
        Vue.util.defineReactive(this, '_content', this.$content)
        // Vue.util.defineReactive(this, '_content', this._content.jwt)
        // Vue.util.defineReactive(this, '_content', this._content.fromCache)
         console.log('Checking login status from beforeCreate()')
        this._content.checkInitialLoginStatus(false)
      } else {
        console.log('Initialise new child')
        this._contentRoot = (this.$parent && this.$parent._contentRoot) || this
      }
      // registerInstance(this, this)
      */

    },
    destroyed: function destroyed() {// registerInstance(this)
    }
  }); // As described above, the Vue instances form a hierachy. The mixin
  // above ensures that each instance has an '_contentRoot' field
  // that points to the instance where 'contentservice' was passed to new Vue({  }).
  // Note that it's _contentRoot might actually point to itself.

  Object.defineProperty(Vue.prototype, '$content', {
    get: function get() {
      return this._contentRoot._content;
    }
  }); // Define the components

  Vue.component('crowdhound-minimal', CrowdhoundMinimal);
  return _content;
}

var obj = {
  install: install$1
};
Object.defineProperty(obj, '_content', {
  get: function get() {
    return _content;
  }
});

exports.default = obj;
