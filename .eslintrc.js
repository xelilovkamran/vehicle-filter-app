export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    'next/typescript',
  ],
  rules: {},
}
