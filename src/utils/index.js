import compose from 'ramda/src/compose'

/**
 * Creates a fake input event
 * @param value The value to fake
 * @returns Object in the format { target: { value }}
 */
export const mockInputEvent = value => ({
  target: { value }
})

export const noSpecialChars = str => str.replace(/[^\w\s]/gi, '')
const easyRegExp = term => new RegExp('.*'.concat(term.split('').join('.*')), 'i')
export const safeEasyRegExp = compose(
  easyRegExp,
  noSpecialChars
)

export const maybeCallback = fn => (fn && typeof fn === 'function' ? fn() : null)
