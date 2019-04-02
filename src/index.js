/* istanbul ignore file */
/* eslint-disable import/no-extraneous-dependencies */
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
    name: match,
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
  />,
  root
)
