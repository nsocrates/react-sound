import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { loadTag } from 'actions/tag'
import {
  loadUserTracks,
  loadUserFavorites,
  loadUserPlaylists
} from 'actions/user'
import {
  loadFollowingCollection,
  loadTrackCollection,
  loadPlaylistCollection
} from 'actions/collection'

export function loadGallery(locals, force = false) {
  const { pathname, query } = locals
  return dispatch => {
    switch (pathname) {
      case '/genre':
        return dispatch(loadGenre(query.q, force))
      case '/search':
        return dispatch(loadSearch(query.q, force))
      case '/tag':
        return dispatch(loadTag(query.q, force))
      default:
        throw new Error(`Invalid pathname: ${pathname}`)
    }
  }
}

export function loadUserMedia(locals, force = false) {
  const { pathname, params } = locals
  const s = pathname.split('/')
  const route = s[s.length - 1]
  return dispatch => {
    switch (route) {
      case 'tracks':
        return dispatch(loadUserTracks(params.id, force))
      case 'playlists':
        return dispatch(loadUserPlaylists(params.id, force))
      case 'favorites':
        return dispatch(loadUserFavorites(params.id, force))
      default:
        throw new Error(`Invalid route: ${route}`)
    }
  }
}

export function loadCollection(locals, force = false) {
  const { pathname } = locals
  const s = pathname.split('/')
  const route = s[s.length - 1]
  return dispatch => {
    switch (pathname) {
      case '/me/collection': {
        const actions = [
          loadTrackCollection,
          loadPlaylistCollection,
          loadFollowingCollection
        ]
        return actions.map(action => dispatch(action(force)))
      }
      case '/me/tracks':
        return dispatch(loadTrackCollection(force))
      case '/me/playlists':
        return dispatch(loadPlaylistCollection(force))
      case '/me/followings':
        return dispatch(loadFollowingCollection(force))
      default:
        throw new Error(`Invalid route: ${route}`)
    }
  }
}
