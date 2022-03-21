export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    port: process.env.PORT,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'messages',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },

  router: {
    middleware: ['password-protect']
  },

  css: [
    './assets/css/main.scss',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-password-protect',
  ],

  axios: {
    proxy: true,
    credentials: false,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers' : '*',
      'Access-Control-Allow-Methods' : '*'
    }
  },

  proxy: {
    "/api/": {
      target: "http://message-list.appspot.com/",
      pathRewrite: { "^/api/": "" }
    }
  },

  fontawesome: {
    icons: {
      solid: [ "faBars" ],
    }
  },

  passwordProtect: {
    enabled: true,
    formPath: '/password',
    password: 'pass',
    tokenSeed: 3343490,
    queryString: '_pw',
    cookieName: '_password'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'nuxt-password-protect',
      'vue-swipe-actions',
    ],
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  }
}
