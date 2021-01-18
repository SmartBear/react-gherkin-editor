import languages from '@cucumber/gherkin/dist/src/gherkin-languages.json'

export { default } from '@cucumber/gherkin/dist/src/gherkin-languages.json'
export type LanguageIdentifier = keyof typeof languages
