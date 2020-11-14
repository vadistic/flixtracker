module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },

  extends: [
    '@vadistic/eslint-config',
    '@vadistic/eslint-config/prettier',
    '@vadistic/eslint-config/typecheck',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
  },
}
