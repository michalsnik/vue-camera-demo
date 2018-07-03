module.exports = {
  env: {
    jest: true
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
