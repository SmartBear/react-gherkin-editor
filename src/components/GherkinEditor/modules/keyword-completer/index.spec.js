import KeywordCompleter from './index'

describe('KeywordCompleter class', () => {
  describe('getCompletions', () => {
    it('calls the callback with the completions', async () => {
      const sessionMock = {
        getLine: jest.fn().mockReturnValue('')
      }
      const callBackMock = jest.fn()
      const keywordCompleter = new KeywordCompleter()
      await keywordCompleter.getCompletions(
        null,
        sessionMock,
        { row: 1 },
        null,
        callBackMock
      )
      expect(callBackMock).toHaveBeenCalledWith(null, [
        { caption: 'Feature', meta: 'Keyword', score: 0, value: 'Feature' },
        {
          caption: 'Background',
          meta: 'Keyword',
          score: 1,
          value: 'Background'
        },
        { caption: 'Example', meta: 'Keyword', score: 2, value: 'Example' },
        { caption: 'Scenario', meta: 'Keyword', score: 3, value: 'Scenario' },
        {
          caption: 'Scenario Outline',
          meta: 'Keyword',
          score: 4,
          value: 'Scenario Outline'
        },
        {
          caption: 'Scenario Template',
          meta: 'Keyword',
          score: 5,
          value: 'Scenario Template'
        },
        { caption: 'Examples', meta: 'Keyword', score: 6, value: 'Examples' },
        { caption: 'Given', meta: 'Keyword', score: 7, value: 'Given' },
        { caption: 'When', meta: 'Keyword', score: 8, value: 'When' },
        { caption: 'Then', meta: 'Keyword', score: 9, value: 'Then' },
        { caption: 'And', meta: 'Keyword', score: 10, value: 'And' },
        { caption: 'But', meta: 'Keyword', score: 11, value: 'But' }
      ])
    })
  })
})
