import GherkinAnnotator from '.'

describe('GherkinAnnotator', () => {
  const session = { setAnnotations: jest.fn(), clearAnnotations: jest.fn() }
  const gherkinAnnotator = new GherkinAnnotator(session)

  describe('initial state', () => {
    it('initialize language to english per default', () => {
      expect(gherkinAnnotator.language).toEqual('en')
    })

    it('initialize mode to default', () => {
      expect(gherkinAnnotator.mode).toEqual('')
    })
  })

  describe('.setLanguage(language)', () => {
    it('set the language properly', () => {
      gherkinAnnotator.setLanguage('fr')
      expect(gherkinAnnotator.language).toEqual('fr')
    })
  })

  describe('.setMode(mode)', () => {
    describe('when mode is gherkin_background_i18n', () => {
      it('set the mode to background', () => {
        gherkinAnnotator.setMode('gherkin_background_i18n')
        expect(gherkinAnnotator.mode).toEqual('background')
      })
    })

    describe('when mode is gherkin_scenario_i18n', () => {
      it('set the mode to scenario', () => {
        gherkinAnnotator.setMode('gherkin_scenario_i18n')
        expect(gherkinAnnotator.mode).toEqual('scenario')
      })
    })

    describe('when mode is not gherkin_background_i18n neither gherkin_scenario_i18n', () => {
      it('reset the mode', () => {
        gherkinAnnotator.setMode('gherkin_foo_i18n')
        expect(gherkinAnnotator.mode).toEqual('')
      })
    })
  })

  describe('.annotateNow(someGherkin)', () => {
    beforeEach(() => {
      session.setAnnotations.mockClear()
      session.clearAnnotations.mockClear()
    })

    describe('with invalid gherkin', () => {
      const gherkin = 'invalid!'

      it('set the annotations to the session with errors', async () => {
        await gherkinAnnotator.annotateNow(gherkin)
        expect(session.clearAnnotations).not.toHaveBeenCalled()
        expect(session.setAnnotations).toHaveBeenCalledWith(expect.any(Array))
      })
    })

    describe('without linting errors', () => {
      const gherkin = 'Feature:'

      it('clear the annotations of the session', async () => {
        gherkinAnnotator.setLanguage('en')
        await gherkinAnnotator.annotateNow(gherkin)
        expect(session.setAnnotations).not.toHaveBeenCalled()
        expect(session.clearAnnotations).toHaveBeenCalledTimes(1)
      })
    })
  })
})
