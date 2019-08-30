import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import api from './api'

export default function configureStore(history) {
  let composeEnhancers = compose

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  }

  const middlewares = [thunk.withExtraArgument(api), routerMiddleware(history)]
  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(rootReducer, composeEnhancers(...enhancers))

  return store
}
