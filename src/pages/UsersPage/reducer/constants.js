import createReducerKey from '../../../utils/createReducerKey'

const reducerKey = 'pages/UsersPage'
const createKey = createReducerKey(reducerKey)

export const actionTypes = {
  REQUEST: createKey('REQUEST'),
  REQUEST_SUCCESS: createKey('REQUEST_SUCCESS'),
  REQUEST_ERROR: createKey('REQUEST_ERROR'),
  UPDATE_USERS_FILTERED: createKey('UPDATE_USERS_FILTERED'),
  UPDATE_FILTER_TERM: createKey('UPDATE_FILTER_TERM'),
  UPDATE_STATUS_MESSAGE: createKey('UPDATE_STATUS_MESSAGE')
}

export const repos = {
  LIST: createKey('list'),
  EDIT: createKey('edit'),
  REMOVE: createKey('REMOVE')
}
