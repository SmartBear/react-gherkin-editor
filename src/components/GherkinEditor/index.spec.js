import React from 'react'
import { render } from '@testing-library/react'
import GherkinEditor from '.'

describe('GherkinEditor', () => {
  it('renders a Gherkin editor', () => {
    const gherkinEditor = render(<GherkinEditor />)

    expect(gherkinEditor.container.querySelector('.ace_editor')).toBeInTheDocument()
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

      expect(gherkinEditor.queryByTestId('editor-toolbar')).not.toBeInTheDocument()
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
})
