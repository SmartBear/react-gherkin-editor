import React from 'react'
import { shallow, mount } from 'enzyme'
import GherkinEditor from './index'
import AceEditor from 'react-ace'

describe('<GherkinEditor />', () => {
  it('renders <AceEditor />', () => {
    const wrapper = shallow(<GherkinEditor onValueChange={() => {}} />)
    expect(wrapper.find(AceEditor)).toBeDefined()
  })

  it('triggers onValueChange when content is updated', async () => {
    const onValueChangeMock = jest.fn()
    const wrapper = mount(<GherkinEditor onValueChange={onValueChangeMock} />)
    const { ace } = wrapper.instance()
    ace.session.setValue('Feature: User signup')
    expect(onValueChangeMock).toHaveBeenCalledWith('Feature: User signup')
  })
})
