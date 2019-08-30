import React from 'react'
import { render } from 'react-dom'
import configureStore from './configureStore'
import * as serviceWorker from './serviceWorker'
import Root from './pages'
import history from './utils/history'

const store = configureStore(history)

render(<Root store={store} />, document.getElementById('root'))

serviceWorker.unregister()
