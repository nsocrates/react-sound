/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

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

function fetchUserFavorites(id, endpoint, schema) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.FAVORITE_REQUEST,
        ActionTypes.FAVORITE_SUCCESS,
        ActionTypes.FAVORITE_FAILURE
      ],
      endpoint,
      schema
    }
  }
}

function fetchUserPlaylists(id, endpoint, schema) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.PLAYLIST_REQUEST,
        ActionTypes.PLAYLIST_SUCCESS,
        ActionTypes.PLAYLIST_FAILURE
      ],
      endpoint,
      schema
    }
  }
}

export function loadUserFavorites(id, next = false) {
  return (dispatch, getState) => {
    const schema = Schemas.TRACK_ARRAY
    const { favoritesByUser } = getState().app.partition
    const {
      ids = [],
      next_href = `/users/${id}/favorites?`
    } = favoritesByUser[id] || {}
    const endpoint = next_href ? next_href : `/users/${id}/favorites?`

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUserFavorites(id, endpoint, schema))
  }
}

export function loadUserPlaylists(id, next = false) {
  return (dispatch, getState) => {
    const schema = Schemas.PLAYLIST_ARRAY
    const { playlistsByUser } = getState().app.partition
    const {
      ids = [],
      next_href = `/users/${id}/playlists?`
    } = playlistsByUser[id] || {}
    const endpoint = next_href ? next_href : `/users/${id}/playlists?`

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUserPlaylists(id, endpoint, schema))
  }
}

export function loadUserTracks(id, next = false) {
  return (dispatch, getState) => {
    const schema = Schemas.TRACK_ARRAY
    const { tracksByUser } = getState().app.partition
    const {
      ids,
      next_href = `/users/${id}/tracks?`
    } = tracksByUser[id] || {}
    const endpoint = next_href ? next_href : `/users/${id}/tracks?`

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUser(id, endpoint, schema))
  }
}

export function loadCachedUser(id, next_href = null) {
  return {
    id,
    next_href: !!next_href,
    type: ActionTypes.USER_CACHED
  }
}

// Fetches a single user from SoundCloud API unless it is cached:
export function loadUser(id) {
  return (dispatch, getState) => {
    const user = getState().app.entities.users[id]
    const action = {
      base: {
        endpoint: `/users/${id}?`,
        schema: Schemas.USER
      },
      profile: {
        endpoint: `/users/${id}/web-profiles?`,
        schema: Schemas.USER
      }
    }
    const { base, profile } = action

    if (user && user.hasOwnProperty('web_profiles')) {
      return dispatch(loadCachedUser(id))
    }

    return dispatch(fetchUser(id, base.endpoint, base.schema))
      .then(() => (
        dispatch(fetchUser(id, profile.endpoint, profile.schema))
      )
    )
  }
}
