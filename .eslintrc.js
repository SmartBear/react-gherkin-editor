module.exports = {
  env: {
    browser: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-use-before-define': 'off'
      }
    }
  ],
  extends: ['standard', 'plugin:react/recommended', 'plugin:jest/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@babel', 'react', 'jest'],
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
    'react/display-name': 'off',
    'react/jsx-closing-bracket-location': [
      'error',
      {
        nonEmpty: 'line-aligned',
        selfClosing: 'line-aligned'
      }
    ],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        attributes: true,
        children: true
      }
    ],
    'react/jsx-equals-spacing': 'error',
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
