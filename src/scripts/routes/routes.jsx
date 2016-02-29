import App from 'containers/App'
import CollectionContainer from 'containers/CollectionContainer'
import End from 'components/End'
import React from 'react'
import UserContainer from 'containers/UserContainer'
import UserDescriptionContainer from 'containers/UserDescriptionContainer'
import UserMediaContainer from 'containers/UserMediaContainer'
import TrackContainer from 'containers/TrackContainer'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

const routes = (
  <Router history={ browserHistory }>
    <Route component={ App } path="/">
      <IndexRoute component={ End } />
      <Route component={ CollectionContainer } path="#genre" />
      <Route component={ CollectionContainer } path="#search" />
      <Route component={ CollectionContainer } path="#tag" />
      <Route component={ TrackContainer } path="#track/:id" />
      <Route component={ UserContainer } path="#user/:id">
        <IndexRoute component={ UserDescriptionContainer }/>
        <Route component={ UserMediaContainer } path="tracks" />
        <Route component={ UserMediaContainer } path="favorites" />
        <Route component={ UserMediaContainer } path="playlists" />
      </Route>
    </Route>
  </Router>
)

export default routes
