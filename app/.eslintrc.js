module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },

  extends: [
    '@vadistic/eslint-config',
    '@vadistic/eslint-config/prettier',
    '@vadistic/eslint-config/prettier',
  ],
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  rules: {},
}
