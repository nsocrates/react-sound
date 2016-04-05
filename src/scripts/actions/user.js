/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/ApiConstants'
import { Schemas } from 'constants/Schemas'
import { push } from 'react-router-redux'

// Fetches a single user:
export function fetchUser(id, endpoint) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.USER_REQUEST,
        ActionTypes.USER_SUCCESS,
        ActionTypes.USER_FAILURE
      ],
      endpoint,
      schema: Schemas.USER
    }
  }
}

function fetchUserTracks(id, next_href) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.USER_TRACKS_REQUEST,
        ActionTypes.USER_TRACKS_SUCCESS,
        ActionTypes.USER_TRACKS_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.TRACK_ARRAY
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

function fetchUserFollowings(id, next_href) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.FOLLOWINGS_REQUEST,
        ActionTypes.FOLLOWINGS_SUCCESS,
        ActionTypes.FOLLOWINGS_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.USER_ARRAY
    }
  }
}

function fetchUserFollowers(id, next_href) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.FOLLOWERS_REQUEST,
        ActionTypes.FOLLOWERS_SUCCESS,
        ActionTypes.FOLLOWERS_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.USER_ARRAY
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
    const {
      ids = [],
      next_href = `/users/${id}/tracks?`
    } = getState().app.partition.tracksByUser[id] || {}

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUserTracks(id, next_href))
  }
}

export function loadUserFollowers(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/followers?`
    } = getState().app.partition.followersByUser[id] || {}

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUserFollowers(id, next_href))
  }
}

export function loadUserFollowings(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/followings?`
    } = getState().app.partition.followingsByUser[id] || {}

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchUserFollowings(id, next_href))
  }
}

// Fetches a single user from SoundCloud API unless it is cached:
export function loadUser(id) {
  return (dispatch, getState) => {
    const user = getState().app.entities.users[id]
    const userEndpoint = `/users/${id}?`
    const profileEndpoint = `/users/${id}/web-profiles?`

    if (user && user.hasOwnProperty('web_profiles')) {
      return null
    }

    return dispatch(fetchUser(id, userEndpoint))
      .then(() => (
        dispatch(fetchUser(id, profileEndpoint))
      ))
  }
}

export function resolveUser(username) {
  return dispatch => {
    const endpoint = `/resolve?url=http://soundcloud.com/${username}&`

    dispatch(fetchUser(username, endpoint))
      .then(res => {
        const id = res.response.result.toString()
        dispatch(fetchUser(id, `/users/${id}/web-profiles?`))
          .then(() => (
            dispatch(push({ pathname: `#user/${id}` }))
          ))
      })
  }
}
