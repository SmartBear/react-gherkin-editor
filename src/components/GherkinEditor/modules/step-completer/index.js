import _ from 'lodash'
import calculateSize from 'calculate-size'
import { getGherkinDialect } from '../gherkin_i18n_dialects'

class StepCompleter {
  constructor (autoCompleteFunction) {
    this.autoCompleteFunction = autoCompleteFunction
  }

  getCompletions = async (editor, session, position, _prefix, callback) => {
    const lineTokens = session
      .getLine(position.row)
      .trim()
      .split(' ')

    if (
      lineTokens.length > 1 &&
      getGherkinDialect().keywords.includes(lineTokens[0])
    ) {
      const keyword = lineTokens.shift()
      const text = lineTokens.join(' ')
      try {
        const completions = await this.autoCompleteFunction(keyword, text)
        callback(null, completions)
        this._resizePopup(editor, completions)
      } catch (error) {
        callback(null, [])
        throw error
      }
    }
  }

  _resizePopup = (editor, completions) => {
    if (_.isEmpty(completions)) {
      return
    }

    const strings = _.map(completions, 'caption')
    const longestString = _.orderBy(strings, 'length', 'desc').shift()
    const width = this._calculateVisualLength(editor, longestString)
    editor.completer.popup.container.style.width = `${width + 50}px`
  }

  _calculateVisualLength = (editor, string) => {
    const { fontFamily, fontSize } = editor.getOptions()
    const { width } = calculateSize(string, {
      font: fontFamily,
      fontSize: fontSize
    })
    return width
  }
}

export default StepCompleter
