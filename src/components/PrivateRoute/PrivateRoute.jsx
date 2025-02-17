import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import withAuth from '../withAuth/withAuth'

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.objectOf(withAuth)])
    .isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}

export default withAuth(PrivateRoute)
