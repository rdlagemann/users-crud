import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  DialogActions,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core'
import { userShape, userPropTypes } from '../../../utils/user'

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1)
  },
  cancelButton: {
    color: theme.palette.secondary.dark
  }
}))

Edit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: PropTypes.string }),
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape(userPropTypes()),
  isFetching: PropTypes.bool,
  title: PropTypes.string
}

Edit.defaultProps = {
  user: userShape(),
  isFetching: false,
  title: '',
  error: null
}

export default function Edit({ isOpen, title, close, user, isFetching, error, onSubmit }) {
  const [currentUser, setCurrentUser] = useState(user || userShape())
  const handleChange = ({ target: { name, value } }) => {
    setCurrentUser({
      ...currentUser,
      [name]: value
    })
  }

  const { nome, sobrenome, email, tipoUsuario, senha, ativo } = currentUser

  const classes = useStyles()

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <form
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          onSubmit(currentUser)
        }}
      >
        <DialogContent>
          <div>
            {isFetching && <Typography>Aguarde...</Typography>}
            {error && <Typography style={{ color: 'red' }}> {error.message} </Typography>}
          </div>

          <FormControl disabled={isFetching}>
            <FormGroup row>
              <FormControlLabel
                label="Usuário Ativo"
                control={
                  <Switch
                    id="ativo"
                    type="checkbox"
                    name="ativo"
                    checked={ativo}
                    color="primary"
                    onChange={({ target }) =>
                      setCurrentUser({ ...currentUser, ativo: target.checked })
                    }
                  />
                }
              />
            </FormGroup>

            <FormGroup>
              <FormLabel component="legend"> Tipo de Usuário </FormLabel>
              <RadioGroup name="tipoUsuario" value={tipoUsuario} onChange={handleChange}>
                <FormControlLabel
                  value="Administrador"
                  control={<Radio color="primary" />}
                  label="Administrador"
                  required
                />
                <FormControlLabel
                  value="Usuário padrão"
                  control={<Radio color="primary" />}
                  label="Usuário padrão"
                  required
                />
              </RadioGroup>
            </FormGroup>

            <FormGroup row>
              <TextField
                className={classes.textField}
                fullWidth
                label="Nome"
                name="nome"
                type="text"
                value={nome}
                onChange={handleChange}
                required
                minLength="3"
              />

              <TextField
                className={classes.textField}
                fullWidth
                label="Sobrenome"
                name="sobrenome"
                type="text"
                value={sobrenome}
                onChange={handleChange}
                required
                minLength="3"
              />

              <TextField
                className={classes.textField}
                fullWidth
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
              />

              <TextField
                className={classes.textField}
                fullWidth
                label="senha"
                name="senha"
                type="password"
                value={senha}
                onChange={handleChange}
                minLength="6"
                maxLength="6"
                required
              />
            </FormGroup>

            <DialogActions>
              <Button className={classes.cancelButton} type="button" onClick={close}>
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Salvar
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </form>
    </Dialog>
  )
}
