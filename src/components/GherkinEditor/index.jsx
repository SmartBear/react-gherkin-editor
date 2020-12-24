import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import { Resizable } from 're-resizable'
import KeywordCompleter from '../../modules/keyword-completer'
import StepCompleter from '../../modules/step-completer'
import {
  setGherkinDialect as setDialect,
  getGherkinDialect as getDialect
} from '../../modules/dialects/gherkin_i18n'
import {
  setGherkinDialect as setBackgroundDialect,
  getGherkinDialect as getBackgroundDialect
} from '../../modules/dialects/gherkin_background_i18n'
import {
  setGherkinDialect as setScenarioDialect,
  getGherkinDialect as getScenarioDialect
} from '../../modules/dialects/gherkin_scenario_i18n'
import GherkinAnnotator from '../../modules/gherkin-annotator'
import Toolbar from './Toolbar'
import { EditorWrapper } from './style'

import 'ace-builds/src-noconflict/ext-language_tools'

import '../../themes/jira'
import '../../themes/cucumber'

import '../../modules/mode/gherkin_i18n'
import '../../modules/mode/gherkin_background_i18n'
import '../../modules/mode/gherkin_scenario_i18n'

const setGherkinDialectFunctions = {
  gherkin_i18n: setDialect,
  gherkin_background_i18n: setBackgroundDialect,
  gherkin_scenario_i18n: setScenarioDialect
}

const getGherkinDialectFunctions = {
  gherkin_i18n: getDialect,
  gherkin_background_i18n: getBackgroundDialect,
  gherkin_scenario_i18n: getScenarioDialect
}

const defaultOptions = {
  fontFamily: [
    "'SFMono-Medium'",
    "'SF Mono'",
    "'Segoe UI Mono'",
    "'Roboto Mono'",
    "'Ubuntu Mono'",
    'Menlo',
    'Consolas',
    'Courier',
    'monospace'
  ].join(', '),
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  showLineNumbers: false,
  displayIndentGuides: false,
  tabSize: 2
}

const GherkinEditor = React.forwardRef((props, ref) => {
  const [currentLanguage, setCurrentLanguage] = useState(props.language)
  const [height, setHeight] = useState(props.initialHeight)

  const aceEditorRef = useRef()
  const gherkinAnnotator = useRef()

  const {
    initialValue,
    language,
    hideToolbar,
    readOnly,
    uniqueId,
    toolbarContent,
    onSubmit,
    autoCompleteFunction,
    onLanguageChange,
    autoFocus,
    theme,
    mode,
    showGutter,
    activateLinter,
    setOptions
  } = props

  const setGherkinDialect = setGherkinDialectFunctions[mode] || setDialect
  const getGherkinDialect = getGherkinDialectFunctions[mode] || getDialect

  useEffect(() => {
    if (autoFocus) {
      aceEditorRef.current.editor.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    const keywordCompleter = new KeywordCompleter(getGherkinDialect)
    const stepCompleter = new StepCompleter(autoCompleteFunction, getGherkinDialect)
    const langTools = window.ace.acequire('ace/ext/language_tools')

    langTools.setCompleters([keywordCompleter, stepCompleter])
  }, [autoCompleteFunction, getGherkinDialect])

  useEffect(() => {
    setCurrentLanguage(language)
  }, [language])

  useEffect(() => {
    setGherkinDialect(currentLanguage)

    aceEditorRef.current.editor.session.setMode({
      path: `ace/mode/${mode}`,
      v: Date.now()
    })
  }, [setGherkinDialect, currentLanguage, mode])

  useEffect(() => {
    if (!activateLinter) {
      gherkinAnnotator.current = null
      return
    }

    if (!showGutter) {
      gherkinAnnotator.current = null
      console.warn('activateLinter requires showGutter to be true')
      return
    }

    if (!gherkinAnnotator.current) {
      const { editor } = aceEditorRef.current
      gherkinAnnotator.current = new GherkinAnnotator(editor.getSession())
    }

    gherkinAnnotator.current.setLanguage(currentLanguage)
    gherkinAnnotator.current.setMode(mode)
  }, [activateLinter, showGutter, currentLanguage, mode])

  useEffect(() => {
    if (!gherkinAnnotator.current) {
      return
    }

    gherkinAnnotator.current.annotateNow(initialValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(ref, () => ({
    editor: aceEditorRef.current.editor
  }))

  const onResizeStop = (_event, _direction, _refToElement, delta) => {
    setHeight(height + delta.height)
  }

  const languageChangeHandler = option => {
    setCurrentLanguage(option.value)
    onLanguageChange(option)
  }

  const onChangeHandler = (newValue, ...args) => {
    if (gherkinAnnotator.current) {
      gherkinAnnotator.current.annotate(newValue)
    }

    return props.onChange(newValue, ...args)
  }

  const options = { ...defaultOptions, ...setOptions }

  return (
    <EditorWrapper>
      {!hideToolbar &&
        <Toolbar
          content={toolbarContent}
          language={currentLanguage}
          readOnly={readOnly}
          onLanguageChange={languageChangeHandler}
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
          onChange={onChangeHandler}
          ref={aceEditorRef}
          theme={theme}
          value={initialValue}
          name={uniqueId}
          editorProps={{ $blockScrolling: true }}
          setOptions={options}
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
})

GherkinEditor.propTypes = {
  initialValue: PropTypes.string,
  language: PropTypes.string,
  hideToolbar: PropTypes.bool,
  readOnly: PropTypes.bool,
  uniqueId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toolbarContent: PropTypes.node,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  autoCompleteFunction: PropTypes.func,
  onLanguageChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  initialHeight: PropTypes.number,
  theme: PropTypes.string,
  mode: PropTypes.oneOf(['gherkin_i18n', 'gherkin_background_i18n', 'gherkin_scenario_i18n']),
  fontSize: PropTypes.number,
  width: PropTypes.string,
  showPrintMargin: PropTypes.bool,
  showGutter: PropTypes.bool,
  highlightActiveLine: PropTypes.bool,
  activateLinter: PropTypes.bool,
  setOptions: PropTypes.object
}

GherkinEditor.defaultProps = {
  initialValue: '',
  language: 'en',
  hideToolbar: false,
  readOnly: false,
  uniqueId: Math.random().toString(36).substr(2, 9),
  onChange: () => {},
  onSubmit: () => {},
  autoCompleteFunction: () => Promise.resolve([]),
  onLanguageChange: () => {},
  autoFocus: false,
  initialHeight: 500,
  theme: 'jira',
  mode: 'gherkin_i18n',
  fontSize: 14,
  width: '100%',
  showPrintMargin: false,
  showGutter: false,
  highlightActiveLine: false,
  activateLinter: false,
  setOptions: {}
}

export default GherkinEditor
