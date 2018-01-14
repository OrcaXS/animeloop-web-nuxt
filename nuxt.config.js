// const VueI18n = require('vue-i18n');
const i18nExtensions = require('vue-i18n-extensions');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'animeloop-web-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: 'Animeloop-nuxt' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#1E50A2' },
  loading: '~/components/Loading.vue',
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-i18n', '@fortawesome/vue-fontawesome'],
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  css: [
    '@fortawesome/fontawesome/styles.css',
    // join(__dirname, 'assets/css/mediaquery.css'),
    // { src: 'assets/css/mediaqueryshit.css', lang: 'postcss' },
  ],

  render: {
    // confiture `render`
    // see Nuxt.js docs: https://nuxtjs.org/api/configuration-render#bundleRenderer
    bundleRenderer: {
      directives: {
        t: i18nExtensions.directive,
      },
    },
  },

  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/cookies.js',
    '~/plugins/font-awesome.js',
    { src: '~/plugins/v-click-outside', ssr: false },
  ],

  router: {
    middleware: 'setLang',
  },

  modules: [
    '@nuxtjs/webpackmonitor',
    'nuxt-webpackdashboard',
  ],
};
