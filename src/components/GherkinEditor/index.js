import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import Brace from 'brace'
import KeywordCompleter from './modules/keyword-completer'
import StepCompleter from './modules/step-completer'
import './themes/jira'
import 'brace/mode/gherkin'
import 'brace/ext/language_tools'

class GherkinEditor extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    uniqueId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func.isRequired,
    autoCompleteFunction: PropTypes.func
  }

  static defaultProps = {
    initialValue: '',
    uniqueId: Math.random()
      .toString(36)
      .substr(2, 9),
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

  state = {
    value: this.props.initialValue
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

  componentDidMount () {
    const { autoCompleteFunction } = this.props
    const keywordCompleter = new KeywordCompleter()
    const stepCompleter = new StepCompleter(autoCompleteFunction)
    const langTools = Brace.acequire('ace/ext/language_tools')
    langTools.setCompleters([keywordCompleter, stepCompleter])
  }

  onChange = newValue => {
    this.setState({ value: newValue })
    const { onValueChange } = this.props
    const { value } = this.state
    onValueChange(value)
  }

  render () {
    const { uniqueId } = this.props
    const { value } = this.state
    return (
      <AceEditor
        {...this.props}
        ref={this.setAceEditorRef}
        mode='gherkin'
        value={value}
        name={uniqueId}
        editorProps={{ $blockScrolling: true }}
        onChange={this.onChange}
      />
    )
  }
}

export default GherkinEditor
