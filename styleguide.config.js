const resolve = require('path').resolve; // eslint-disable-line
const rules = require('vue-webpack-loaders');

module.exports = {
  // components() {
  //   return ['components#<{(||)}>#*.vue', 'pages#<{(||)}>#*.vue'];
  // },
  styleguideDir: 'docs',
  sections: [
    {
      name: 'Components',
      sections: [
        {
          name: 'Common',
          components: 'components/Common/*.vue',
          description: 'Common Components.',
        },
        {
          name: 'Loop',
          components: 'components/Loop/*.vue',
          description: 'Components for Loop Page.',
        },
        {
          name: 'Navbar',
          components: 'components/Navbar/*.vue',
          description: 'Navbar Components.',
        },
        {
          name: 'Series',
          components: 'components/Series/*.vue',
          description: 'Components for Series/Episodes Page.',
        },
        {
          name: 'Loading',
          components: 'components/Loading.vue',
          description: 'Nuxt Loading Progress Bar.',
        },
      ],
    },
    {
      name: 'Pages',
      components: 'pages/**/*.vue',
    },
  ],
  // components: '@(components|pages)#<{(||)}>#*.vue',
  webpackConfig: {
    resolve: {
      modules: [resolve(__dirname, 'lib'), 'node_modules'],
      extensions: ['.js', '.vue'],
      alias: {
        '~': __dirname,
        '@': __dirname,
        // your aliases go here.
      },
    },

    module: {
      rules,
    },
  },
  showUsage: true,
  vuex: 'store/index.js',

};
