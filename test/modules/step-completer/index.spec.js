import { getGherkinDialect } from 'modules/dialects/gherkin_i18n'
import StepCompleter from 'modules/step-completer'

describe('StepCompleter class', () => {
  const steps = [
    {
      name: 'I start the coffee machine using language "lang"',
      value: '',
      score: 100
    },
    {
      name: 'I shutdown the coffee machine',
      value: '',
      score: 10
    }
  ]

  const editorMock = {
    getOptions: jest
      .fn()
      .mockReturnValue({ fontFamily: 'Arial', fontSize: 14 }),
    completer: { popup: { container: { style: { width: 0 } } } }
  }

  describe('getCompletions', () => {
    it('calls the callback with the completions', async () => {
      const autoCompleteFunctionMock = jest.fn(() => Promise.resolve(steps))
      const sessionMock = {
        getLine: jest.fn().mockReturnValue('And I')
      }
      const callBackMock = jest.fn()
      const stepCompleter = new StepCompleter(
        autoCompleteFunctionMock,
        getGherkinDialect
      )
      await stepCompleter.getCompletions(
        editorMock,
        sessionMock,
        { row: 1 },
        null,
        callBackMock
      )
      expect(autoCompleteFunctionMock).toHaveBeenCalledWith('And', 'I')
      expect(callBackMock).toHaveBeenCalledWith(null, steps)
    })

    it('does not call autoCompleteFunction when word does not start with a gherkin keyword', async () => {
      const autoCompleteFunctionMock = jest.fn()
      const callBackMock = jest.fn()
      const sessionMock = {
        getLine: jest.fn().mockReturnValue('I start')
      }
      const stepCompleter = new StepCompleter(
        autoCompleteFunctionMock,
        getGherkinDialect
      )
      await stepCompleter.getCompletions(
        editorMock,
        sessionMock,
        { row: 1 },
        null,
        callBackMock
      )
      expect(autoCompleteFunctionMock).not.toHaveBeenCalled()
      expect(callBackMock).not.toHaveBeenCalled()
    })

    it('resizes the completions popup', async () => {
      const autoCompleteFunctionMock = jest.fn()
      const callBackMock = jest.fn()
      const sessionMock = {
        getLine: jest.fn().mockReturnValue('I start')
      }
      const stepCompleter = new StepCompleter(
        autoCompleteFunctionMock,
        getGherkinDialect
      )
      await stepCompleter.getCompletions(
        editorMock,
        sessionMock,
        { row: 1 },
        null,
        callBackMock
      )
      expect(editorMock.completer.popup.container.style.width).toEqual('50px')
    })
  })
})
