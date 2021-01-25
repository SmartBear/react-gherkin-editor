import React from 'react'
import { render } from '@testing-library/react'
import GherkinAnnotator, {
  annotate,
  setLanguage,
  setMode,
  setSession
} from '../../../src/modules/gherkin-annotator'
import GherkinEditor from '../../../src/components/GherkinEditor'

jest.mock('../../../src/modules/gherkin-annotator')

beforeEach(() => {
  GherkinAnnotator.mockClear()
  annotate.mockClear()
  setSession.mockClear()
  setLanguage.mockClear()
  setMode.mockClear()
})

describe('GherkinEditor', () => {
  it('renders a Gherkin editor', () => {
    const gherkinEditor = render(<GherkinEditor />)

    expect(
      gherkinEditor.container.querySelector('.ace_editor')
    ).toBeInTheDocument()
  })

  describe('when hideToolbar is false', () => {
    it('renders a toolbar with a language selector', () => {
      const gherkinEditor = render(<GherkinEditor />)

      const toolbar = gherkinEditor.queryByTestId('editor-toolbar')

      expect(toolbar).toBeInTheDocument()
      expect(toolbar).toHaveTextContent('English')
    })
  })

  describe('when hideToolbar is true', () => {
    it('does not render a toolbar', () => {
      const gherkinEditor = render(<GherkinEditor hideToolbar />)

      expect(
        gherkinEditor.queryByTestId('editor-toolbar')
      ).not.toBeInTheDocument()
    })
  })

  describe('when no setOptions value is provided', () => {
    it('sets options with default values', () => {
      const ref = React.createRef()
      render(<GherkinEditor ref={ref} />)

      const editor = ref.current.editor

      expect(editor.getOption('fontFamily')).toEqual(
        "'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace"
      )
      expect(editor.getOption('enableBasicAutocompletion')).toBe(true)
      expect(editor.getOption('enableLiveAutocompletion')).toBe(true)
      expect(editor.getOption('showLineNumbers')).toBe(false)
      expect(editor.getOption('displayIndentGuides')).toBe(false)
      expect(editor.getOption('tabSize')).toBe(2)
    })
  })

  describe('when a setOptions value is provided', () => {
    it('merges options with the default options', () => {
      const setOptions = {
        showLineNumbers: true,
        tabSize: 4,
        firstLineNumber: 5
      }

      const ref = React.createRef()
      render(<GherkinEditor setOptions={setOptions} ref={ref} />)

      const editor = ref.current.editor

      expect(editor.getOption('fontFamily')).toEqual(
        "'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace"
      )
      expect(editor.getOption('enableBasicAutocompletion')).toBe(true)
      expect(editor.getOption('enableLiveAutocompletion')).toBe(true)
      expect(editor.getOption('showLineNumbers')).toBe(true)
      expect(editor.getOption('displayIndentGuides')).toBe(false)
      expect(editor.getOption('tabSize')).toBe(4)
      expect(editor.getOption('firstLineNumber')).toBe(5)
    })
  })

  describe('when content is changed', () => {
    it('calls the onChange callback', () => {
      const onChange = jest.fn()

      const ref = React.createRef()
      render(
        <GherkinEditor
          initialValue='Given a scenario'
          onChange={onChange}
          ref={ref}
        />
      )

      const editor = ref.current.editor

      editor.setValue('Then no scenario')

      expect(onChange).toHaveBeenCalledWith(
        'Then no scenario',
        expect.anything()
      )
    })
  })

  describe('linting', () => {
    describe('when linter is activated', () => {
      it('lints the initial value', () => {
        render(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter
          />
        )

        expect(annotate).toHaveBeenCalledWith('Given a scenario')
      })

      it('lints with new value when it has changed', () => {
        const ref = React.createRef()

        render(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter
            ref={ref}
          />
        )

        const editor = ref.current.editor

        editor.setValue('Then no scenario')

        expect(annotate).toHaveBeenCalledWith('Then no scenario')
      })

      it('lints after language has changed', () => {
        const { rerender } = render(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter
            language='en'
          />
        )

        annotate.mockClear()
        setLanguage.mockClear()

        rerender(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter
            language='fr'
          />
        )

        expect(setLanguage).toHaveBeenCalledWith('fr')
        expect(annotate).toHaveBeenCalled()
      })

      it('lints after mode has changed', () => {
        const { rerender } = render(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter
          />
        )

        annotate.mockClear()
        setMode.mockClear()

        rerender(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter
            mode='gherkin_scenario_i18n'
          />
        )

        expect(setMode).toHaveBeenCalledWith('gherkin_scenario_i18n')
        expect(annotate).toHaveBeenCalled()
      })

      it('delegates onParse to the annotator', () => {
        const onParse = jest.fn()
        render(
          <GherkinEditor
            initialValue='Feature: My feature \nScenario: Given a scenario'
            showGutter
            activateLinter={false}
          />
        )

        render(
          <GherkinEditor
            initialValue='Feature: My feature \nScenario: Given a scenario'
            showGutter
            activateLinter
            onParse={onParse}
          />
        )
        expect(GherkinAnnotator).toHaveBeenCalledTimes(1)
        expect(GherkinAnnotator).toHaveBeenCalledWith(expect.anything(), onParse)
      })
    })

    describe('when linter status changes', () => {
      it('resets the annotator session', () => {
        const { rerender } = render(<GherkinEditor showGutter activateLinter />)

        rerender(<GherkinEditor showGutter />)
        rerender(<GherkinEditor showGutter activateLinter />)

        expect(GherkinAnnotator).toHaveBeenCalledTimes(1)
        expect(setSession).toHaveBeenCalledTimes(1)
      })
    })

    describe('when linter is deactivated', () => {
      it('does not instanciate linter', () => {
        render(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter={false}
          />
        )

        expect(GherkinAnnotator).not.toHaveBeenCalled()
      })

      it('does not lint when value has changed', () => {
        const ref = React.createRef()

        render(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter
            activateLinter={false}
            ref={ref}
          />
        )

        const editor = ref.current.editor

        editor.setValue('Then no scenario')

        expect(GherkinAnnotator).not.toHaveBeenCalled()
      })
    })

    describe('when gutter is deactivated', () => {
      it('deactivates linting and warns the users', () => {
        const { warn } = console

        console.warn = jest.fn()

        render(
          <GherkinEditor
            initialValue='Given a scenario'
            showGutter={false}
            activateLinter
          />
        )

        expect(GherkinAnnotator).not.toHaveBeenCalled()
        expect(console.warn).toHaveBeenCalledWith(
          'activateLinter requires showGutter to be true'
        )

        console.warn = warn
      })
    })
  })
})
