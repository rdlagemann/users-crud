import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, FormGroup, Button, Typography } from '@material-ui/core'
import ErrorSnack from '../UI/ErrorSnack/ErrorSnack'
import withAuth from '../withAuth/withAuth'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 6),
    margin: theme.spacing(4, 0)
  }
}))

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string })
}

LoginForm.defaultProps = {
  isFetching: false,
  error: null
}

export function LoginForm({ isFetching, error, login }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <ErrorSnack
        error={error}
        wrapperProps={{
          'data-testid': 'login-error-message'
        }}
      />
      {isFetching && (
        <Typography align="center" data-testid="login-fetching-message">
          Aguarde...
        </Typography>
      )}
      <form
        data-testid="login-form"
        onSubmit={e => {
          e.preventDefault()
          const { emailInput, passwordInput } = e.target.elements
          login(emailInput.value, passwordInput.value)
        }}
      >
        <Typography variant="h5" align="center">
          Bem-vindo
        </Typography>
        <FormGroup row>
          <TextField
            id="emailInput"
            label="Usuário"
            margin="normal"
            type="email"
            required
            inputProps={{ 'data-testid': 'login-username' }}
          />
        </FormGroup>

        <FormGroup row>
          <TextField
            id="passwordInput"
            label="Senha"
            margin="normal"
            type="password"
            required
            inputProps={{ 'data-testid': 'login-password' }}
          />
        </FormGroup>
        <FormGroup row>
          <Button
            style={{ margin: '30px 0' }}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            data-testid="login-submit-button"
          >
            Entrar
          </Button>
        </FormGroup>
      </form>
    </Paper>
  )
}
export default withAuth(LoginForm)
