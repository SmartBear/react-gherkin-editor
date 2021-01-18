const setSession = jest.fn()
const setLanguage = jest.fn()
const setMode = jest.fn()
const annotate = jest.fn()

const GherkinAnnotator = jest.fn().mockImplementation(() => {
  return {
    setSession,
    setLanguage,
    setMode,
    annotate
  }
})

export default GherkinAnnotator

export {
  setSession,
  setLanguage,
  setMode,
  annotate
}
