import gherkinLanguages from '../../../../lib/gherkin-languages'

let GherkinDialect = {}

export const setGherkinDialect = language => {
  const dialect = gherkinLanguages[language]
  const trimWhiteSpace = string => string.trim()
  GherkinDialect = {
    name: dialect.name,
    native_name: dialect.native,
    labels: [
      ...new Set([
        ...dialect.feature.map(trimWhiteSpace),
        ...dialect.background.map(trimWhiteSpace),
        ...dialect.scenario.map(trimWhiteSpace),
        ...dialect.scenarioOutline.map(trimWhiteSpace),
        ...dialect.examples.map(trimWhiteSpace)
      ])
    ],
    keywords: [
      ...new Set([
        ...dialect.given.map(trimWhiteSpace),
        ...dialect.when.map(trimWhiteSpace),
        ...dialect.then.map(trimWhiteSpace),
        ...dialect.and.map(trimWhiteSpace),
        ...dialect.but.map(trimWhiteSpace)
      ])
    ]
  }
}

setGherkinDialect('en')

export const getGherkinDialect = () => GherkinDialect
