import React from 'react'
import { shallow, mount } from 'enzyme'
import Toolbar from './index'
import Select from '@atlaskit/select'

describe('<Toolbar />', () => {
  it('renders <Select />', () => {
    const wrapper = shallow(<Toolbar defaultLanguage='en' />)
    expect(wrapper.find(Select)).toBeTruthy()
  })

  it('changes the language mode', () => {
    const setModeLanguage = jest.fn()

    const wrapper = mount(
      <Toolbar
        defaultLanguage='en'
        setModeLanguage={setModeLanguage}
        onLanguageChange={() => {}}
      />
    )

    const select = wrapper.find('Select')

    select.instance().selectOption({ label: 'français', value: 'fr' })

    expect(setModeLanguage).toHaveBeenCalledWith('fr')
  })

  it('runs the callback when language is changed', () => {
    const onLanguageChangeMock = jest.fn()

    const wrapper = mount(
      <Toolbar
        defaultLanguage='en'
        setModeLanguage={() => {}}
        onLanguageChange={onLanguageChangeMock}
      />
    )

    const select = wrapper.find('Select')

    select.instance().selectOption({ label: 'français', value: 'fr' })

    expect(onLanguageChangeMock).toHaveBeenCalledWith({
      label: 'français',
      value: 'fr'
    })
  })

  it('handles internal state for language', () => {
    const setModeLanguage = jest.fn()

    const wrapper = mount(
      <Toolbar
        defaultLanguage='en'
        setModeLanguage={setModeLanguage}
        onLanguageChange={() => {}}
      />
    )

    wrapper.setProps({ ...wrapper.props(), defaultLanguage: 'fr' })

    expect(setModeLanguage).toHaveBeenCalledWith('fr')
  })
})
