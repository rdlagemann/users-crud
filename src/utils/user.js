import PropTypes from 'prop-types'
import prop from 'ramda/src/prop'
import compose from 'ramda/src/compose'
import equals from 'ramda/src/equals'
import either from 'ramda/src/either'
import concat from 'ramda/src/concat'

export const userShape = () => ({
  nome: '',
  sobrenome: '',
  tipoUsuario: 'Usuário padrão',
  email: '',
  senha: '',
  ativo: false
})

export const userPropTypes = () => ({
  nome: PropTypes.string,
  sobrenome: PropTypes.string,
  email: PropTypes.string,
  tipoUsuario: PropTypes.string,
  senha: PropTypes.string,
  ativo: PropTypes.bool
})

export const isAdmin = compose(
  equals('Administrador'),
  prop('tipoUsuario')
)

export const firstName = either(prop('nome'), () => 'SEM NOME')
export const lastName = either(prop('sobrenome'), () => 'SEM SOBRENOME')
export const fullName = user => concat(firstName(user), lastName(user))
