import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import Brace from 'brace'
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
    showPrintMargin: true,
    showGutter: true,
    highlightActiveLine: true,
    setOptions: {
      fontFamily: `'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace`,
      enableLiveAutocompletion: true,
      showLineNumbers: true,
      tabSize: 2
    }
  }

  state = {
    value: this.props.initialValue
  }

  reactAceRef = React.createRef()

  /**
   * Get the low level ace editor
   * @return {Object}
   */
  get ace () {
    const { editor } = this.reactAceRef.current
    return editor
  }

  componentDidMount () {
    const { autoCompleteFunction } = this.props
    const gherkinStepsCompleter = new StepCompleter(autoCompleteFunction)
    const langTools = Brace.acequire('ace/ext/language_tools')
    langTools.addCompleter(gherkinStepsCompleter)
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
      <Fragment>
        <AceEditor
          {...this.props}
          ref={this.reactAceRef}
          mode='gherkin'
          value={value}
          name={uniqueId}
          editorProps={{ $blockScrolling: true }}
          onChange={this.onChange}
        />
      </Fragment>
    )
  }
}

export default GherkinEditor
