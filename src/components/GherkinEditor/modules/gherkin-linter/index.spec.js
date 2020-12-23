import GherkinLinter from '.'
import GherkinLinterWorker, { mockPostMessage } from './gherkin-linter.worker'

jest.mock('./gherkin-linter.worker')

beforeEach(() => {
  GherkinLinterWorker.mockClear()
  mockPostMessage.mockClear()
})

describe('GherkinLinter', () => {
  const session = { setAnnotations: jest.fn(), clearAnnotations: jest.fn() }
  const gherkinLinter = new GherkinLinter(session)

  describe('initial state', () => {
    it('initialize language to english per default', () => {
      expect(gherkinLinter.language).toEqual('en')
    })

    it('initialize mode to default', () => {
      expect(gherkinLinter.mode).toEqual('')
    })
  })

  describe('.setLanguage(language)', () => {
    it('set the language properly', () => {
      gherkinLinter.setLanguage('fr')
      expect(gherkinLinter.language).toEqual('fr')
    })
  })

  describe('.setMode(mode)', () => {
    describe('when mode is gherkin_background_i18n', () => {
      it('set the mode to background', () => {
        gherkinLinter.setMode('gherkin_background_i18n')
        expect(gherkinLinter.mode).toEqual('background')
      })
    })

    describe('when mode is gherkin_scenario_i18n', () => {
      it('set the mode to scenario', () => {
        gherkinLinter.setMode('gherkin_scenario_i18n')
        expect(gherkinLinter.mode).toEqual('scenario')
      })
    })

    describe('when mode is not gherkin_background_i18n neither gherkin_scenario_i18n', () => {
      it('reset the mode', () => {
        gherkinLinter.setMode('gherkin_foo_i18n')
        expect(gherkinLinter.mode).toEqual('')
      })
    })
  })

  describe('._check(value)', () => {
    it('posts a message to the worker with the value to check, the active language, and mode', () => {
      gherkinLinter.setLanguage('fr')
      gherkinLinter.setMode('gherkin_scenario_i18n')
      gherkinLinter._check('A value')

      expect(mockPostMessage).toHaveBeenCalledWith({
        content: 'A value',
        language: 'fr',
        mode: 'scenario'
      })
    })
  })

  describe('._onWorkerMessage(message)', () => {
    beforeEach(() => {
      session.setAnnotations.mockClear()
      session.clearAnnotations.mockClear()
    })

    describe('with linting errors', () => {
      const lintingErrors = { errors: ['error'] }

      it('set the annotations to the session with the errors', () => {
        gherkinLinter._onWorkerMessage({ data: lintingErrors })
        expect(session.setAnnotations).toHaveBeenCalledWith(lintingErrors.errors)
      })
    })

    describe('without linting errors', () => {
      const lintingErrors = { errors: [] }

      it('clear the annotations of the session', () => {
        gherkinLinter._onWorkerMessage({ data: lintingErrors })
        expect(session.clearAnnotations).toHaveBeenCalledTimes(1)
      })
    })

    describe('with invalid linting data', () => {
      const lintingErrors = { warnings: [] }

      it('do not clear neither set annotations', () => {
        gherkinLinter._onWorkerMessage({ data: lintingErrors })
        expect(session.clearAnnotations).not.toHaveBeenCalled()
        expect(session.setAnnotations).not.toHaveBeenCalled()
      })
    })
  })
})
