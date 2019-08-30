import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import Brace from 'brace'
import KeywordCompleter from './modules/keyword-completer'
import StepCompleter from './modules/step-completer'
import './theme/jira'
import './mode/gherkin_i18n'
import { setGherkinDialect } from './mode/gherkin_i18n_dialects'
import 'brace/ext/language_tools'

class GherkinEditor extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    language: PropTypes.string,
    uniqueId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    autoCompleteFunction: PropTypes.func
  }

  static defaultProps = {
    initialValue: '',
    language: 'en',
    uniqueId: Math.random()
      .toString(36)
      .substr(2, 9),
    onChange: () => {},
    autoCompleteFunction: () => Promise.resolve([]),
    theme: 'jira',
    width: '100%',
    fontSize: 14,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: true,
    setOptions: {
      fontFamily: `'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace`,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: true,
      displayIndentGuides: true,
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

  componentDidMount () {
    const { language, autoCompleteFunction } = this.props
    const keywordCompleter = new KeywordCompleter()
    const stepCompleter = new StepCompleter(autoCompleteFunction)
    const langTools = Brace.acequire('ace/ext/language_tools')

    this.setModeLanguage(language)
    langTools.setCompleters([keywordCompleter, stepCompleter])
  }

  render () {
    const { uniqueId, initialValue, onChange } = this.props
    return (
      <AceEditor
        {...this.props}
        ref={this.setAceEditorRef}
        mode='gherkin_i18n'
        value={initialValue}
        name={uniqueId}
        editorProps={{ $blockScrolling: true }}
        onChange={onChange}
      />
    )
  }
}

export default GherkinEditor
