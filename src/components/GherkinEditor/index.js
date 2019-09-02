import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import Brace from 'brace'
import styled from 'styled-components'
import KeywordCompleter from './modules/keyword-completer'
import StepCompleter from './modules/step-completer'
import { setGherkinDialect } from './modules/gherkin_i18n_dialects'
import './modules/mode/gherkin_i18n'
import './theme/jira'
import 'brace/ext/language_tools'
import Toolbar from './Toolbar'

const EditorWrapper = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: rgb(223, 225, 230);
  border-radius: 3px;
`
const ContentWrapper = styled.div`
  margin-top: 15px;
  margin-left: 3px;
`
class GherkinEditor extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    language: PropTypes.string,
    uniqueId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    autoCompleteFunction: PropTypes.func,
    onLanguageChange: PropTypes.func
  }

  static defaultProps = {
    initialValue: '',
    language: 'fr',
    uniqueId: Math.random()
      .toString(36)
      .substr(2, 9),
    onChange: () => {},
    autoCompleteFunction: () => Promise.resolve([]),
    onLanguageChange: () => {},
    theme: 'jira',
    width: '100%',
    fontSize: 14,
    showPrintMargin: false,
    showGutter: false,
    highlightActiveLine: false,
    setOptions: {
      fontFamily: `'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace`,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: false,
      displayIndentGuides: false,
      tabSize: 2
    }
  }

  constructor (props) {
    super(props)
    this.AceEditorRef = null
  }

  get ace () {
    return this.AceEditorRef.editor
  }

  setAceEditorRef = aceEditor => {
    this.AceEditorRef = aceEditor
  }

  setModeLanguage = language => {
    setGherkinDialect(language)
    // Force reload of ace editor mode
    this.ace.session.setMode({
      path: 'ace/mode/gherkin_i18n',
      v: Date.now()
    })
  }

  onLanguageChange = (option) => {
    const { value } = option
    const { onLanguageChange } = this.props
    this.setModeLanguage(value)
    onLanguageChange(option)
  }

  componentDidMount () {
    const { language, autoCompleteFunction } = this.props
    const keywordCompleter = new KeywordCompleter()
    const stepCompleter = new StepCompleter(autoCompleteFunction)
    const langTools = Brace.acequire('ace/ext/language_tools')

    this.setModeLanguage(language)
    langTools.setCompleters([keywordCompleter, stepCompleter])
  }

  render () {
    const { language, initialValue, uniqueId, onChange } = this.props
    return (
      <EditorWrapper>
        <Toolbar language={language} onLanguageChange={this.onLanguageChange} />
        <ContentWrapper>
          <AceEditor
            {...this.props}
            ref={this.setAceEditorRef}
            mode='gherkin_i18n'
            value={initialValue}
            name={uniqueId}
            editorProps={{ $blockScrolling: true }}
            onChange={onChange}
          />
        </ContentWrapper>
      </EditorWrapper>
    )
  }
}

export default GherkinEditor
