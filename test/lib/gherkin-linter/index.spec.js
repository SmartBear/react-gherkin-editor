import GherkinLinter from '../../../src/lib/gherkin-linter'

const fullGherkinContent = `Feature:
  Background:
  Background description

  Given some step
  invalid gherkin here!
  Examples:
`

const fullGherkinContentInFrench = `Fonctionnalité:
  Contexte:
  Description du contexte

  Quand some step
  invalid gherkin here!
  Exemples:
`

const subsetBackgroundGherkinContent = `Background description

Given some step
invalid gherkin here!
Examples:
`

const subsetScenarioGherkinContentInFrench = `Scénario description

Quand some step
invalid gherkin here!
Exemples:
`

describe('GherkinLinter', () => {
  const gherkinLinter = new GherkinLinter()

  describe('.parse(gherkin)', () => {
    describe('with valid gherkin', () => {
      const gherkin = 'Feature:\nScenario:\n'

      it('allows method chaining', () => {
        expect(gherkinLinter.parse(gherkin)).toEqual(gherkinLinter)
      })
    })

    describe('with invalid gherkin', () => {
      const gherkin = '_Feature:\n_Scenario:\n'

      it('allows method chaining', () => {
        expect(gherkinLinter.parse(gherkin)).toEqual(gherkinLinter)
      })

      it('does not raise error', () => {
        expect(() => gherkinLinter.parse(gherkin)).not.toThrow()
      })
    })

    describe('with same gherkin twice', () => {
      const gherkin = 'Feature:\nScenario:\n'

      beforeEach(() => {
        gherkinLinter.parse(gherkin)
      })

      it('allows method chaining', () => {
        expect(gherkinLinter.parse(gherkin)).toEqual(gherkinLinter)
      })

      it('parses the gherkin only once', () => {
        const parseSpy = jest.spyOn(gherkinLinter, 'parseGherkin')

        gherkinLinter.parse(gherkin)

        expect(parseSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('.setLanguage(language)', () => {
    describe('with no language', () => {
      beforeEach(() => {
        gherkinLinter.setLanguage('fr')
      })

      it('allows method chaining', () => {
        expect(gherkinLinter.setLanguage()).toEqual(gherkinLinter)
      })
      it('set to english per default', () => {
        expect(gherkinLinter.setLanguage().language).toEqual('en')
      })
      it('set the feature keyword to Feature', () => {
        expect(gherkinLinter.setLanguage().featureKeyword).toEqual('Feature')
      })

      it('reset the lastParsedGherkin member', () => {
        gherkinLinter.parse('Feature: Scenario:')
        expect(gherkinLinter.setLanguage().lastParsedGherkin).toEqual('')
      })
    })

    describe('with same language as the current one', () => {
      const language = 'fr'

      beforeEach(() => {
        gherkinLinter.setLanguage(language)
      })

      it('allows method chaining', () => {
        expect(gherkinLinter.setLanguage(language)).toEqual(gherkinLinter)
      })

      it('does not reset the lastParsedGherkin member', () => {
        gherkinLinter.parse('Feature: Scenario:')
        expect(gherkinLinter.setLanguage(language).lastParsedGherkin).toEqual(
          'Feature: Scenario:'
        )
      })
    })

    describe('with compatible language', () => {
      const language = 'fr'

      beforeEach(() => {
        gherkinLinter.setLanguage()
      })

      it('allows method chaining', () => {
        expect(gherkinLinter.setLanguage(language)).toEqual(gherkinLinter)
      })
      it('set the language properly', () => {
        expect(gherkinLinter.setLanguage(language).language).toEqual('fr')
      })
      it('set the feature keyword properly', () => {
        expect(gherkinLinter.setLanguage(language).featureKeyword).toEqual(
          'Fonctionnalité'
        )
      })

      it('reset the lastParsedGherkin member', () => {
        gherkinLinter.parse('Feature: Scenario:')
        expect(gherkinLinter.setLanguage(language).lastParsedGherkin).toEqual(
          ''
        )
      })
    })

    describe('with incompatible language', () => {
      const language = 'nope'

      beforeEach(() => {
        gherkinLinter.setLanguage('fr')
      })

      it('allows method chaining', () => {
        expect(gherkinLinter.setLanguage(language)).toEqual(gherkinLinter)
      })
      it('keeps the language unchanged', () => {
        expect(gherkinLinter.setLanguage(language).language).toEqual('fr')
      })
      it('keeps the feature keyword unchanged', () => {
        expect(gherkinLinter.setLanguage(language).featureKeyword).toEqual(
          'Fonctionnalité'
        )
      })

      it('does not reset the lastParsedGherkin member', () => {
        gherkinLinter.parse('Feature: Scenario:')
        expect(gherkinLinter.setLanguage(language).lastParsedGherkin).toEqual(
          'Feature: Scenario:'
        )
      })
    })
  })

  describe('.setSubsetType(type)', () => {
    describe('when subset type is scenario or background', () => {
      describe('when subset type is scenario', () => {
        const type = 'scenario'

        beforeEach(() => {
          gherkinLinter.setSubsetType()
        })

        it('set isSubset to true', () => {
          expect(gherkinLinter.setSubsetType(type).isSubset).toBe(true)
        })

        it('set subsetType to scenario', () => {
          expect(gherkinLinter.setSubsetType(type).subsetType).toEqual(
            'scenario'
          )
        })

        it('allows chaining methods', () => {
          expect(gherkinLinter.setSubsetType(type)).toEqual(gherkinLinter)
        })

        it('reset lastParsedGherkin', () => {
          gherkinLinter.parse('Feature:')
          expect(gherkinLinter.setSubsetType(type).lastParsedGherkin).toEqual(
            ''
          )
        })
      })

      describe('when subset type is background', () => {
        const type = 'background'

        beforeEach(() => {
          gherkinLinter.setSubsetType()
        })

        it('set isSubset to true', () => {
          expect(gherkinLinter.setSubsetType(type).isSubset).toBe(true)
        })

        it('set subsetType to scenario', () => {
          expect(gherkinLinter.setSubsetType(type).subsetType).toEqual(
            'background'
          )
        })

        it('allows chaining methods', () => {
          expect(gherkinLinter.setSubsetType(type)).toEqual(gherkinLinter)
        })

        it('reset lastParsedGherkin', () => {
          gherkinLinter.parse('Feature:')
          expect(gherkinLinter.setSubsetType(type).lastParsedGherkin).toEqual(
            ''
          )
        })
      })
    })

    describe('when subset type is not scenario or background', () => {
      const type = 'foo'

      beforeEach(() => {
        gherkinLinter.setSubsetType('scenario')
      })

      it('set isSubset to false', () => {
        expect(gherkinLinter.setSubsetType(type).isSubset).toBe(false)
      })

      it('clean subsetType', () => {
        expect(gherkinLinter.setSubsetType(type).subsetType).toEqual('')
      })

      it('allows chaining methods', () => {
        expect(gherkinLinter.setSubsetType(type)).toEqual(gherkinLinter)
      })

      it('reset lastParsedGherkin', () => {
        gherkinLinter.parse('Feature:')
        expect(gherkinLinter.setSubsetType(type).lastParsedGherkin).toEqual('')
      })
    })

    describe('when subset is not specified', () => {
      beforeEach(() => {
        gherkinLinter.setSubsetType('scenario')
      })

      it('set isSubset to false', () => {
        expect(gherkinLinter.setSubsetType().isSubset).toBe(false)
      })

      it('clean subsetType', () => {
        expect(gherkinLinter.setSubsetType().subsetType).toEqual('')
      })

      it('allows chaining methods', () => {
        expect(gherkinLinter.setSubsetType()).toEqual(gherkinLinter)
      })

      it('reset lastParsedGherkin', () => {
        gherkinLinter.parse('Feature:')
        expect(gherkinLinter.setSubsetType().lastParsedGherkin).toEqual('')
      })
    })

    describe('when subset is the same as it was before', () => {
      it('does not reset lastParsedGherkin', () => {
        gherkinLinter.setSubsetType('scenario')
        gherkinLinter.parse('Feature:')
        expect(
          gherkinLinter.setSubsetType('scenario').lastParsedGherkin
        ).toEqual('Feature:')
      })
    })
  })

  describe('.getLintingErrors()', () => {
    describe('when gherkin content is valid', () => {
      it('returns an empty array', () => {
        expect(
          gherkinLinter.parse('Feature:').getLintingErrors().length
        ).toEqual(0)
      })
    })

    describe('when gherkin content has errors', () => {
      describe('with a full feature in plain english', () => {
        it('returns an array with the errors', () => {
          gherkinLinter.setLanguage().setSubsetType().parse(fullGherkinContent)
          expect(gherkinLinter.getLintingErrors()).toEqual([
            {
              character: 3,
              column: 2,
              line: 6,
              row: 5,
              text:
                "expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got 'invalid gherkin here!'",
              type: 'warning'
            },
            {
              character: 3,
              column: 2,
              line: 7,
              row: 6,
              text:
                "expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got 'Examples:'",
              type: 'warning'
            }
          ])
        })
      })

      describe('with a full feature in another valid language', () => {
        it('returns an array with the errors with appropriate line numbers', () => {
          gherkinLinter
            .setLanguage('fr')
            .setSubsetType()
            .parse(fullGherkinContentInFrench)
          expect(gherkinLinter.getLintingErrors()).toEqual([
            {
              character: 3,
              column: 2,
              line: 6,
              row: 5,
              text:
                "expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got 'invalid gherkin here!'",
              type: 'warning'
            },
            {
              character: 3,
              column: 2,
              line: 7,
              row: 6,
              text:
                "expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got 'Exemples:'",
              type: 'warning'
            }
          ])
        })
      })

      describe('with a subset in plain english', () => {
        it('returns an array with the errors with appropriate line numbers', () => {
          gherkinLinter
            .setLanguage()
            .setSubsetType('background')
            .parse(subsetBackgroundGherkinContent)
          expect(gherkinLinter.getLintingErrors()).toEqual([
            {
              character: 1,
              column: 0,
              line: 4,
              row: 3,
              text:
                "expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got 'invalid gherkin here!'",
              type: 'warning'
            },
            {
              character: 1,
              column: 0,
              line: 5,
              row: 4,
              text:
                "expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got 'Examples:'",
              type: 'warning'
            }
          ])
        })
      })

      describe('with a subset in another valid language', () => {
        it('returns an array with the errors with appropriate line numbers', () => {
          gherkinLinter
            .setLanguage('fr')
            .setSubsetType('scenario')
            .parse(subsetScenarioGherkinContentInFrench)
          expect(gherkinLinter.getLintingErrors()).toEqual([
            {
              character: 1,
              column: 0,
              line: 4,
              row: 3,
              text:
                "expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got 'invalid gherkin here!'",
              type: 'warning'
            }
          ])
        })
      })
    })
  })

  describe('after parsing', () => {
    it('calls back with the cucumber message envelopes', () => {
      let messages
      const gherkinLinter = new GherkinLinter(msgs => (messages = msgs))
      const source = 'Feature: our feature\n'
      gherkinLinter.parse(source)
      expect(messages.length).toBeGreaterThan(0)
      expect(messages[0].source.data).toEqual(source)
      expect(messages[1].gherkinDocument.feature.name).toEqual('our feature')
    })
  })
})
