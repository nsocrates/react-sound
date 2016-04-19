import * as ActionTypes from 'constants/ActionTypes'
import { AuthTypes } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { notif } from 'actions/notification'
import { get, putOrDelete } from 'actions/call'

function syncTracks() {
  const endpoint = '/e1/me/track_likes/ids'
  const types = [
    ActionTypes.MY_TRACKS_REQUEST,
    ActionTypes.SYNC_TRACKS,
    ActionTypes.MY_TRACKS_FAILURE
  ]
  return dispatch => dispatch(get(endpoint, types, { limit: 5000 }, null))
}

function syncPlaylists() {
  const endpoint = '/e1/me/playlist_likes/ids'
  const types = [
    ActionTypes.MY_PLAYLISTS_REQUEST,
    ActionTypes.SYNC_PLAYLISTS,
    ActionTypes.MY_PLAYLISTS_FAILURE
  ]
  return dispatch => dispatch(get(endpoint, types, { limit: 5000 }, null))
}

function syncFollowings() {
  const endpoint = '/me/followings/ids'
  const types = [
    ActionTypes.MY_FOLLOWINGS_REQUEST,
    ActionTypes.SYNC_FOLLOWINGS,
    ActionTypes.MY_FOLLOWINGS_FAILURE
  ]
  return dispatch => dispatch(get(endpoint, types, { limit: 5000 }, null))
}

/**
 ***************
 * GET actions *
 ***************
 */
export function syncCollection() {
  return (dispatch) => {
    dispatch(syncTracks())
    dispatch(syncPlaylists())
    dispatch(syncFollowings())
  }
}

export function loadFollowingCollection(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      e1 = [],
      next_href = '/me/followings'
    } = getState().app.auth.likes.followings || {}

    let path = next_href

    // Force fetch even if all items are cached
    if ((
        ids.length !== e1.length &&
        next_href === null &&
        forceNext
    )) {
      path = '/me/followings'
    }

    // No more items to display; all items are cached
    if (e1.length && !forceNext || !path) {
      return null
    }

    return dispatch(get(path, AuthTypes.FOLLOWINGS, null, Schemas.USER_ARRAY))
  }
}

export function loadTrackCollection(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      e1 = [],
      next_href = '/e1/me/track_likes'
    } = getState().app.auth.likes.tracks || {}

    let path = next_href
    if ((
        ids.length !== e1.length &&
        next_href === null &&
        forceNext
    )) {
      path = '/e1/me/track_likes'
    }

    if (e1.length && !forceNext || !path) {
      return null
    }

    return dispatch(get(path, AuthTypes.TRACKS, null, Schemas.TRACK_ARRAY))
  }
}

export function loadPlaylistCollection(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      e1 = [],
      next_href = '/e1/me/playlist_likes'
    } = getState().app.auth.likes.playlists || {}

    let path = next_href
    if ((
        ids.length !== e1.length &&
        next_href === null &&
        forceNext
    )) {
      path = '/e1/me/playlist_likes'
    }

    if (e1.length && !forceNext || !path) {
      return null
    }

    return dispatch(get(path, AuthTypes.PLAYLISTS, null, Schemas.PLAYLIST_ARRAY))
      .then(() => (
          dispatch(get('/me/playlists', AuthTypes.OWN_PLAYLISTS, null, Schemas.PLAYLIST_ARRAY))))
  }
}

/**
 **************************
 * PUT and DELETE actions *
 **************************
 */
export function updateMyFollowings(_id, name) {
  return (dispatch, getState) => {
    const id = Number(_id)
    const endpoint = `/me/followings/${id}`
    const username = name ? `"${name}"` : 'user'
    const { ids } = getState().app.auth.likes.followings
    const method = ids.indexOf(id) === -1 ? 'PUT' : 'DELETE'
    const action = method === 'PUT' ? 'Following' : 'Unfollowed'

    return dispatch(putOrDelete(method, id, endpoint, AuthTypes.FOLLOWINGS)).then(
      () => dispatch(syncFollowings()).then(
        () => dispatch(notif.action(`${action} ${username}.`)),
      )
    )
  }
}

export function updateMyTracks(_id, name) {
  return (dispatch, getState) => {
    const id = Number(_id)
    const endpoint = `/me/favorites/${id}`
    const track = name ? `"${name}"` : 'track'
    const { ids } = getState().app.auth.likes.tracks
    const method = ids.indexOf(id) === -1 ? 'PUT' : 'DELETE'

    const msg = method === 'PUT'
      ? `Added ${track} to favorites`
      : `Removed ${track} from favorites`

    return dispatch(putOrDelete(method, id, endpoint, AuthTypes.TRACKS)).then(
      () => dispatch(syncTracks()).then(
        () => dispatch(notif.action(msg)),
      )
    )
  }
}

export function updateMyPlaylists(_id, name) {
  return (dispatch, getState) => {
    const id = Number(_id)
    const endpoint = `/e1/me/playlist_likes/${id}`
    const playlist = name ? `"${name}"` : 'playlist'
    const { ids } = getState().app.auth.likes.playlists
    const method = ids.indexOf(id) === -1 ? 'PUT' : 'DELETE'

    const msg = method === 'PUT'
      ? `Added ${playlist} to favorites`
      : `Removed ${playlist} from favorites`

    return dispatch(putOrDelete(method, id, endpoint, AuthTypes.PLAYLISTS)).then(
      () => dispatch(syncPlaylists()).then(
        () => dispatch(notif.action(msg)),
      )
    )
  }
}
