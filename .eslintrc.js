module.exports = {
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
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {},
}
