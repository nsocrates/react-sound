import 'stylesheets/main.scss'
import 'isomorphic-fetch'
import ES6Promise from 'es6-promise';
import React from 'react'
import ReactDOM from 'react-dom'
import constructRoutes from 'routes/routes'
import makeStore from 'store/store'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

ES6Promise.polyfill()

const initialState = window.__INITIAL_STATE__

// Pass state from server onto store
const store = makeStore(initialState, browserHistory)
const routes = constructRoutes(store)

const history = syncHistoryWithStore(
  browserHistory,
  store, {
    selectLocationState: state => state.router
  })

history.listen(location => {
  const { action } = location
  const state = location.state || {}

  setTimeout(() => {
    if ((action === 'POP'
      || state.isModal
      || state.isReturnPath)) {
      return
    }

    window.scrollTo(0, 0)
  })
})

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
)
