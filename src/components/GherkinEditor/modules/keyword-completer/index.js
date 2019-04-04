// TODO: Should handle I18n
export const highLevelkeywords = [
  'Feature',
  'Background',
  'Example',
  'Scenario',
  'Scenario Outline',
  'Scenario Template',
  'Examples'
]

export const stepLevelKeywords = ['Given', 'When', 'Then', 'And', 'But']

export const keywords = highLevelkeywords.concat(stepLevelKeywords)

class KeywordCompleter {
  getCompletions = async (_editor, session, position, _prefix, callback) => {
    const lineTokens = session
      .getLine(position.row)
      .trim()
      .split(' ')

    if (lineTokens.length === 1) {
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
