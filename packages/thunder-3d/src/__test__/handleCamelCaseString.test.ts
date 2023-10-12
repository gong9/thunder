import { handleCamelCaseString } from '../utils'

describe('handleCamelCaseString', () => {
  it('base', () => {
    expect(handleCamelCaseString('fontSize')).toBe('font-size')
  })

  it('base-two', () => {
    expect(handleCamelCaseString('fontSizeDemo')).toBe('font-size-demo')
  })

  it('test empty', () => {
    expect(handleCamelCaseString('')).toBe('')
  })

  it('test demo', () => {
    expect(handleCamelCaseString('demo')).toBe('demo')
  })

  it('test ABCD', () => {
    expect(handleCamelCaseString('ABCD')).toBe('a-b-c-d')
  })

  it('test ABCd', () => {
    expect(handleCamelCaseString('ABCd')).toBe('a-b-cd')
  })
})