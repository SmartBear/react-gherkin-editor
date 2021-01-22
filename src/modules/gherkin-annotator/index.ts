import { debounce } from 'lodash'
import GherkinLinter, { OnParseCallback } from '../../lib/gherkin-linter'
import { LanguageIdentifier } from '../../lib/gherkin-languages'

export default class GherkinAnnotator {
  private linter:GherkinLinter
  public language: LanguageIdentifier = 'en'
  public mode: '' | 'scenario' | 'background' = ''

  constructor(public session, private onParse?: OnParseCallback) {
    this.linter = new GherkinLinter(onParse)
  }

  setSession(session) {
    this.session = session
  }

  setLanguage(language) {
    this.language = language
  }

  setMode(mode: 'gherkin_background_i18n' | 'gherkin_scenario_i18n' | '') {
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
