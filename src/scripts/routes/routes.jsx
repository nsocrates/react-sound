import React from 'react'
import makeStore from 'store/store'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from 'containers/App'
import CollectionContainer from 'containers/CollectionContainer'
import RoutingContainer from 'containers/RoutingContainer'
import PlaylistContainer from 'containers/PlaylistContainer'
import TrackContainer from 'containers/TrackContainer'
import UserContainer from 'containers/UserContainer'
import UserDescriptionContainer from 'containers/UserDescriptionContainer'
import UserMediaContainer from 'containers/UserMediaContainer'

export const store = makeStore()

const history = syncHistoryWithStore(
  browserHistory,
  store, {
    selectLocationState: state => state.router
  }
)

const updateWindow = () => window.scrollTo(0, 0)

export const routes = (
  <Router onUpdate={ updateWindow } history={ history }>
    <Route component={ App } path="/">
      <IndexRoute component={ RoutingContainer } />
      <Route component={ CollectionContainer } path="#genre" />
      <Route component={ CollectionContainer } path="#search" />
      <Route component={ CollectionContainer } path="#tag" />
      <Route component={ TrackContainer } path="#track/:id" />
      <Route component={ PlaylistContainer } path="#playlist/:id" />
      <Route component={ UserContainer } path="#user/:id">
        <IndexRoute component={ UserDescriptionContainer } />
        <Route component={ UserMediaContainer } path="tracks" />
        <Route component={ UserMediaContainer } path="favorites" />
        <Route component={ UserMediaContainer } path="playlists" />
      </Route>
    </Route>
  </Router>
)
