import App from 'containers/App'
import MainContainer from 'containers/MainContainer'
import React from 'react'
import { Router, Route, browserHistory/*, IndexRoute*/ } from 'react-router'

const routes = (
  <Router history={ browserHistory }>
    <Route
      component={ App }
      path="/"
    >
      {/*  <IndexRoute component={ MainContainer }/>  */}
      <Route
        component={ MainContainer }
        path="#genre"
      />
      <Route
        component={ MainContainer }
        path="#search"
      />
    </Route>
  </Router>
)

export default routes
