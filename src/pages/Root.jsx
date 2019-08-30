import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import UsersPage from './UsersPage/UsersPage'
import history from '../utils/history'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import { USERS, HOME } from './routes'
import theme from '../theme/theme'

const Root = ({ store }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Route path={HOME} exact component={HomePage} />
        <PrivateRoute path={USERS} exact component={UsersPage} />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
