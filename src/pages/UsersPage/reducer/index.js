import remoteData from '../../../utils/remoteData'
import { safeEasyRegExp, maybeCallback } from '../../../utils'
import { repos, actionTypes } from './constants'
import { selectUsersListData, selectUsersPage } from './selectors'
import { fullName } from '../../../utils/user'

const STATUS_MESSAGE_TIME = 3000

const initialState = {
  [repos.LIST]: remoteData.get(),
  [repos.EDIT]: remoteData.get(),
  [repos.REMOVE]: remoteData.get(),
  usersFiltered: [],
  filterTerm: '',
  statusMessage: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST: {
      return {
        ...state,
        [action.repo]: remoteData.request()
      }
    }
    case actionTypes.REQUEST_SUCCESS: {
      return {
        ...state,
        [action.repo]: remoteData.receive(action.payload)
      }
    }
    case actionTypes.REQUEST_ERROR: {
      return {
        ...state,
        [action.repo]: remoteData.receiveError(action.payload)
      }
    }

    case actionTypes.UPDATE_USERS_FILTERED: {
      return {
        ...state,
        usersFiltered: [...action.payload]
      }
    }

    case actionTypes.UPDATE_FILTER_TERM: {
      return {
        ...state,
        filterTerm: action.payload
      }
    }

    case actionTypes.UPDATE_STATUS_MESSAGE: {
      return {
        ...state,
        statusMessage: action.payload
      }
    }

    default:
      return state
  }
}

const request = repo => ({
  type: actionTypes.REQUEST,
  repo
})

const requestSuccess = (repo, data) => ({
  type: actionTypes.REQUEST_SUCCESS,
  repo,
  payload: data
})

const requestError = (repo, error) => ({
  type: actionTypes.REQUEST_SUCCESS,
  repo,
  payload: error
})

const updateUsersFiltered = users => ({
  type: actionTypes.UPDATE_USERS_FILTERED,
  payload: users
})

const updateFilterTerm = term => ({
  type: actionTypes.UPDATE_FILTER_TERM,
  payload: term
})

const setStatusMessage = message => ({
  type: actionTypes.UPDATE_STATUS_MESSAGE,
  payload: message
})

export const updateStatusMessage = message => dispatch => {
  dispatch(setStatusMessage(message))
  setTimeout(() => {
    dispatch(setStatusMessage(''))
  }, STATUS_MESSAGE_TIME)
}

export const filterUsers = () => (dispatch, getState) => {
  const { filterTerm } = selectUsersPage(getState())
  let usersFiltered = selectUsersListData(getState())
  if (filterTerm) {
    usersFiltered = usersFiltered.filter(user => safeEasyRegExp(filterTerm).test(fullName(user)))
  }
  dispatch(updateUsersFiltered(usersFiltered))
}

export const onChangeFilterTerm = term => dispatch => {
  dispatch(updateFilterTerm(term))
  dispatch(filterUsers())
}

export const requestUsers = () => (dispatch, _, api) => {
  const repo = repos.LIST
  dispatch(request(repo))
  api.users
    .get()
    .then(res => {
      dispatch(requestSuccess(repo, res.data))
      dispatch(filterUsers())
    })
    .catch(err => dispatch(requestError(repo, err)))
}

export const removeUser = userData => (dispatch, _, api) => {
  const repo = repos.REMOVE
  dispatch(request(repo))
  api.users
    .delete(`/${userData.id}`)
    .then(res => {
      dispatch(requestSuccess(repo, res.data))
      dispatch(requestUsers())
      dispatch(updateStatusMessage('Usuário removido!'))
    })
    .catch(err => dispatch(requestError(repo, err)))
}

export const saveEditUser = (userData, onSuccess) => (dispatch, _, api) => {
  const repo = repos.EDIT
  dispatch(request(repo))
  api.users
    .put(`/${userData.id}`, userData)
    .then(res => {
      dispatch(requestSuccess(repo, res.data))
      dispatch(requestUsers())
      maybeCallback(onSuccess)
      dispatch(updateStatusMessage('Alterações realizadas com sucesso.'))
    })
    .catch(err => dispatch(requestError(repo, err)))
}

export const saveCreateUser = (userData, onSuccess) => (dispatch, _, api) => {
  const repo = repos.EDIT
  dispatch(request(repo))
  api.users
    .post('/', userData)
    .then(res => {
      dispatch(requestSuccess(repo, res.data))
      dispatch(requestUsers())
      maybeCallback(onSuccess)
      dispatch(updateStatusMessage('Usuário criado com sucesso!'))
    })
    .catch(err => dispatch(requestError(repo, err)))
}
