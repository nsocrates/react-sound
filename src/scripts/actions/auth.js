import * as ActionTypes from 'constants/ActionTypes'
import { CALL_AUTH, AuthReq, AuthTypes } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { notif } from 'actions/notification'
import { fetchUser } from 'actions/user'

export function authConnect() {
  return {
    [CALL_AUTH]: {
      types: [
        ActionTypes.AUTH_REQUEST,
        ActionTypes.AUTH_SUCCESS,
        ActionTypes.AUTH_FAILURE
      ],
      request: AuthReq.CONNECT,
      schema: Schemas.USER
    }
  }
}

function authDisconnect() {
  return {
    [CALL_AUTH]: {
      types: [ActionTypes.AUTH_DISCONNECT],
      request: AuthReq.DISCONNECT
    }
  }
}

function get(endpoint, schema, types) {
  return {
    [CALL_AUTH]: {
      request: AuthReq.GET,
      types,
      endpoint,
      schema
    }
  }
}

function put(id, endpoint) {
  return {
    id,
    [CALL_AUTH]: {
      types: [
        ActionTypes.PUT_REQUEST,
        ActionTypes.PUT_SUCCESS,
        ActionTypes.PUT_FAILURE
      ],
      request: AuthReq.PUT,
      endpoint
    }
  }
}

function del(id, endpoint, deleteType) {
  return {
    id,
    [CALL_AUTH]: {
      types: [
        ActionTypes.DEL_REQUEST,
        ActionTypes.DEL_SUCCESS,
        ActionTypes.DEL_FAILURE
      ],
      request: AuthReq.DEL,
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

    return dispatch(get('/me', Schemas.USER, AuthTypes.PROFILE)).then(
      () => dispatch(fetchUser(id, profileEndpoint)),
      err => dispatch(notif.error(err.error))
    )
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

    return dispatch(get(next_href, Schemas.USER_ARRAY, AuthTypes.FOLLOWINGS))
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

    return dispatch(get(next_href, Schemas.TRACK_ARRAY, AuthTypes.TRACKS))
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

    return dispatch(get(next_href, Schemas.PLAYLIST_ARRAY, AuthTypes.PLAYLISTS))
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
        dispatch(loadTrackCollection(true)),
        dispatch(loadPlaylistCollection(true)),
        dispatch(loadFollowingCollection(true))
      ])
    }

    return dispatch(loadAuthedUser()
      ).then(() =>
        Promise.all([
          dispatch(loadTrackCollection(true)),
          dispatch(loadPlaylistCollection(true)),
          dispatch(loadFollowingCollection(true))
        ])
      )
  }
}


// Put / Del
export function updateMyFollowings(method, id, name) {
  return dispatch => {
    const endpoint = `/me/followings/${id}`
    const username = name ? `"${name}"` : 'user'
    const shouldRm = method === AuthReq.DEL

    let deleteType = undefined
    let reqMethod = put
    let action = 'Following'

    if (shouldRm) {
      deleteType = AuthTypes.DEL.FOLLOWINGS
      reqMethod = del
      action = 'Unfollowed'
    }

    return dispatch(reqMethod(id, endpoint, deleteType)).then(
      () => dispatch(loadFollowingCollection(true)).then(
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
    const shouldRm = method === AuthReq.DEL

    let deleteType = undefined
    let reqMethod = put
    let action = 'Added'
    let msg = `${action} ${track} to favorites`

    if (shouldRm) {
      deleteType = AuthTypes.DEL.TRACKS
      reqMethod = del
      action = 'Removed'
      msg = `${action} ${track} from favorites`
    }

    return dispatch(reqMethod(id, endpoint, deleteType)).then(
      () => dispatch(loadTrackCollection(true)).then(
        () => dispatch(notif.action(msg)),
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
    const shouldRm = method === AuthReq.DEL

    let deleteType = undefined
    let reqMethod = put
    let action = 'Added'

    if (shouldRm) {
      deleteType = AuthTypes.DEL.PLAYLISTS
      reqMethod = del
      action = 'Removed'
    }

    return dispatch(reqMethod(id, endpoint, deleteType)).then(
      () => dispatch(loadPlaylistCollection(true)).then(
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
        console.log(res.response)
        const { username, avatar } = res.response
        return dispatch(loadAuthedCollection()).then(
          () => dispatch(notif.success(`Connected as "${username}"`, undefined, avatar))
        )
      }
    )
  )
}

export function notifDisconnect() {
  return dispatch => (
    dispatch(authDisconnect()).then(
      () => dispatch(notif.action('You have logged out')),
      err => dispatch(notif.error(err.error || 'Unable to logout')))
    )
}
