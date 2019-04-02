module.exports = {
  use: [
    '@neutrinojs/standardjs',
    '@neutrinojs/react-components',
    [
      '@neutrinojs/jest',
      {
        testRegex: 'src/.*(_test|_spec|\\.test|\\.spec)\\.(js|jsx|vue|ts|tsx|mjs)$',
        setupTestFrameworkScriptFile: '<rootDir>/test-setup.js',
      }
    ]
  ]
}
