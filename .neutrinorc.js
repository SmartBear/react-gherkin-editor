const standardjs = require('@neutrinojs/standardjs');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    standardjs({
      eslint: {
        baseConfig: {
          rules: {
            'react/jsx-handler-names': 'off',
            'react/prop-types': 'off'
          }
        }
      }
    }),
    reactComponents(),
    jest({
      testRegex: 'src/.*(_test|_spec|\\.test|\\.spec)\\.(js|jsx)$',
      setupFilesAfterEnv: ['<rootDir>/test-setup.js']
    })
  ]
}
