const eslintPluginVue = require('eslint-plugin-vue');

module.exports = [
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      parser: require('vue-eslint-parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
      },
    },
    plugins: {
      vue: eslintPluginVue,
    },
    rules: {
      ...eslintPluginVue.configs.base.rules,
      ...eslintPluginVue.configs.essential.rules,
      ...eslintPluginVue.configs['vue3-recommended'].rules,
      'vue/comment-directive': 'off',
      'vue/no-multiple-template-root': 'off', // disabled for Vue 3
    },
  },
];