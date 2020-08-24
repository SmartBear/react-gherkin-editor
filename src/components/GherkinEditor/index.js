import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import Brace from 'brace'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
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
class GherkinEditor extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    language: PropTypes.string,
    readOnly: PropTypes.bool,
    uniqueId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    autoCompleteFunction: PropTypes.func,
    onLanguageChange: PropTypes.func,
    toolbarContent: PropTypes.node,
    hideToolbar: PropTypes.bool,
    autoFocus: PropTypes.bool,
    initialHeight: PropTypes.number
  }

  static defaultProps = {
    initialValue: '',
    language: 'en',
    hideToolbar: false,
    readOnly: false,
    uniqueId: Math.random()
      .toString(36)
      .substr(2, 9),
    onChange: () => {},
    onSubmit: (text) => {},
    autoCompleteFunction: () => Promise.resolve([]),
    onLanguageChange: () => {},
    autoFocus: false,
    theme: 'jira',
    fontSize: 14,
    width: '100%',
    initialHeight: 500,
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

  state = {
    height: this.props.initialHeight
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

  onResizeStop = (e, direction, ref, d) => {
    this.setState({ height: this.state.height + d.height })
  }

  componentDidMount () {
    const { autoFocus, language, autoCompleteFunction } = this.props

    if (autoFocus) {
      this.ace.focus()
    }

    const keywordCompleter = new KeywordCompleter()
    const stepCompleter = new StepCompleter(autoCompleteFunction)
    const langTools = Brace.acequire('ace/ext/language_tools')

    this.setModeLanguage(language)
    langTools.setCompleters([keywordCompleter, stepCompleter])
  }

  render () {
    const {
      language,
      initialValue,
      uniqueId,
      onChange,
      onLanguageChange,
      onSubmit,
      toolbarContent,
      readOnly
    } = this.props

    const { height } = this.state

    return (
      <EditorWrapper>
        { !this.props.hideToolbar && <Toolbar
          defaultLanguage={language}
          onLanguageChange={onLanguageChange}
          setModeLanguage={this.setModeLanguage}
          content={toolbarContent}
          readOnly={readOnly}
        /> }
        <Resizable
          size={{ width: '100%', height: `${height}px` }}
          onResizeStop={this.onResizeStop}
          enable={{
            top: false,
            right: false,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false
          }}
        >
          <AceEditor
            {...this.props}
            ref={this.setAceEditorRef}
            mode='gherkin_i18n'
            value={initialValue}
            name={uniqueId}
            editorProps={{ $blockScrolling: true }}
            onChange={onChange}
            height={`${height}px`}
            commands={[{
              name: 'test',
              bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
              exec: editor => onSubmit(editor.getValue())
            }]}
          />
        </Resizable>
      </EditorWrapper>
    )
  }
}

export default GherkinEditor
