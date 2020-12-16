import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import { Resizable } from 're-resizable'
import KeywordCompleter from './modules/keyword-completer'
import StepCompleter from './modules/step-completer'
import {
  setGherkinDialect as setDialect,
  getGherkinDialect as getDialect
} from './modules/gherkin_i18n_dialects'
import {
  setGherkinDialect as setBackgroundDialect,
  getGherkinDialect as getBackgroundDialect
} from './modules/gherkin_background_i18n_dialects'
import {
  setGherkinDialect as setScenarioDialect,
  getGherkinDialect as getScenarioDialect
} from './modules/gherkin_scenario_i18n_dialects'
import Toolbar from './Toolbar'
import { EditorWrapper } from './style'

import 'ace-builds/src-noconflict/ext-language_tools'

import './theme/jira'
import './theme/c4j'

import './modules/mode/gherkin_i18n'
import './modules/mode/gherkin_background_i18n'
import './modules/mode/gherkin_scenario_i18n'

const GherkinEditor = (props) => {
  const [height, setHeight] = useState(props.initialHeight)
  const {
    initialValue,
    language,
    hideToolbar,
    readOnly,
    uniqueId,
    toolbarContent,
    onChange,
    onSubmit,
    autoCompleteFunction,
    onLanguageChange,
    autoFocus,
    theme,
    mode
  } = props
  let aceEditorRef = null

  useEffect(() => {
    if (autoFocus) {
      aceEditorRef.editor.focus()
    }

    let getGherkinDialect

    switch (mode) {
      case 'gherkin_i18n':
        getGherkinDialect = getDialect
        break
      case 'gherkin_background_i18n':
        getGherkinDialect = getBackgroundDialect
        break
      case 'gherkin_scenario_i18n':
        getGherkinDialect = getScenarioDialect
        break
      default:
        getGherkinDialect = getDialect
        break
    }

    const keywordCompleter = new KeywordCompleter(getGherkinDialect)
    const stepCompleter = new StepCompleter(autoCompleteFunction, getGherkinDialect)
    const langTools = window.ace.acequire('ace/ext/language_tools')

    setModeLanguage(language)
    langTools.setCompleters([keywordCompleter, stepCompleter])
  })

  const setAceEditorRef = aceEditor => {
    aceEditorRef = aceEditor
  }

  const setModeLanguage = language => {
    switch (mode) {
      case 'gherkin_i18n':
        setDialect(language)
        break
      case 'gherkin_background_i18n':
        setBackgroundDialect(language)
        break
      case 'gherkin_scenario_i18n':
        setScenarioDialect(language)
        break
      default:
        setDialect(language)
        break
    }
    // Force reload of ace editor mode
    aceEditorRef.editor.session.setMode({
      path: `ace/mode/${mode}`,
      v: Date.now()
    })
  }

  const onResizeStop = (_event, _direction, _refToElement, delta) => {
    setHeight(height + delta.height)
  }

  return (
    <EditorWrapper>
      {!hideToolbar &&
        <Toolbar
          defaultLanguage={language}
          onLanguageChange={onLanguageChange}
          setModeLanguage={setModeLanguage}
          content={toolbarContent}
          readOnly={readOnly}
        />}
      <Resizable
        size={{ width: '100%', height: `${height}px` }}
        onResizeStop={onResizeStop}
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
          {...props}
          ref={setAceEditorRef}
          theme={theme}
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

GherkinEditor.propTypes = {
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
  initialHeight: PropTypes.number,
  theme: PropTypes.string,
  mode: PropTypes.oneOf(['gherkin_i18n', 'gherkin_background_i18n', 'gherkin_scenario_i18n'])
}

GherkinEditor.defaultProps = {
  initialValue: '',
  language: 'en',
  hideToolbar: false,
  readOnly: false,
  uniqueId: Math.random()
    .toString(36)
    .substr(2, 9),
  onChange: () => {},
  onSubmit: () => {},
  autoCompleteFunction: () => Promise.resolve([]),
  onLanguageChange: () => {},
  autoFocus: false,
  theme: 'jira',
  mode: 'gherkin_i18n',
  fontSize: 14,
  width: '100%',
  initialHeight: 500,
  showPrintMargin: false,
  showGutter: false,
  highlightActiveLine: false,
  setOptions: {
    fontFamily: "'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    showLineNumbers: false,
    displayIndentGuides: false,
    tabSize: 2
  }
}

export default GherkinEditor
