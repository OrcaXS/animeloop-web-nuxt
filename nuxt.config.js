// const VueI18n = require('vue-i18n');
const i18nExtensions = require('vue-i18n-extensions');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Animeloop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: 'Animeloop' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans' },
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
    postcss: {
      plugins: {
        'postcss-preset-env': {
          stage: 3,
          features: {
            'color-mod-function': {
              unresolved: 'warn',
            },
            'nesting-rules': true,
            'custom-media-queries': true,
          },
        },
        autoprefixer: {},
      },
    },
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
      if (!isDev) {
        // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
        // for more information about purgecss.
        config.plugins.push(new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, './pages/**/*.vue'),
            path.join(__dirname, './layouts/**/*.vue'),
            path.join(__dirname, './components/**/*.vue'),
          ]),
          whitelist: ['html', 'body', 'nuxt-loading', 'svg', 'svg-inline--fa'],
          whitelistPatternsChildren: [/^fa/],
        }));
      }
    },
  },

  css: [
    // '~/assets/css/bulma-custom.scss',
    '~/assets/css/colors.css',
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
    '@nuxtjs/pwa',
    // Simple usage
    // ['@nuxtjs/google-analytics', {
    // id: 'UA-XXXXXX-4',
    // }],
  ],

  manifest: {
    name: 'Animeloop',
    author: false,
    short_name: 'Animeloop',
    description: 'Animeloop Web Frontend',
    ogTitle: false,
    ogDescription: false,
    theme_color: '#FFFFFF',
  },

};
