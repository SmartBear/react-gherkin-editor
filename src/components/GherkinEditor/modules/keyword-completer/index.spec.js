import KeywordCompleter from '.'
import { getGherkinDialect } from '../gherkin_i18n_dialects'
import { getGherkinDialect as getBackgroundDialect } from '../gherkin_background_i18n_dialects'
import { getGherkinDialect as getScenarioDialect } from '../gherkin_scenario_i18n_dialects'

describe('KeywordCompleter class', () => {
  describe('Gherkin i18n', () => {
    describe('getCompletions', () => {
      it('calls the callback with the completions', async () => {
        const sessionMock = {
          getLine: jest.fn().mockReturnValue('')
        }
        const callBackMock = jest.fn()
        const keywordCompleter = new KeywordCompleter(getGherkinDialect)
        await keywordCompleter.getCompletions(
          null,
          sessionMock,
          { row: 1 },
          null,
          callBackMock
        )
        expect(callBackMock).toHaveBeenCalledWith(null, [
          {
            caption: 'Feature',
            meta: 'Keyword',
            score: 0,
            value: 'Feature'
          },
          {
            caption: 'Business Need',
            meta: 'Keyword',
            score: 1,
            value: 'Business Need'
          },
          {
            caption: 'Ability',
            meta: 'Keyword',
            score: 2,
            value: 'Ability'
          },
          {
            caption: 'Background',
            meta: 'Keyword',
            score: 3,
            value: 'Background'
          },
          {
            caption: 'Example',
            meta: 'Keyword',
            score: 4,
            value: 'Example'
          },
          {
            caption: 'Scenario',
            meta: 'Keyword',
            score: 5,
            value: 'Scenario'
          },
          {
            caption: 'Scenario Outline',
            meta: 'Keyword',
            score: 6,
            value: 'Scenario Outline'
          },
          {
            caption: 'Scenario Template',
            meta: 'Keyword',
            score: 7,
            value: 'Scenario Template'
          },
          {
            caption: 'Examples',
            meta: 'Keyword',
            score: 8,
            value: 'Examples'
          },
          {
            caption: 'Scenarios',
            meta: 'Keyword',
            score: 9,
            value: 'Scenarios'
          },
          {
            caption: '*',
            meta: 'Keyword',
            score: 10,
            value: '*'
          },
          {
            caption: 'Given',
            meta: 'Keyword',
            score: 11,
            value: 'Given'
          },
          {
            caption: 'When',
            meta: 'Keyword',
            score: 12,
            value: 'When'
          },
          {
            caption: 'Then',
            meta: 'Keyword',
            score: 13,
            value: 'Then'
          },
          {
            caption: 'And',
            meta: 'Keyword',
            score: 14,
            value: 'And'
          },
          {
            caption: 'But',
            meta: 'Keyword',
            score: 15,
            value: 'But'
          }
        ])
      })
    })
  })

  describe('Gherkin background i18n', () => {
    describe('getCompletions', () => {
      it('calls the callback with the completions', async () => {
        const sessionMock = {
          getLine: jest.fn().mockReturnValue('')
        }
        const callBackMock = jest.fn()
        const keywordCompleter = new KeywordCompleter(getBackgroundDialect)
        await keywordCompleter.getCompletions(
          null,
          sessionMock,
          { row: 1 },
          null,
          callBackMock
        )
        expect(callBackMock).toHaveBeenCalledWith(null, [
          {
            caption: '*',
            meta: 'Keyword',
            score: 0,
            value: '*'
          },
          {
            caption: 'Given',
            meta: 'Keyword',
            score: 1,
            value: 'Given'
          },
          {
            caption: 'When',
            meta: 'Keyword',
            score: 2,
            value: 'When'
          },
          {
            caption: 'Then',
            meta: 'Keyword',
            score: 3,
            value: 'Then'
          },
          {
            caption: 'And',
            meta: 'Keyword',
            score: 4,
            value: 'And'
          },
          {
            caption: 'But',
            meta: 'Keyword',
            score: 5,
            value: 'But'
          }
        ])
      })
    })
  })

  describe('Gherkin scenario i18n', () => {
    describe('getCompletions', () => {
      it('calls the callback with the completions', async () => {
        const sessionMock = {
          getLine: jest.fn().mockReturnValue('')
        }
        const callBackMock = jest.fn()
        const keywordCompleter = new KeywordCompleter(getScenarioDialect)
        await keywordCompleter.getCompletions(
          null,
          sessionMock,
          { row: 1 },
          null,
          callBackMock
        )
        expect(callBackMock).toHaveBeenCalledWith(null, [
          {
            caption: 'Examples',
            meta: 'Keyword',
            score: 0,
            value: 'Examples'
          },
          {
            caption: 'Scenarios',
            meta: 'Keyword',
            score: 1,
            value: 'Scenarios'
          },
          {
            caption: '*',
            meta: 'Keyword',
            score: 2,
            value: '*'
          },
          {
            caption: 'Given',
            meta: 'Keyword',
            score: 3,
            value: 'Given'
          },
          {
            caption: 'When',
            meta: 'Keyword',
            score: 4,
            value: 'When'
          },
          {
            caption: 'Then',
            meta: 'Keyword',
            score: 5,
            value: 'Then'
          },
          {
            caption: 'And',
            meta: 'Keyword',
            score: 6,
            value: 'And'
          },
          {
            caption: 'But',
            meta: 'Keyword',
            score: 7,
            value: 'But'
          }
        ])
      })
    })
  })
})
