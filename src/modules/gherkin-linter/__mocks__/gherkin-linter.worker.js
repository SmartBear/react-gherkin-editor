export const mockPostMessage = jest.fn()
const mock = jest.fn().mockImplementation(() => {
  return { postMessage: mockPostMessage }
})

export default mock
