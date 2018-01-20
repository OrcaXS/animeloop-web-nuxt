// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    // 'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
    },
  },
  // add your custom rules here
  'rules': {
    'max-len': 'warn',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'state',
        'el',
        'rootState', // for vuex
        'app', // for plugin
      ]
    }],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/prefer-default-export': 'warn',
    'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
