import React from 'react'
import { render } from '@testing-library/react'
import SelectEvent from 'react-select-event'
import Toolbar from 'components/Toolbar'

describe('Toolbar', () => {
  describe('when no language is set', () => {
    it('renders a language selector with English as the default language', () => {
      const toolbar = render(<Toolbar />)

      expect(
        toolbar.container.querySelector(
          '.gherkin-editor-language-select__single-value'
        )
      ).toHaveTextContent('English')
    })
  })

  describe('when a language is set', () => {
    it('renders a language selector with the default language', () => {
      const toolbar = render(<Toolbar language='fr' />)

      expect(
        toolbar.container.querySelector(
          '.gherkin-editor-language-select__single-value'
        )
      ).toHaveTextContent('français')
    })
  })

  describe('when the toolbar is not read only', () => {
    it('renders the language selector as enabled', () => {
      const toolbar = render(<Toolbar />)

      expect(
        toolbar.container.querySelector(
          '.gherkin-editor-language-select__input input'
        )
      ).toBeEnabled()
    })

    it('calls the onLanguageChange callback when changing the language', async () => {
      const onLanguageChange = jest.fn()

      const toolbar = render(<Toolbar onLanguageChange={onLanguageChange} />)

      await SelectEvent.select(
        toolbar.container.querySelector(
          '.gherkin-editor-language-select__input input'
        ),
        'français'
      )

      expect(onLanguageChange).toHaveBeenCalled()
    })
  })

  describe('when the toolbar is read only', () => {
    it('renders the language selector as disabled', () => {
      const toolbar = render(<Toolbar readOnly />)

      expect(
        toolbar.container.querySelector(
          '.gherkin-editor-language-select__input input'
        )
      ).toBeDisabled()
    })
  })
})
