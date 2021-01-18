import { generateMessages } from '@cucumber/gherkin'
import { messages as m } from '@cucumber/messages'
import gherkinLanguages from 'lib/gherkin-languages'

export default class GherkinLinter {
  private options: object
  private offset: number
  private isSubset: boolean
  private subsetType: string
  private language: string
  private featureKeyword: string
  private lastParsedGherkin: string
  private lintingErrors: object[]

  constructor(private onParse?: (messages: Readonly<m.IEnvelope[]>) => void) {
    this.options = {
      includeGherkinDocument: true,
      newId: () => Math.random().toString()
    }

    this.offset = 0
    this.isSubset = false
    this.subsetType = ''

    this.language = 'en'
    this.featureKeyword = 'Feature'

    this.lastParsedGherkin = ''
    this.lintingErrors = []
  }

  setLanguage(language) {
    language ||= 'en'

    if (this.language === language) {
      return this
    }

    if (!gherkinLanguages[language]) {
      return this
    }

    this.language = language
    this.featureKeyword = gherkinLanguages[this.language].feature[0]

    this.lastParsedGherkin = ''

    return this
  }

  setSubsetType(type) {
    if (type === this.subsetType) {
      return this
    }

    if (type === 'scenario' || type === 'background') {
      this.subsetType = type
      this.isSubset = true
    } else {
      this.subsetType = ''
      this.isSubset = false
    }

    this.lastParsedGherkin = ''

    return this
  }

  parse(gherkin) {
    if (gherkin === this.lastParsedGherkin) {
      return this
    }

    this.parseGherkin(gherkin)
    this.lastParsedGherkin = gherkin

    return this
  }

  getLintingErrors() {
    return this.lintingErrors
  }

  private parseGherkin(gherkin) {
    const messages = generateMessages(
      this.getContentToLint(gherkin),
      '',
      this.options
    )

    this.lintingErrors = messages
      .filter(message => message.parseError)
      .map(message => ({
        line: message.parseError.source.location.line - this.offset,
        row: message.parseError.source.location.line - 1 - this.offset,
        character: message.parseError.source.location.column,
        column: message.parseError.source.location.column - 1,
        text: this.removeLineNumber(message.parseError.message),
        type: 'warning'
      }))

    this.onParse && this.onParse(messages)
  }

  private getContentToLint(gherkin) {
    let featurePrefix = ''

    this.offset = 0

    if (this.language !== 'en') {
      this.offset += 1
      featurePrefix = `# language: ${this.language}\n`
    }

    if (this.isSubset) {
      const subsetKeyword = gherkinLanguages[this.language][this.subsetType][0]

      featurePrefix = `${featurePrefix}${this.featureKeyword}:\n${subsetKeyword}:\n`
      this.offset += 2
    }

    return `${featurePrefix}${gherkin}`
  }

  private removeLineNumber(errorMessage) {
    return errorMessage.split(' ').slice(1).join(' ')
  }
}
