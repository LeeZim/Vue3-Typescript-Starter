module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'config', 'column', 'response']
      }
    ],
    'global-require': 0
  },
  settings: {}
}

// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:jest/recommended'],
//   parserOptions: {
//     ecmaVersion: 12,
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module',
//   },
//   plugins: ['vue', '@typescript-eslint'],
//   rules: {},
// };

/** *************Default*************** */
// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     'plugin:vue/essential',
//     'airbnb-base',
//   ],
//   parserOptions: {
//     ecmaVersion: 12,
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module',
//   },
//   plugins: [
//     'vue',
//     '@typescript-eslint',
//   ],
//   rules: {
//   },
// };
/** *************Default*************** */
