import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - cyballot',
    title: 'cyballot',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/animate.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/toast',
    '@nuxtjs/strapi',
    // '@nuxtjs/axios',
    // '@nuxtjs/auth-next',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  //   axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  //   baseURL: process.env.API_URL || "http://127.0.0.1:1337",
  //   credentials: true,
  // },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.API_URL || "http://127.0.0.1:1337",
  //   }
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.API_URL || "http://127.0.0.1:1337",
  //   }
  // },

  toast: {
    // iconPack: 'fontawesome',
    position: 'bottom-left',
    duration: 5000
  },

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/auth/local', method: 'post', propertyName: 'jwt' },
  //         user: { url: '/user', method: 'get', propertyName: 'user' },
  //         // logout: { url: '/', method: 'get' }
  //         // logout: false
  //       }
  //     }
  //   },
  //   redirect: {
  //     login: '/',
  //     logout: '/',
  //     home: '/balloting'
  //   },
  //   localStorage: false,
  //   cookie: false,
  //   vuex: {
  //     namespace: 'auth'
  //   }
  // },

  // router: {
  //   middleware: ['auth']
  // },
  
  strapi: {
    url: process.env.API_URL || "http://jakestation:1337",
    entities: [
      'users',
      'institutions'
    ],
  },
  

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
