import * as ActionTypes from 'constants/ActionTypes'
import { AUTH, REQ, AUTH_TYPES } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { notif } from 'actions/notification'

function connect() {
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

function disconnect() {
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

export function authConnect() {
  return dispatch => (
    dispatch(connect('connect')).then(
      res => {
        const { username, avatar } = res.response
        return dispatch(notif.success(`Connected as "${username}"`, undefined, avatar))
      },
      err => dispatch(notif.error(err.error))
    )
  )
}

export function authDisconnect() {
  return (dispatch, getState) => {
    dispatch(disconnect())
    const { auth } = getState().app

    if (auth.isAuthorized && Object.keys(auth.result).length) {
      return dispatch(notif.error('Unable to log out'))
    }

    return dispatch(notif.action('You have logged out'))
  }
}

export function getAuthedUser() {
  return dispatch => {
    dispatch(get('/me', Schemas.USER, AUTH_TYPES.PROFILE))
  }
}

export function getAuthedFavorites() {
  return dispatch => {
    dispatch(get('/me/favorites', Schemas.TRACK_ARRAY, AUTH_TYPES.FAVORITES)).then(
      res => console.log(res)
    )
  }
}

export function addToFavorites(id) {
  return dispatch => {
    const endpoint = `/me/favorites/${id}`

    return dispatch(put(endpoint)).then(
      () => dispatch(notif.action('Added track to favorites')),
      err => dispatch(notif.error(err.error))
    )
  }
}
