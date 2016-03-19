import React from 'react'
import makeStore from 'store/store'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from 'containers/App'
import MeContainer from 'containers/MeContainer'
import CollectionContainer from 'containers/CollectionContainer'
import PlaylistContainer from 'containers/PlaylistContainer'
import RoutingContainer from 'containers/RoutingContainer'
import TrackContainer from 'containers/TrackContainer'
import UserContainer from 'containers/UserContainer'
import UserDescriptionContainer from 'containers/UserDescriptionContainer'
import UserMediaContainer from 'containers/UserMediaContainer'
import AuthCollectionContainer from 'containers/AuthCollectionContainer'

import End from 'components/End'

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
      <Route component={ MeContainer } path="#me" />

      <Route component={ AuthCollectionContainer } path="#me/collection">
        <IndexRoute component={ End } />
        <Route component={ End } path="tracks" />
        <Route component={ End } path="favorites" />
        <Route component={ End } path="playlists" />
      </Route>

      <Route component={ UserContainer } path="#user/:id">
        <IndexRoute component={ UserDescriptionContainer } />
        <Route component={ UserMediaContainer } path="tracks" />
        <Route component={ UserMediaContainer } path="favorites" />
        <Route component={ UserMediaContainer } path="playlists" />
      </Route>
    </Route>

  </Router>
)
