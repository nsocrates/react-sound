import 'stylesheets'
import React from 'react'
import ReactDOM from 'react-dom'
import makeStore from 'store/store'
import { Provider } from 'react-redux'
import { routes } from 'routes/routes'

export const store = makeStore()

ReactDOM.render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('app')
)
