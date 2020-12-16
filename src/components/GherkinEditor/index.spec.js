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
})
