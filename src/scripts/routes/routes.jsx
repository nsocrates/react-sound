import App from 'containers/App'
import GalleryContainer from 'containers/GalleryContainer'
import UserContainer from 'containers/UserContainer'
import End from 'components/End'
import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

const routes = (
  <Router history={ browserHistory }>
    <Route
      component={ App }
      path="/"
    >
      <IndexRoute component={ End }/>
      <Route
        component={ GalleryContainer }
        path="#genre"
      />
      <Route
        component={ UserContainer }
        path="#user"
      />
      <Route
        component={ GalleryContainer }
        path="#search"
      />
    </Route>
  </Router>
)

export default routes
