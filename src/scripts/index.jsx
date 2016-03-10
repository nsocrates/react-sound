import 'stylesheets'
import React from 'react'
import ReactDOM from 'react-dom'
import { routes, store } from 'routes/routes'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('app')
)
