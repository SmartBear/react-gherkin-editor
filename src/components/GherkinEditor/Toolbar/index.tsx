import gherkinLanguages from 'lib/gherkin-languages'
import _find from 'lodash/find'
import React from 'react'
import Select from 'react-select'

import { LanguageDropdownContainer, ToolbarContainer } from './styled'

interface ToolbarProps {
  content: React.ReactNode
  language: string
  readOnly: boolean
  onLanguageChange(option: object): void
}

const availableLanguages = Object.entries(gherkinLanguages).map(([key, language]) => ({
  value: key,
  label: (language as any).native
}))

const languageSelectStyles = {
  container: styles => ({ ...styles, 'z-index': 5 })
}

const Toolbar = ({ content, language="en", readOnly=false, onLanguageChange=() => {} }: ToolbarProps) => {
  const gherkinLanguage = _find(availableLanguages, { value: language })

  return (
    <ToolbarContainer data-testid='editor-toolbar'>
      <LanguageDropdownContainer>
        <Select
          value={gherkinLanguage}
          options={availableLanguages}
          onChange={onLanguageChange}
          styles={languageSelectStyles}
          isDisabled={readOnly}
          classNamePrefix='gherkin-editor-language-select'
        />
      </LanguageDropdownContainer>
      {content}
    </ToolbarContainer>
  )
}

// Toolbar.propTypes = {
//   content: PropTypes.node,
//   language: PropTypes.string,
//   readOnly: PropTypes.bool,
//   onLanguageChange: PropTypes.func
// }

// Toolbar.defaultProps = {
//   language: 'en',
//   readOnly: false,
//   onLanguageChange: () => {}
// }

export default Toolbar
