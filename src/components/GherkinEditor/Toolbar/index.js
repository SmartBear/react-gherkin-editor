import React, { useState, useEffect } from 'react'
import Select from '@atlaskit/select'
import gherkinLanguages from '../modules/gherkin_languages'
import { ToolbarContainer, LanguageDropdownContainer } from './style'

const availableLanguages = Object.entries(gherkinLanguages).map(([key, language]) => ({
  key,
  label: language.native,
  value: key
}))

const languageSelectStyles = {
  container: styles => ({ ...styles, 'z-index': 5 })
}

const Toolbar = ({ content, defaultLanguage, readOnly, onLanguageChange, setModeLanguage }) => {
  const [language, setLanguage] = useState(defaultLanguage)
  const gherkinLanguage = gherkinLanguages[language]

  useEffect(() => {
    setLanguage(defaultLanguage)
  }, [defaultLanguage])

  useEffect(() => {
    setModeLanguage(language)
  }, [setModeLanguage, language])

  const languageChangeHandler = option => {
    setLanguage(option.value)
    onLanguageChange(option)
  }

  return (
    <ToolbarContainer data-testid='editor-toolbar'>
      <LanguageDropdownContainer>
        <Select
          value={{ key: gherkinLanguage.key, label: gherkinLanguage.native }}
          options={availableLanguages}
          onChange={languageChangeHandler}
          styles={languageSelectStyles}
          isDisabled={readOnly}
        />
      </LanguageDropdownContainer>
      {content}
    </ToolbarContainer>
  )
}

export default Toolbar
