import React, { useState, useEffect } from 'react'
import Select from '@atlaskit/select'
import gherkinLanguages from '../modules/gherkin_languages'
import { ToolbarContainer, LanguageDropdownContainer } from './style'

const Toolbar = ({ content, defaultLanguage, readOnly, onLanguageChange, setModeLanguage }) => {
  const [language, setLanguage] = useState(defaultLanguage)
  const { key, native } = gherkinLanguages[language]

  useEffect(() => {
    if (defaultLanguage !== language) {
      setLanguage(defaultLanguage)
    }
  }, [defaultLanguage])

  useEffect(() => {
    setModeLanguage(language)
  }, [language])

  const languageChangeHandler = (option, _event) => {
    const { value } = option
    setLanguage(value)
    onLanguageChange(option)
  }

  const availableLanguages = Object.keys(gherkinLanguages).map(key => ({
    label: gherkinLanguages[key].native,
    value: key
  }))

  const languageSelectStyles = {
    container (styles) {
      return { ...styles, 'z-index': 5 }
    }
  }

  return (
    <ToolbarContainer>
      <LanguageDropdownContainer>
        <Select
          value={{ key: key, label: native }}
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
