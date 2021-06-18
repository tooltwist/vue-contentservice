const path = require('path')
const glob = require('globby')
const cwd = path.join(__dirname, '..')
const { parse } = require('vue-docgen-api')

module.exports = async () => {

  // Initial sidebar definition
  const generatedSidebar = [
    {
      title: 'Contentservice',
      // path: 'contentservice',
      children: [
        '/',
        // 'contentservice/introduction/why-contentservice.md',
        // 'contentservice/introduction/dashboard',
        'guide/dashboard',
        'guide/faqs',
      ]
    },
    {
      title: 'Getting Started',
      children: [
        'getting-started/',
        // 'getting-started/dashboard',
        'getting-started/adding-to-vue',
        'getting-started/adding-to-vue-cli',
        'getting-started/adding-to-nuxt',
        'getting-started/adding-to-webpage',
        'getting-started/non-vue-frameworks',
        'getting-started/customizations',
      ]
    },
    {
      title: 'Browser side',
      children: [
        // 'contentservice/vue-contentservice/options',
        // 'contentservice/vue-contentservice/configuration',
        // 'contentservice/vue-contentservice/spare-before',
        'vue-contentservice/component-reference/',
        // 'contentservice/vue-contentservice/spare-after',
      ]
    },
    {
      title: 'Server side',
      children: [
        'server-side/checking-credentials',
        'server-side/double-checking',
      ]
    },
    {
      title: 'API Reference',
      children: [
        'api/',
        'api/API Reference/',
      ]
    },

  ]
  const COMPONENT_REFERENCE_INDEX = 2
  let HOST = 'https://tooltwist-com.philcal.net'
  // generatedSidebar[COMPONENT_REFERENCE_INDEX].children.push(`components/LoginserviceBounce`)

  try {
    // console.log(`cwd=`, cwd)
    // const sidebar = glob.sync('components/**/*.md', { cwd }).map(f => '/' + f)
    // console.log(`sidebar=`, sidebar)


    const generatedComponentFiles = glob.sync('components/**/*.md', { cwd })  //.map(f => '/' + f)
    for (const file of generatedComponentFiles) {
      console.log(` ==>`, file)
      generatedSidebar[COMPONENT_REFERENCE_INDEX].children.push(file)
    }
    console.log(`generatedSidebar=`, generatedSidebar)


    let components = 'yarp'
    // console.log(`Current directory: ${process.cwd()}`);

    // // const files = glob.sync('../src/components/**/*.{vue,js,jsx,ts,tsx}', { cwd, absolute: true })
    // // const files = glob.sync('../src/components/**/*.{vue,ssjsssjsjjsjsjjs}', { cwd, absolute: true })
    // const files = glob.sync('../src/components/**/*.{vue}', { cwd, absolute: true })
    // console.log(`files=`, files)
    // for (const path of files) {

    //   //       return {
    //   //         name: (await parse(path)).displayName.replace(/[^a-zA-Z0-9_]/g, ''),
    //   //         path
    //   //       }
    //   console.log(`path=`, path)
    //   // const rpath = path.substring(cwd.)
    //   // const pos = path.lastIndexOf
    // //   try {
    // //     const parseResult = await parse(path)
    // //     // console.log(`parseResult=`, parseResult)
    // //     const name = parseResult.displayName.replace(/[^a-zA-Z0-9_]/g, '')
    // //     console.log(`  -> ${name} - ${path}`)
    // //     // generatedSidebar[COMPONENT_REFERENCE_INDEX].children.push(`components/${parseResult.displayName}`)
    // //   } catch (e) {
    // //     console.log(`Error parsing ${path}`)
    // //     console.log(`e=`, e)
    // //   }
    // }


    // components = await Promise.all(
    //   glob
    //     // .sync('../src/components/**/*.{vue,js,jsx,ts,tsx}', { cwd, absolute: true })
    //     .sync('../src/components/**/*.{vue}', { cwd, absolute: true })
    //     .map(async path => {
    //       console.log(`path=`, path)
    //       return {
    //         name: (await parse(path)).displayName.replace(/[^a-zA-Z0-9_]/g, ''),
    //         path
    //       }
    //     })
    // )

    // console.log(`components 1=`, components)
  } catch (e) {
    console.log(`e=`, e)
  }


  // Additions from Styleguidist:
  // https://github.com/vue-styleguidist/vue-styleguidist/blob/dev/examples/docgen/docs/.vuepress/config.js

  return {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'Tooltwist Services',
    /**
      * Ref：https://v1.vuepress.vuejs.org/config/#description
      */
    description: 'Login Service | Tooltwist',

    /**
     * Path in Github pages where the site will be deployed.
     * e.g. https://philcal.github.io/junk2
     */
    //  base: '/junk2/',
     base: '/contentservice/',


    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
      ['meta', { name: 'theme-color', content: '#3eaf7c' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
      // repo: '',
      // editLinks: false,
      // docsDir: '',
      // editLinkText: '',
      // lastUpdated: false,
      nav: [
        {
          text: 'LoginService',
          link: `${HOST}/loginservice`,
        },
        {
          text: 'ContentService',
          link: '/'
        },
        {
          text: 'Crowdhound',
          link: `${HOST}/crowdhound`
        },
        {
          text: 'FormService',
          link: `${HOST}/formservice`
        },
        // {
        //   text: 'VuePress',
        //   link: 'https://v1.vuepress.vuejs.org'
        // }
      ],

      // See https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar-groups
      sidebar: generatedSidebar,
        // '/',
        // '/contentservice/': {
        //   title: 'Getting Started 1',
        //   collapsable: false,
        //   children: [
        //     // '',
        //     ['/contentservice/getting-started', 'Getting Started Z'],
        //     ['/contentservice/api', 'API Z'],
        //     'vue-contentservice',
        //     // 'components',
        //     'api',
        //   ]
        // },
        // '/contentservice/api': {
        //   title: 'Getting Started 1',
        //   collapsable: false,
        //   children: [
        //     // '',
        //     ['/contentservice/getting-started', 'Getting Started Z'],
        //     ['/contentservice/api', 'API Z'],
        //     'vue-contentservice',
        //     // 'components',
        //     'api',
        //   ]
        // }
      // }


      // sidebar: {
      //   '/contentservice/': [
      //     {
      //       title: 'Getting Started Z',
      //       collapsable: false,
      //       children: [
      //         // '',
      //         'getting-started',
      //         'vue-contentservice',
      //         // 'components',
      //         'api',
      //       ]
      //     },
      //     {
      //       title: 'Login Service',
      //       collapsable: false,
      //       children: [
      //         // '',
      //         'getting-started',
      //         'vue-contentservice',
      //         // 'components',
      //         'api',
      //       ]
      //     }
      //   ],
      // }
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
      '@vuepress/plugin-back-to-top',
      '@vuepress/plugin-medium-zoom',
    ]
  }
}