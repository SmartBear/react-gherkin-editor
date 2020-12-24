import GherkinLinter from '../../lib/gherkin-linter'

let linter = null

const lint = event => {
  if (linter === null) {
    linter = new GherkinLinter()
  }

  const { content, language, mode } = event.data
  const lintErrors = linter
    .setLanguage(language)
    .setSubsetType(mode)
    .parse(content)
    .getLintingErrors()

  self.postMessage({ errors: lintErrors })
}

self.addEventListener('message', lint)
