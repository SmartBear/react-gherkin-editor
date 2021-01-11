# React Gherkin Editor

A Gherkin language editor for React.

[![version][version-badge]][package]
[![license][license-badge]][license]

## Introduction

React Gherkin Editor is a wrapper arround [React Ace Editor](https://github.com/securingsincity/react-ace) specially designed for Gherkin.

Features:
- Gherkin syntax highlighting
- Gherkin keyword snippets
- Easy to provide step autocompletions (Promise based)
- I18n support
- Special themes for Jira and Cucumber

## Installation

Using npm:
```
npm install --save @smartbear/react-gherkin-editor
```

Using yarn:
```
yarn add @smartbear/react-gherkin-editor
```

## Basic Usage

```javascript
import React from 'react'
import { render } from 'react-dom'
import ReactGherkinEditor from '@smartbear/react-gherkin-editor'

const root = document.createElement('div')
document.body.appendChild(root)

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
  'message "message" should be displayed'
]

const onValueChange = console.log

const autoCompleteFunction = async (_keyword, text) => {
  const matches = steps.filter(step => step.startsWith(text))

  const completions = matches.map(match => ({
    caption: match,
    value: match,
    score: Math.floor(Math.random() * Math.floor(100)),
    meta: 'Step'
  }))

  return completions
}

render(
  <ReactGherkinEditor
    initialValue={initialValue}
    onValueChange={onValueChange}
    autoCompleteFunction={autoCompleteFunction}
    language='en'
    theme='cucumber'
  />,
  root
)
```

## Ace Documentation
[React Ace Editor](https://github.com/securingsincity/react-ace)

[version-badge]: https://img.shields.io/npm/v/@smartbear/react-gherkin-editor.svg
[package]: https://www.npmjs.com/package/@smartbear/react-gherkin-editor
[license-badge]: https://img.shields.io/npm/l/@smartbear/react-gherkin-editor.svg
[license]: https://github.com/SmartBear/react-gherkin-editor/blob/master/LICENSE
