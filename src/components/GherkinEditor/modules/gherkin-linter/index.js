import { debounce } from 'lodash'
import GherkinLinterWorker from './gherkin-linter.worker'

class GherkinLinter {
  constructor (session) {
    this.session = session
    this.worker = new GherkinLinterWorker()
    this.worker.onmessage = this._onWorkerMessage.bind(this)

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

  check(value) {
    this.debouncedCheck(value)
  }

  debouncedCheck = debounce(value => {
    this._check(value)
  }, 200)

  _check(value) {
    this.worker.postMessage({ content: value, language: this.language, mode: this.mode })
  }

  _onWorkerMessage(message) {
    const { errors } = message.data

    if (!Array.isArray(errors)) {
      return
    }

    if (errors.length > 0) {
      this.session.setAnnotations(errors)
    } else {
      this.session.clearAnnotations()
    }
  }
}

export default GherkinLinter
