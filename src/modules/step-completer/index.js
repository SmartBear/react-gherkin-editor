import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import calculateSize from 'calculate-size'

class StepCompleter {
  constructor(autoCompleteFunction, getGherkinDialect) {
    this.autoCompleteFunction = autoCompleteFunction
    this.getGherkinDialect = getGherkinDialect
  }

  getCompletions = async (editor, session, position, _prefix, callback) => {
    const lineTokens = session.getLine(position.row).trim().split(' ')

    if (lineTokens.length > 1 && this.getGherkinDialect().keywords.includes(lineTokens[0])) {
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
    if (_isEmpty(completions)) {
      return
    }

    const strings = _map(completions, 'caption')
    const longestString = _orderBy(strings, 'length', 'desc').shift()
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
