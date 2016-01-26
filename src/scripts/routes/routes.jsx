import App from 'containers/App'
import MainContainer from 'containers/MainContainer'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

export const routes = (
  <Router history={ browserHistory }>
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
