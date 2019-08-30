import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { Grid } from '@material-ui/core'
import Login from '../../components/Login/Login'
import { USERS } from '../routes'
import withAuth from '../../components/withAuth/withAuth'

HomePage.propTypes = { isAuthenticated: PropTypes.bool.isRequired }

function HomePage({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to={USERS} />
  }

  return (
    <Grid container justify="center">
      <Login />
    </Grid>
  )
}

export default withAuth(HomePage)
