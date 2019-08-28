import gherkinLanguages from './gherkin_languages'

export default Object.keys(gherkinLanguages).map(iso => {
  const lang = gherkinLanguages[iso]
  const trimWhiteSpace = string => string.trim()
  return {
    name: iso,
    labels: [
      ...new Set([
        ...lang.feature.map(trimWhiteSpace),
        ...lang.background.map(trimWhiteSpace),
        ...lang.scenario.map(trimWhiteSpace),
        ...lang.scenarioOutline.map(trimWhiteSpace),
        ...lang.examples.map(trimWhiteSpace)
      ])
    ],
    keywords: [
      ...new Set([
        ...lang.given.map(trimWhiteSpace),
        ...lang.when.map(trimWhiteSpace),
        ...lang.then.map(trimWhiteSpace),
        ...lang.and.map(trimWhiteSpace),
        ...lang.but.map(trimWhiteSpace)
      ])
    ]
  }
})
