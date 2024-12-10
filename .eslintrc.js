module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'eslint:recommended',
    'plugin:prettier/recommended', // Ensure this is present
    'next/core-web-vitals',
    'next/typescript',
    'prettier', // Ensure this is added at the end of the array
  ],
  plugins: ['prettier'], // Add this line to include the Prettier plugin
  rules: {},
}
