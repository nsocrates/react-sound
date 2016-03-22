import * as ActionTypes from 'constants/ActionTypes'
import { AUTH, REQ, AUTH_TYPES } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { notif } from 'actions/notification'
import { fetchUser } from 'actions/user'

export function authConnect() {
  return {
    [AUTH.CALL]: {
      types: [
        ActionTypes.AUTH_REQUEST,
        ActionTypes.AUTH_SUCCESS,
        ActionTypes.AUTH_FAILURE
      ],
      request: REQ.CONNECT,
      schema: Schemas.USER
    }
  }
}

function authDisconnect() {
  return {
    [AUTH.CALL]: {
      types: [ActionTypes.AUTH_DISCONNECT],
      request: REQ.DISCONNECT
    }
  }
}

function get(endpoint, schema, types) {
  return {
    [AUTH.CALL]: {
      request: REQ.GET,
      types,
      endpoint,
      schema
    }
  }
}

function put(endpoint) {
  return {
    [AUTH.CALL]: {
      types: [
        ActionTypes.PUT_REQUEST,
        ActionTypes.PUT_SUCCESS,
        ActionTypes.PUT_FAILURE
      ],
      request: REQ.PUT,
      endpoint
    }
  }
}

function del(endpoint, deleteType) {
  return {
    [AUTH.CALL]: {
      types: [
        ActionTypes.DEL_REQUEST,
        ActionTypes.DEL_SUCCESS,
        ActionTypes.DEL_FAILURE
      ],
      request: REQ.DEL,
      endpoint,
      deleteType
    }
  }
}


// Get
export function loadAuthedUser() {
  return (dispatch, getState) => {
    const {
      auth: {
        result: {
          id
        }
      },
      entities: {
        users
      }
    } = getState().app
    const me = users[id]
    const profileEndpoint = `/users/${id}/web-profiles?`

    if (me && me.hasOwnProperty('web_profiles')) {
      return null
    }

    return dispatch(get('/me', Schemas.USER, AUTH_TYPES.PROFILE))
      .then(() => dispatch(fetchUser(id, profileEndpoint)))
  }
}

export function loadFollowingCollection(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = '/me/followings'
    } = getState().app.auth.collection.followings || {}

    if (ids.length && !forceNext) {
      return null
    }

    return dispatch(get(next_href, Schemas.USER_ARRAY, AUTH_TYPES.FOLLOWINGS))
  }
}

export function loadTrackCollection(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = '/e1/me/track_likes'
    } = getState().app.auth.collection.tracks || {}

    if (ids.length && !forceNext) {
      return null
    }

    return dispatch(get(next_href, Schemas.TRACK_ARRAY, AUTH_TYPES.TRACKS))
  }
}

export function loadPlaylistCollection(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = '/e1/me/playlist_likes'
    } = getState().app.auth.collection.playlists || {}

    if (ids.length && !forceNext) {
      return null
    }

    return dispatch(get(next_href, Schemas.PLAYLIST_ARRAY, AUTH_TYPES.PLAYLISTS))
  }
}

export function loadAuthedCollection() {
  return (dispatch, getState) => {
    const {
      auth: {
        result: {
          id = 0
        }
      },
      entities: {
        users = {}
      }
    } = getState().app
    const me = users[id]

    if (me && me.hasOwnProperty('web_profiles')) {
      return Promise.all([
        dispatch(loadTrackCollection()),
        dispatch(loadPlaylistCollection()),
        dispatch(loadFollowingCollection())
      ])
    }

    return dispatch(loadAuthedUser()
      ).then(() =>
        Promise.all([
          dispatch(loadTrackCollection()),
          dispatch(loadPlaylistCollection()),
          dispatch(loadFollowingCollection())
        ])
      )
  }
}


// Put / Del
export function updateMyFollowings(method, id, name) {
  return dispatch => {
    const endpoint = `/me/followings/${id}`
    const username = name ? `"${name}"` : 'user'
    const shouldRm = method === REQ.DEL

    let deleteType = undefined
    let reqMethod = put
    let action = 'Following'
    let href = endpoint
    let schema = Schemas.USER

    if (shouldRm) {
      deleteType = AUTH_TYPES.DEL.TRACKS
      reqMethod = del
      action = 'Unfollowed'
      href = '/me/followings'
      schema = Schemas.USER_ARRAY
    }

    return dispatch(reqMethod(endpoint, deleteType)).then(
      () => dispatch(get(href, schema, AUTH_TYPES.TRACKS)).then(
        () => dispatch(notif.action(`${action} ${username}.`)),
        err => dispatch(notif.error(err.error))
      ),
      err => dispatch(notif.error(err.error))
    )
  }
}

export function updateMyTracks(method, id, name) {
  return dispatch => {
    const endpoint = `/me/favorites/${id}`
    const track = name ? `"${name}"` : 'track'
    const shouldRm = method === REQ.DEL

    let deleteType = undefined
    let reqMethod = put
    let action = 'Added'
    let href = endpoint
    let schema = Schemas.TRACK

    if (shouldRm) {
      deleteType = AUTH_TYPES.DEL.TRACKS
      reqMethod = del
      action = 'Removed'
      href = '/me/favorites'
      schema = Schemas.TRACK_ARRAY
    }

    return dispatch(reqMethod(endpoint, deleteType)).then(
      () => dispatch(get(href, schema, AUTH_TYPES.TRACKS)).then(
        () => dispatch(notif.action(`${action} ${track} to favorites.`)),
        err => dispatch(notif.error(err.error))
      ),
      err => dispatch(notif.error(err.error))
    )
  }
}

export function updateMyPlaylists(method, id, name) {
  return dispatch => {
    const endpoint = `/e1/me/playlist_likes/${id}`
    const playlist = name ? `"${name}"` : 'playlist'
    const shouldRm = method === REQ.DEL
    const href = '/e1/me/playlist_likes'

    let deleteType = undefined
    let reqMethod = put
    let action = 'Added'

    if (shouldRm) {
      deleteType = AUTH_TYPES.DEL.PLAYLISTS
      reqMethod = del
      action = 'Removed'
    }

    return dispatch(reqMethod(endpoint, deleteType)).then(
      () => dispatch(get(href, Schemas.PLAYLIST_ARRAY, AUTH_TYPES.PLAYLISTS)).then(
        () => dispatch(notif.action(`${action} ${playlist} to favorites.`)),
        err => dispatch(notif.error(err.error))
      ),
      err => dispatch(notif.error(err.error))
    )
  }
}


// Connect
export function notifConnect() {
  return dispatch => (
    dispatch(authConnect()).then(
      res => {
        const { username, avatar } = res.response
        return dispatch(loadAuthedCollection()).then(
          () => dispatch(notif.success(`Connected as "${username}"`, undefined, avatar)),
          err => dispatch(notif.error(err.error))
        )
      },
      err => dispatch(notif.error(err.error))
    )
  )
}

export function notifDisconnect() {
  return (dispatch, getState) => {
    dispatch(authDisconnect())
    const { auth } = getState().app

    if (auth.isAuthorized && Object.keys(auth.result).length) {
      return dispatch(notif.error('Unable to log out'))
    }

    return dispatch(notif.action('You have logged out'))
  }
}
