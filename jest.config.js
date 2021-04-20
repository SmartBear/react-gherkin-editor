module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!escape-string-regexp/)']
}
