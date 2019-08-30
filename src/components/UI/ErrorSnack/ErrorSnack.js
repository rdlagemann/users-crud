import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

ErrorSnack.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }),
  wrapperProps: PropTypes.object
}

ErrorSnack.defaultProps = {
  error: null,
  wrapperProps: {}
}

export default function ErrorSnack({ error, wrapperProps }) {
  if (!error) return null
  return (
    <Typography align="center" {...wrapperProps}>
      {error.message}
    </Typography>
  )
}
