import { getGherkinDialect } from '../../mode/gherkin_i18n_dialects'

class KeywordCompleter {
  getCompletions = async (_editor, session, position, _prefix, callback) => {
    const lineTokens = session
      .getLine(position.row)
      .trim()
      .split(' ')

    if (lineTokens.length === 1) {
      const keywords = [
        ...getGherkinDialect().labels,
        ...getGherkinDialect().keywords
      ]
      const completions = keywords.map((keyword, index) => ({
        caption: keyword,
        value: keyword,
        score: index,
        meta: 'Keyword'
      }))
      callback(null, completions)
    }
  }
}

export default KeywordCompleter
