import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { login, logout, checkAuth } from './reducer'

export const mapStateToProps = state => ({
  ...state.auth
})

export const mapDispatchToProps = dispatch => ({
  login: compose(
    dispatch,
    login
  ),
  logout: compose(
    dispatch,
    logout
  ),
  testAuth: compose(
    dispatch,
    checkAuth
  )
})

/**
 * Gives the WrappedComponent access to authorization
 * state and utility functions
 * @param {*} WrappedComponent
 */
export const WithAuthComponent = WrappedComponent => {
  AuthWrapped.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.shape({ message: PropTypes.string }),
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    testAuth: PropTypes.func.isRequired
  }

  AuthWrapped.defaultProps = {
    error: null
  }

  function AuthWrapped({ testAuth, ...props }) {
    // on mount, verifies if user stills authenticated
    useEffect(() => {
      testAuth()
    }, [testAuth])

    return <WrappedComponent {...props} />
  }

  return AuthWrapped
}

export default WrapperComponent =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithAuthComponent(WrapperComponent))
