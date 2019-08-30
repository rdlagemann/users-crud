import curry from 'ramda/src/curry'

const createReducerKey = curry((reducerKey, str) => `${reducerKey}/${str}`)

export default createReducerKey
