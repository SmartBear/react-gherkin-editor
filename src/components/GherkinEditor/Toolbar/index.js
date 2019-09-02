import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Select from '@atlaskit/select'
import gherkinLanguages from '../modules/gherkin_languages'

const ToolbarContainer = styled.div`
  background-color: rgb(235, 236, 240);
  padding: 4px;
`
const LanguageDropdownContainer = styled.div`
  width: 200px;
`
const availableLanguages = Object.keys(gherkinLanguages).map(key => ({
  label: gherkinLanguages[key].native,
  value: key
}))

const languageSelectStyles = {
  container (styles) {
    return { ...styles, 'z-index': 5 }
  }
}

class Toolbar extends PureComponent {
  languageChangeHandler = (option, event) => {
    const { value } = option
    const { onLanguageChange } = this.props
    this.setState({ language: value })
    onLanguageChange(option)
  }

  state = {
    language: this.props.language
  }

  render () {
    const { language } = this.state
    const { key, native } = gherkinLanguages[language]
    return (
      <ToolbarContainer>
        <LanguageDropdownContainer>
          <Select
            defaultValue={{ key: key, label: native }}
            options={availableLanguages}
            onChange={this.languageChangeHandler}
            styles={languageSelectStyles}
          />
        </LanguageDropdownContainer>
      </ToolbarContainer>
    )
  }
}

export default Toolbar
