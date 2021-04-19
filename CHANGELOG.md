# Changelog

## [Unreleased]

## [2.4.11]

- Upgrade dependencies

## [2.4.10]

- Setup a new package release process that will also release on GitHub Packages

## [2.4.9]

Build package using `tsc` instead of `babel`.
Also use ts-jest to run tests.

## [2.4.8]

## [2.4.7]

Add `onParse` property that exposes a callback used to rely on the internal Gherkin parser runs.

## [2.4.3]

Remove window from codebase.

## [2.4.2]

Update readme.

## [2.4.1]

Reduce the maximum width of Gherkin linter annotations.

## [2.4.0]

- Change the package structure from a single file generated using webpack to a `lib` folder generated using babel.
- Upgrade dependencies

## [2.3.2]

Fix linter was not triggered properly sometimes when the component was rerendered

## [2.3.1]

Fix linting was not triggered when changing mode or locale

## [2.3.0]

Add linting capabilities

## [2.2.2]

+ Update README informations
+ Fix semi-column keyword highlighting using the 'gherkin_background_i18n' mode
+ Rename 'c4j' theme by 'cucumber'

## [2.2.1]

- Remove altaskit dependencies
- Prevent overloading ace options
- Improve codebase

## [2.2.0]

- Add support for Gherkin Background/Scenario only highlighting
    - Add a `mode` props to customize the highlighting mode
- GherkinEditor improvements

## [2.1.0]

- Security fix
- Dropped react v15 support.

## [2.0.7]

Fix loading of the gherkin_i18n mode

## [2.0.6]

- Upgrade react-ace dependency
- Migrate code to use the new react-ace version
- Create a new C4J theme

## [2.0.5]

- Allow to hide language toolbar with 'hideToolbar' props
- We can pass a callback 'onSubmit' to the editor which is triggered when pressing Ctrl+Enter in the editor

## [2.0.4]

- Fix language selector when the language prop is changed from the GherkinEditor component
- Disable language selector when readOnly prop is set

## [2.0.3]

Editor can be resized horizontally

## [2.0.2]

Fix indentation in I18n context

## [2.0.1]

Breaking changes:
 - OnValueChange => onChange

Features:
 - Added I18n for gherkin syntax & keyword autocompletions

## [0.1.0]

Initial release
