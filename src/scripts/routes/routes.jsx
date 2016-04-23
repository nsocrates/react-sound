import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'containers/App'
import AuthCollectionContainer from 'containers/AuthCollectionContainer'
import GalleryContainer from 'containers/GalleryContainer'
import PlaylistContainer from 'containers/PlaylistContainer'
import StreamContainer from 'containers/StreamContainer'
import TrackContainer from 'containers/TrackContainer'
import UserContactsContainer from 'containers/UserContactsContainer'
import UserContainer from 'containers/UserContainer'
import UserDescriptionContainer from 'containers/UserDescriptionContainer'
import UserMediaContainer from 'containers/UserMediaContainer'
import MeContainer from 'containers/MeContainer'

export default function constructRoutes(store) { // eslint-disable-line no-unused-vars
  const handleHomePath = (nextState, replace, callback) => {
    if (nextState.location.pathname === '/') {
      replace({
        pathname: '/genre',
        query: {
          q: 'Trance'
        },
        state: { nextPathname: nextState.location.pathname }
      })
    }

    callback()
  }

  return (
    <Route component={ App } path="/" onEnter={ handleHomePath }>
      <Route component={ GalleryContainer } path="genre" />
      <Route component={ GalleryContainer } path="search" />
      <Route component={ GalleryContainer } path="tag" />
      <Route component={ TrackContainer } path="track/:id" />
      <Route component={ PlaylistContainer } path="playlist/:id" />

      <Route component={ MeContainer } path="me">
        <Route component={ StreamContainer } path="stream" />
        <Route component={ AuthCollectionContainer } path="collection" />
        <Route component={ AuthCollectionContainer } path="tracks" />
        <Route component={ AuthCollectionContainer } path="playlists" />
        <Route component={ AuthCollectionContainer } path="followings" />
      </Route>

      <Route component={ UserContainer } path="user/:id">
        <IndexRoute component={ UserDescriptionContainer } />
        <Route component={ UserMediaContainer } path="tracks" />
        <Route component={ UserMediaContainer } path="favorites" />
        <Route component={ UserMediaContainer } path="playlists" />
        <Route component={ UserContactsContainer} path="followers" />
        <Route component={ UserContactsContainer} path="followings" />
      </Route>
    </Route>
  )
}
