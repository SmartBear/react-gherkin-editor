/* istanbul ignore file */
import React, { useState } from 'react'
import { render } from 'react-dom'
import GherkinEditor from './components/GherkinEditor'
import Select from 'react-select'

const steps = [
  'I start the coffee machine using language "lang"',
  'I shutdown the coffee machine',
  'message "message" should be displayed',
  'coffee should be served',
  'coffee should not be served',
  'I take a coffee',
  'I empty the coffee grounds',
  'I fill the beans tank',
  'I fill the water tank',
  'I take "coffee_number" coffees',
  'the coffee machine is started',
  'I handle everything except the water tank',
  'I handle water tank',
  'I handle beans',
  'I handle coffee grounds',
  'I handle everything except the beans',
  'I handle everything except the grounds',
  'displayed message is:',
  'I switch to settings mode',
  'settings should be:'
]

const autoCompleteFunction = (_keyword, text) => {
  const matches = steps.filter(step => step.startsWith(text))
  const completions = matches.map(match => ({
    caption: match,
    value: match,
    score: Math.floor(Math.random() * Math.floor(100)),
    meta: 'Step'
  }))
  return Promise.resolve(completions)
}

const Preview = () => {
  const [theme, setTheme] = useState('jira')
  const [mode, setMode] = useState('gherkin_i18n')
  const [language, setLanguage] = useState('en')
  const [value, setValue] = useState(`Feature: Support internationalisation
  As a polyglot coffee lover
  I can select the language on the coffee machine
  So I can practice my use of greetings in several languages

  Scenario: No messages are displayed when machine is shut down
    Given the coffee machine is started
    When I shutdown the coffee machine
    Then message "Bye" should be displayed

  Scenario Outline: Messages are based on language
  # Well, sometimes, you just get a coffee.
    When I start the coffee machine using language <language>
    Then message <ready_message> should be displayed

    Examples:
      | language   | ready_message |
      | en         | Ready         |
      | fr         | Pret          |
`)

  const onChange = value => {
    console.log(value)
    setValue(value)
  }

  const themeOptions = [
    { label: 'jira', value: 'jira' },
    { label: 'cucumber', value: 'cucumber' }
  ]
  const modeOptions = [
    { label: 'gherkin i18n', value: 'gherkin_i18n' },
    { label: 'gherkin background i18n', value: 'gherkin_background_i18n' },
    { label: 'gherkin scenario i18n', value: 'gherkin_scenario_i18n' }
  ]

  const ToolbarContent =
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '8px' }}>Theme</span>
      <Select
        styles={{
          control: provided => ({ ...provided, marginRight: '20px' }),
          singleValue: () => ({ display: 'flex' })
        }}
        onChange={option => setTheme(option.value)}
        options={themeOptions}
        defaultValue={themeOptions[0]}
      />
      <span style={{ marginRight: '8px' }}>Mode</span>
      <Select
        styles={{
          singleValue: () => ({ display: 'flex' })
        }}
        onChange={option => setMode(option.value)}
        options={modeOptions}
        defaultValue={modeOptions[0]}
      />
    </div>

  return (
    <div style={{ padding: '5px' }}>
      <GherkinEditor
        initialValue={value}
        language={language}
        onChange={onChange}
        onSubmit={onChange}
        onLanguageChange={option => setLanguage(option.value)}
        theme={theme}
        mode={mode}
        autoCompleteFunction={autoCompleteFunction}
        toolbarContent={ToolbarContent}
        autoFocus
        activateLinter
        showGutter
        setOptions={
          {
            showLineNumbers: true
          }
        }
      />
    </div>
  )
}

const root = document.getElementById('root')

render(<Preview />, root)
