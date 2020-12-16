import React from 'react'
import { mount } from 'enzyme'
import GherkinEditor from '.'
import AceEditor from 'react-ace'
import Toolbar from './Toolbar'

describe('<GherkinEditor />', () => {
  it('renders <AceEditor />', () => {
    const wrapper = mount(<GherkinEditor />)
    expect(wrapper.find(AceEditor)).toBeTruthy()
  })

  it('renders the toolbar by default', () => {
    const wrapper = mount(<GherkinEditor />)
    expect(wrapper.find(Toolbar)).toBeTruthy()
  })

  it('does not renders the toolbar when hideToolbar props is set', () => {
    const wrapper = mount(<GherkinEditor hideToolbar />)
    expect(wrapper.find(Toolbar).length).toEqual(0)
  })
})
