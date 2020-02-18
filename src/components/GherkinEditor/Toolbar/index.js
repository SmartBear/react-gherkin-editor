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
  state = {
    language: this.props.defaultLanguage
  }

  languageChangeHandler = (option, _event) => {
    const { onLanguageChange } = this.props
    const { value } = option
    this.setState({ language: value })
    onLanguageChange(option)
  }

  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.defaultLanguage !== this.state.language) {
      this.setState({ language: nextProps.defaultLanguage })
    }
  }

  componentDidUpdate (_prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.props.setModeLanguage(this.state.language)
    }
  }

  render () {
    const { content, readOnly } = this.props
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
            isDisabled={readOnly}
          />
        </LanguageDropdownContainer>
        {content}
      </ToolbarContainer>
    )
  }
}

export default Toolbar
