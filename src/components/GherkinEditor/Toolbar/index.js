import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Select from '@atlaskit/select'
import gherkinLanguages from '../modules/gherkin_languages'

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 3px;
  background-color: rgb(235, 236, 240);
`
const LanguageDropdownContainer = styled.div`
  min-width: 150px;
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
  languageChangeHandler = (option, _event) => {
    const { onLanguageChange } = this.props
    const { value } = option
    this.setState({ language: value })
    onLanguageChange(option)
  }

  state = {
    language: this.props.defaultLanguage
  }

  static getDerivedStateFromProps (props, state) {
    if (props.defaultLanguage !== state.langauge) {
      return {
        language: props.defaultLanguage
      }
    }
    return null
  }

  componentDidUpdate (_prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.props.setModeLanguage(this.state.language)
    }
  }

  render () {
    const { content } = this.props
    const { language } = this.state
    const { key, native } = gherkinLanguages[language]
    return (
      <ToolbarContainer>
        <LanguageDropdownContainer>
          <Select
            value={{ key: key, label: native }}
            options={availableLanguages}
            onChange={this.languageChangeHandler}
            styles={languageSelectStyles}
          />
        </LanguageDropdownContainer>
        {content}
      </ToolbarContainer>
    )
  }
}

export default Toolbar
