/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { Schemas } from 'constants/Schemas'
import { push } from 'react-router-redux'
import { callApi } from 'actions/call'

function loadUser(id) {
  return (dispatch, getState) => {
    const user = getState().app.entities.users[id]
    const types = [
      ActionTypes.USER_REQUEST,
      ActionTypes.USER_SUCCESS,
      ActionTypes.USER_FAILURE
    ]
    const userEndpoint = `/users/${id}`
    const profileEndpoint = `/users/${id}/web-profiles`
    const schema = Schemas.USER

    if (user && user.hasOwnProperty('web_profiles')) {
      return null
    }

    return dispatch(callApi({ id }, { endpoint: userEndpoint, types, schema }))
      .then(() => dispatch(callApi({ id }, { endpoint: profileEndpoint, types, schema })))
  }
}

export function loadUserTracks(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/tracks`
    } = getState().app.partition.tracksByUser[id] || {}

    const types = [
      ActionTypes.USER_TRACKS_REQUEST,
      ActionTypes.USER_TRACKS_SUCCESS,
      ActionTypes.USER_TRACKS_FAILURE
    ]
    const endpoint = next_href
    const schema = Schemas.TRACK_ARRAY

    if (ids.length && !next) {
      return null
    }

    return dispatch(callApi({ id }, { endpoint, types, schema }))
  }
}

export function loadUserFavorites(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/favorites`
    } = getState().app.partition.favoritesByUser[id] || {}

    const types = [
      ActionTypes.FAVORITE_REQUEST,
      ActionTypes.FAVORITE_SUCCESS,
      ActionTypes.FAVORITE_FAILURE
    ]
    const endpoint = next_href
    const schema = Schemas.TRACK_ARRAY

    if (ids.length && !next) {
      return null
    }

    return dispatch(callApi({ id }, { endpoint, types, schema }))
  }
}

export function loadUserPlaylists(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/playlists`
    } = getState().app.partition.playlistsByUser[id] || {}

    const types = [
      ActionTypes.PLAYLIST_REQUEST,
      ActionTypes.PLAYLIST_SUCCESS,
      ActionTypes.PLAYLIST_FAILURE
    ]
    const endpoint = next_href
    const schema = Schemas.PLAYLIST_ARRAY

    if (ids.length && !next) {
      return null
    }

    return dispatch(callApi({ id }, { endpoint, types, schema }))
  }
}

export function loadUserFollowings(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/followings`
    } = getState().app.partition.followingsByUser[id] || {}

    const types = [
      ActionTypes.FOLLOWINGS_REQUEST,
      ActionTypes.FOLLOWINGS_SUCCESS,
      ActionTypes.FOLLOWINGS_FAILURE
    ]
    const endpoint = next_href
    const schema = Schemas.USER_ARRAY

    if (ids.length && !next) {
      return null
    }

    return dispatch(callApi({ id }, { endpoint, types, schema }))
  }
}

export function loadUserFollowers(id, next = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = `/users/${id}/followers`
    } = getState().app.partition.followersByUser[id] || {}

    const types = [
      ActionTypes.FOLLOWERS_REQUEST,
      ActionTypes.FOLLOWERS_SUCCESS,
      ActionTypes.FOLLOWERS_FAILURE
    ]
    const endpoint = next_href
    const schema = Schemas.USER_ARRAY

    if (ids.length && !next) {
      return null
    }

    return dispatch(callApi({ id }, { endpoint, types, schema }))
  }
}

function resolveUser(username) {
  return dispatch => {
    const endpoint = `/resolve?url=http://soundcloud.com/${username}`
    const types = [
      ActionTypes.USER_REQUEST,
      ActionTypes.USER_SUCCESS,
      ActionTypes.USER_FAILURE
    ]
    const schema = Schemas.USER

    return dispatch(callApi({ username }, { endpoint, types, schema }))
      .then(res => {
        const id = res.response.result.toString()
        const profileEndpoint = `/users/${id}/web-profiles`
        return dispatch(callApi({ id }, { endpoint: profileEndpoint, types, schema }))
          .then(() => dispatch(push({ pathname: `/user/${id}` })))
      })
  }
}

export function processUserParam({ params }) {
  const { id } = params
  const isUid = /^\d+$/.test(id)
  return dispatch => (
    isUid ? dispatch(loadUser(id)) : dispatch(resolveUser(id))
  )
}
