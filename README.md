# react-gherkin-editor

This is a wrapper arround [React Ace Editor](https://github.com/securingsincity/react-ace) specially designed for Gherkin.

- It includes a special theme for Jira based on ace textmate theme.


## Features

- Gherkin syntax highlighting
- Gherkin keywords snippets
- Easy to provide step autocompletions (Promise based)
- I18n support (New)

## Install from a release tag

### With Yarn
`yarn add git+ssh://git@github.com/SmartBear/react-gherkin-editor.git#v0.1.0`

### With npm
`npm install --save git+ssh://git@github.com/SmartBear/react-gherkin-editor.git#v0.1.0`


## Install from master branch

### With Yarn
`yarn add git+ssh://git@github.com/SmartBear/react-gherkin-editor.git`

### With npm
`npm install --save git+ssh://git@github.com/SmartBear/react-gherkin-editor.git`


## Basic Usage

```javascript
import { render } from 'react-dom'
import GherkinEditor from './components/GherkinEditor'

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
  />,
  root
)
```

## Documentation

### Release a new version

To release a new version of react-gherkin-editor, you need to:
- Run `git checkout release` then `git merge master`
- Update the version in package.json file (example: 2.0.3)
- Run `npm install` and `npm run build`
- A folder named "build" will be created
- Commit the changes with the message "release [version]" (example: "release 2.0.3")
- From react-gherkin-editor repository, go to releases tab and click on "Draft new release"
  - Tag: v[version] (example: v2.0.3)
  - Target branch: release
  - Release title: Release [version] (example: Release 2.0.3)
  - Fill the release notes
- Click on "Publish release"

Then a new version is released :)

### Upgrade
You can upgrade react-gherkin-editor in two different ways:
- [Using the release tag](https://github.com/SmartBear/react-gherkin-editor/tree/release#install-from-a-release-tag)
- From the Github repository:
  - Go to the wanted release in react-gherkin-editor Github repository
  - Download the source code and copy the downloaded file
  - Go to vendor folder of your project and paste the copied file
  - Run `yarn add file:[path to vendor file]`


## Ace Documentation
[React Ace Editor](https://github.com/securingsincity/react-ace)

