import { push } from 'connected-react-router'
import { saveAuth, removeAuth, isAuth, getUserData } from '../../utils/auth'
import { USERS } from '../../pages/routes'
import createReducerKey from '../../utils/createReducerKey'
import { isAdmin } from '../../utils/user'

const reducerKey = 'components/withAuth'
const createKey = createReducerKey(reducerKey)

export const actionTypes = {
  LOGIN_REQUEST: createKey('LOGIN_REQUEST'),
  LOGIN_SUCCESS: createKey('LOGIN_SUCCESS'),
  LOGIN_ERROR: createKey('LOGIN_ERROR'),
  LOGOUT: createKey('LOGOUT')
}

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  isFetching: false,
  error: null,
  user: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: true,
        error: null
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: isAdmin(action.payload),
        user: action.payload,
        isFetching: false,
        error: null
      }
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: action.payload
      }
    case actionTypes.LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST
})

const loginError = err => ({
  type: actionTypes.LOGIN_ERROR,
  payload: err
})

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user
})

export function checkAuth() {
  return dispatch => {
    if (isAuth()) {
      const user = getUserData()
      if (user) {
        return dispatch(loginSuccess(user))
      }
    }

    return dispatch(loginError())
  }
}

export function logout() {
  return dispatch => {
    removeAuth()
    dispatch({ type: actionTypes.LOGOUT })
  }
}

export function login(email, password) {
  return (dispatch, _, api) => {
    dispatch(loginRequest())
    api.users
      .get('', { params: { email } })
      .then(res => {
        const { data } = res
        const userInfo = data[0]

        if (!userInfo) {
          return dispatch(loginError({ message: 'Usuário não existe.' }))
        }

        if (userInfo.senha !== password) {
          return dispatch(loginError({ message: 'Senha incorreta.' }))
        }

        if (!userInfo.ativo) {
          return dispatch(loginError({ message: 'Usuário não está mais ativo.' }))
        }

        dispatch(loginSuccess(userInfo))
        saveAuth(userInfo)
        return dispatch(push(USERS))
      })
      .catch(err => {
        dispatch(loginError(err))
      })
  }
}
