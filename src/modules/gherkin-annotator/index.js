import { debounce } from 'lodash'
import GherkinLinter from 'lib/gherkin-linter'

export default class {
  constructor(session) {
    this.session = session
    this.linter = new GherkinLinter()

    this.language = 'en'
    this.mode = ''
  }

  setLanguage(language) {
    this.language = language
  }

  setMode(mode) {
    switch (mode) {
      case 'gherkin_background_i18n':
        this.mode = 'background'
        break
      case 'gherkin_scenario_i18n':
        this.mode = 'scenario'
        break
      default:
        this.mode = ''
    }
  }

  annotate(value) {
    this.debouncedAnnotate(value)
  }

  debouncedAnnotate = debounce(value => {
    this.annotateNow(value)
  }, 250)

  async annotateNow(value) {
    const errors = await this.lint(value)

    if (!Array.isArray(errors)) {
      return
    }

    if (errors.length > 0) {
      this.session.setAnnotations(errors)
    } else {
      this.session.clearAnnotations()
    }
  }

  async lint(value) {
    return this.linter
      .setLanguage(this.language)
      .setSubsetType(this.mode)
      .parse(value)
      .getLintingErrors()
  }
}
