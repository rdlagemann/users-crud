import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from './utils/history'
import authReducer from './components/withAuth/reducer'
import usersPageReducer from './pages/UsersPage/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  usersPage: usersPageReducer,
  router: connectRouter(history)
})

export default rootReducer
