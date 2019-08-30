import PropTypes from 'prop-types'
/**
 * Exports object with helper functions that represents
 * remote data states
 */

const remoteDataShape = () => ({
  data: null,
  isFetching: false,
  error: null
})

export const remoteDataPropTypes = () => ({
  data: PropTypes.any,
  isFetching: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string
  })
})

const remoteReceive = data => ({ data, isFetching: false, error: null })
const remoteReceiveError = error => ({ data: null, isFetching: false, error })
const remoteRequest = () => ({ data: null, isFetching: true, error: null })

const remoteData = {
  get: remoteDataShape,
  request: remoteRequest,
  receive: remoteReceive,
  receiveError: remoteReceiveError
}

export default remoteData
