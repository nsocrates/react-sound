import App from './containers/App'
import MainContainer from './containers/MainContainer'
import React from 'react'
import { createHistory } from 'history'
import { Router, Route } from 'react-router'

const history = createHistory()

export const routes = (
  <Router history={ history }>
    <Route
      component={ App }
      path="/"
    >
      <Route
        component={ MainContainer }
        path="/genre/:genre"
      />
    </Route>
  </Router>
)
