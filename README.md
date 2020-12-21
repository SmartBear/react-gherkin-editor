# react-gherkin-editor

This is a wrapper arround [React Ace Editor](https://github.com/securingsincity/react-ace) specially designed for Gherkin.

- It includes a special theme for Jira based on ace textmate theme.
- It includes a special theme for Cucumber.


## Features

- Gherkin syntax highlighting
- Gherkin keywords snippets
- Easy to provide step autocompletions (Promise based)
- I18n support (New)

## Install from a release tag

### With Yarn
`yarn add @smartbear/react-gherkin-editor`

### With npm
`npm install --save @smartbear/react-gherkin-editor`


## Basic Usage

```javascript
import { render } from 'react-dom'
import GherkinEditor from 'react-gherkin-editor'

const root = document.getElementById('root')

const initialValue = `Feature: Serve coffee
  As a coffee lover
  I can get coffee from the machine
  So I can enjoy the rest of the day

  Scenario: Simple use
    # Well, sometimes, you just get a coffee.
    Given the coffee machine is started
    When I take a coffee
    Then coffee should be served
    And message "Please take your coffee" should be printed`

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

const onValueChange = console.log

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

render(
  <GherkinEditor
    initialValue={initialValue}
    onValueChange={onValueChange}
    autoCompleteFunction={autoCompleteFunction}
    language='en'
    theme='cucumber'
  />,
  root
)
```

___
## Ace Documentation
[React Ace Editor](https://github.com/securingsincity/react-ace)

