module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!escape-string-regexp/)']
}
