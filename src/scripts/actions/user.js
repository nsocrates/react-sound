/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'
import { push } from 'react-router-redux'

// Fetches a single user:
function fetchUser(id, endpoint = `/users/${id}?`, schema = Schemas.USER) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.USER_REQUEST,
        ActionTypes.USER_SUCCESS,
        ActionTypes.USER_FAILURE
      ],
      endpoint,
      schema
    }
  }
}

function fetchUserFavorites(id, next_href) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.FAVORITE_REQUEST,
        ActionTypes.FAVORITE_SUCCESS,
        ActionTypes.FAVORITE_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.TRACK_ARRAY
    }
  }
}

function fetchUserPlaylists(id, next_href) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.PLAYLIST_REQUEST,
        ActionTypes.PLAYLIST_SUCCESS,
        ActionTypes.PLAYLIST_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.PLAYLIST_ARRAY
    }
  }
}

export function loadUserFavorites(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/favorites?`
    } = getState().app.partition.favoritesByUser[id] || {}

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUserFavorites(id, next_href))
  }
}

export function loadUserPlaylists(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/playlists?`
    } = getState().app.partition.playlistsByUser[id] || {}

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUserPlaylists(id, next_href))
  }
}

export function loadUserTracks(id, next = false) {
  return (dispatch, getState) => {
    const schema = Schemas.TRACK_ARRAY
    const {
      ids,
      next_href = `/users/${id}/tracks?`
    } = getState().app.partition.tracksByUser[id] || {}
    const endpoint = next_href || `/users/${id}/tracks?`

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUser(id, endpoint, schema))
  }
}


// Fetches a single user from SoundCloud API unless it is cached:
export function loadUser(id) {
  return (dispatch, getState) => {
    const user = getState().app.entities.users[id]
    const profile = `/users/${id}/web-profiles?`

    if (user && user.hasOwnProperty('web_profiles')) {
      return null
    }

    return dispatch(fetchUser(id))
      .then(() => (
        dispatch(fetchUser(id, profile))
      ))
  }
}

export function resolveUser(username) {
  return dispatch => {
    const endpoint = `/resolve?url=http://soundcloud.com/${username}&`

    dispatch(fetchUser(username, endpoint))
      .then(res => {
        const id = res.response.result
        dispatch(fetchUser(id, `/users/${id}/web-profiles?`))
          .then(() => (
            dispatch(push({ pathname: `#user/${id}` }))
          ))
      })
  }
}
