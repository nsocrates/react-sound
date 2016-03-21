import * as ActionTypes from 'constants/ActionTypes'
import { AUTH, REQ, AUTH_TYPES } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { notif } from 'actions/notification'
import { fetchUser } from 'actions/user'

export function aConnect() {
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

function aDisconnect() {
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
    const user = users[id]
    const profileEndpoint = `/users/${id}/web-profiles?`

    if (user && user.hasOwnProperty('web_profiles')) {
      return null
    }

    return dispatch(get('/me', Schemas.USER, AUTH_TYPES.PROFILE))
      .then(() => dispatch(fetchUser(id, profileEndpoint)))
  }
}

export function loadAuthedFavorites(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = '/me/favorites'
    } = getState().app.auth.partition.playlists || {}

    if (ids.length && !forceNext) {
      return null
    }

    return dispatch(get(next_href, Schemas.TRACK_ARRAY, AUTH_TYPES.FAVORITES))
  }
}

export function loadAuthedPlaylists(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = '/me/playlists'
    } = getState().app.auth.partition.playlists || {}

    if (ids.length && !forceNext) {
      return null
    }

    return dispatch(get(next_href, Schemas.TRACK_ARRAY, AUTH_TYPES.PLAYLISTS))
  }
}

export function loadAuthedTracks(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = '/me/tracks'
    } = getState().app.auth.partition.tracks || {}

    if (ids.length && !forceNext) {
      return null
    }

    return dispatch(get(next_href, Schemas.TRACK_ARRAY, AUTH_TYPES.TRACKS))
  }
}

export function loadAuthedCollection() {
  return dispatch => (
    dispatch(loadAuthedUser()
      ).then(() =>
        Promise.all([
          dispatch(loadAuthedFavorites()),
          dispatch(loadAuthedPlaylists()),
          dispatch(loadAuthedTracks())
        ])
      )
  )
}


// Favorites
export function authFavorites(method, id, name) {
  return dispatch => {
    const endpoint = `/me/favorites/${id}`
    const track = name ? `"${name}"` : 'track'
    const shouldRm = method === REQ.DEL

    let deleteType = undefined
    let req = put
    let action = 'Added'
    let href = endpoint

    if (shouldRm) {
      deleteType = AUTH_TYPES.DEL.FAVORITES
      req = del
      action = 'Removed'
      href = '/me/favorites'
    }

    return dispatch(req(endpoint, deleteType)).then(
      () => dispatch(get(href, Schemas.TRACK, AUTH_TYPES.FAVORITES)).then(
        () => dispatch(notif.action(`${action} ${track} to favorites.`)),
        err => dispatch(notif.error(err.error))
      ),
      err => dispatch(notif.error(err.error))
    )
  }
}

// Connect
export function authConnect() {
  return dispatch => (
    dispatch(aConnect()).then(
      res => {
        const { username, avatar } = res.response
        return dispatch(loadAuthedFavorites()).then(
          () => dispatch(notif.success(`Connected as "${username}"`, undefined, avatar)),
          err => dispatch(notif.error(err.error))
        )
      },
      err => dispatch(notif.error(err.error))
    )
  )
}

export function authDisconnect() {
  return (dispatch, getState) => {
    dispatch(aDisconnect())
    const { auth } = getState().app

    if (auth.isAuthorized && Object.keys(auth.result).length) {
      return dispatch(notif.error('Unable to log out'))
    }

    return dispatch(notif.action('You have logged out'))
  }
}
