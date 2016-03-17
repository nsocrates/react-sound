import * as ActionTypes from 'constants/ActionTypes'
import { AUTH, REQ } from 'constants/Auth'
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

function get(endpoint, schema) {
  return {
    [AUTH.CALL]: {
      types: [
        ActionTypes.GET_REQUEST,
        ActionTypes.GET_SUCCESS,
        ActionTypes.GET_FAILURE
      ],
      request: REQ.GET,
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
        const { username } = res.response
        return dispatch(notif.success(`Connected as "${username}"`))
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

export function getMe() {
  return dispatch => dispatch(get('/me', Schemas.USER))
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
