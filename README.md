# react-gherkin-editor

This is a wrapper arround [React Ace Editor](https://github.com/securingsincity/react-ace) specially designed for Gherkin.

- It includes a special theme for Jira based on ace textmate theme.


## Features

- Gherkin syntax highlighting
- Gherkin keywords snippets
- Easy to provide step autocompletions (Promise based)

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
import React, { Component } from 'react'
import GherkinEditor from 'react-gherkin-editor'

class App extends Component {
  render() {
    return <GherkinEditor onValueChange={() => {}} />
  }
}

export default App
```

## Documentation

TODO

## Ace Documentation
[React Ace Editor](https://github.com/securingsincity/react-ace)

