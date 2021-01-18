import Languages from '@cucumber/gherkin/dist/src/gherkin-languages.json'

export type LanguageIdentifier = keyof typeof Languages

export default Languages
