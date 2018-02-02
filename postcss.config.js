const { join } = require('path');
const createResolver = require('postcss-import-resolver');


module.exports = () => ({
  sourceMap: true,
  plugins: {
    'postcss-import': {
      resolve: createResolver({
        alias: {
          '~': join(__dirname),
          // '~~': join(__dirname),
          '@': join(__dirname),
          // '@@': join(__dirname),
        },
      }),
    },
    'postcss-url': {},
    'postcss-cssnext': {},
    'postcss-hexrgba': {},
    'postcss-reporter': {},
  },
});
