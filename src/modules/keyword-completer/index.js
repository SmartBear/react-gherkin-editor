class KeywordCompleter {
  constructor(getGherkinDialect) {
    this.getGherkinDialect = getGherkinDialect
  }

  getCompletions = async (_editor, session, position, _prefix, callback) => {
    const lineTokens = session.getLine(position.row).trim().split(' ')

    if (lineTokens.length === 1) {
      const keywords = [
        ...this.getGherkinDialect().labels,
        ...this.getGherkinDialect().keywords
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
