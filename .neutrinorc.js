const standardjs = require('@neutrinojs/standardjs')
const reactComponents = require('@neutrinojs/react-components')
const jest = require('@neutrinojs/jest')
const webpack = require('webpack')

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    neutrino =>  {
      neutrino.config.output
        .globalObject('this')
      .end()

      neutrino.config.plugin('buffer')
        .use(new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }));
    },
    standardjs({
      eslint: {
        baseConfig: {
          rules: {
            'arrow-parens': ['error', 'as-needed'],
            camelcase: 'warn',
            'id-length': ['error', { exceptions: ['i', 'v'] }],
            'jest/expect-expect': [
              'error',
              {
                assertFunctionNames: ['expect', '*.expect']
              }
            ],
            'jsx-quotes': ['error', 'prefer-single'],
            'multiline-ternary': 'off',
            'no-case-declarations': 'off',
            'prefer-const': [
              'error',
              {
                destructuring: 'any',
                ignoreReadBeforeAssign: false
              }
            ],
            'react/jsx-closing-bracket-location': [
              'error',
              {
                nonEmpty: 'line-aligned',
                selfClosing: 'line-aligned'
              }
            ],
            'react/jsx-closing-tag-location': 'error',
            'react/jsx-equals-spacing': 'error',
            'react/jsx-handler-names': 'off',
            'react/jsx-indent': ['error', 2],
            'react/jsx-indent-props': ['error', 2],
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-tag-spacing': [
              'error',
              {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never'
              }
            ],
            'react/prop-types': 'off',
            'react/self-closing-comp': [
              'error',
              {
                component: true,
                html: true
              }
            ],
            'space-before-function-paren': 'off'
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
