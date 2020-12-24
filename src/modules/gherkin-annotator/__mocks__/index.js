const setLanguage = jest.fn()
const setMode = jest.fn()
const annotate = jest.fn()

const GherkinAnnotator = jest.fn().mockImplementation(() => {
  return {
    setLanguage,
    setMode,
    annotate
  }
})

export default GherkinAnnotator

export {
  setLanguage,
  setMode,
  annotate
}
