module.exports = {
  root: true,
  env: {
    node: true,
  },
  // parser: 'babel-eslint',
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    // 'plugin:prettier/recommended',  // 加入這行以整合 Prettier
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ],
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     singleQuote: true,  // 強制使用單引號
    //     semi: true,         // 強制使用分號
    //     vueIndentScriptAndStyle: true,  // 讓 Vue 檔案中的 script 和 style 標籤進行縮排
    //   },
    // ],
  },
};
