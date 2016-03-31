import React from 'react'
import makeStore from 'store/store'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from 'containers/App'
import AuthCollectionContainer from 'containers/AuthCollectionContainer'
import AuthViewContainer from 'containers/AuthViewContainer'
import GalleryContainer from 'containers/GalleryContainer'
import MeContainer from 'containers/MeContainer'
import PlaylistContainer from 'containers/PlaylistContainer'
import RoutingContainer from 'containers/RoutingContainer'
import TrackContainer from 'containers/TrackContainer'
import UserContactsContainer from 'containers/UserContactsContainer'
import UserContainer from 'containers/UserContainer'
import UserDescriptionContainer from 'containers/UserDescriptionContainer'
import UserMediaContainer from 'containers/UserMediaContainer'

import End from 'components/End'

export const store = makeStore()

const history = syncHistoryWithStore(
  browserHistory,
  store, {
    selectLocationState: state => state.router
  }
)

history.listen(location => {
  const { action } = location
  const state = location.state || {}

  setTimeout(() => {
    if ((
      action === 'POP' ||
      state.isModal ||
      state.isReturnPath
    )) {
      return
    }

    window.scrollTo(0, 0)
  })
})

export const routes = (
  <Router history={ history }>
    <Route component={ App } path="/">
      <IndexRoute component={ RoutingContainer } />

      <Route component={ GalleryContainer } path="#genre" />
      <Route component={ GalleryContainer } path="#search" />
      <Route component={ GalleryContainer } path="#tag" />
      <Route component={ TrackContainer } path="#track/:id" />
      <Route component={ PlaylistContainer } path="#playlist/:id" />
      <Route component={ MeContainer } path="#me" />

      <Route component={ AuthViewContainer } path="#me/collection">
        <IndexRoute component={ AuthCollectionContainer } />
        <Route component={ End } path="tracks" />
        <Route component={ End } path="playlists" />
        <Route component={ End } path="followings" />
      </Route>

      <Route component={ UserContainer } path="#user/:id">
        <IndexRoute component={ UserDescriptionContainer } />
        <Route component={ UserMediaContainer } path="tracks" />
        <Route component={ UserMediaContainer } path="favorites" />
        <Route component={ UserMediaContainer } path="playlists" />
        <Route component={ UserContactsContainer} path="followers" />
        <Route component={ UserContactsContainer} path="followings" />
      </Route>
    </Route>

  </Router>
)
