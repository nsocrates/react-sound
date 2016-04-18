import * as ActionTypes from 'constants/ActionTypes'
import Cookies from 'js-cookie'
import SC from 'auth/index'
import { AuthTypes, AUTH_BASE } from 'constants/Auth'
import { get } from 'actions/call'
import { syncCollection } from 'actions/collection'
import { lStorage } from 'utils/mutationUtils'
import { Schemas } from 'constants/Schemas'

function authRequest() {
  return { type: ActionTypes.AUTH_REQUEST }
}

function authSuccess(response) {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    response
  }
}

function authFailure(error) {
  return {
    type: ActionTypes.AUTH_FAILURE,
    error
  }
}

function authLogout() {
  return { type: ActionTypes.AUTH_DISCONNECT }
}

function connect() {
  return SC.connect()
    .then(resolve => resolve)
    .catch(error => { throw new Error(error.error_description) })
}

function disconnect() {
  return fetch(`${AUTH_BASE}/logout`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }

      return response
    })
}

function setUser(response) {
  return (dispatch, getState) => {
    const { browser } = getState().app

    const { access_token, user_id } = response
    const SC_USER = { access_token, user_id }

    if (browser.localStorage) {
      lStorage.setObj('SC_USER', SC_USER)
    } else if (browser.cookies) {
      Cookies.set('SC_USER', SC_USER)
    }

    return response
  }
}

function flushUser() {
  return (dispatch, getState) => {
    const { browser } = getState().app

    if (browser.localStorage) {
      localStorage.removeItem('SC_USER')
    }
    if (browser.cookies) {
      Cookies.remove('SC_USER')
    }

    return null
  }
}

function loadAuthedUser() {
  return (dispatch, getState) => {
    const {
      auth: {
        user: {
          userId: id
        }
      },
      entities: {
        users
      }
    } = getState().app
    const me = users[id]

    if (me && me.hasOwnProperty('web_profiles')) {
      return null
    }

    return dispatch(get('/me', AuthTypes.PROFILE, Schemas.USER))
      .then(response => (
        dispatch(get(`/users/${response.id}/web-profiles?`, AuthTypes.PROFILE, Schemas.USER))
      ))
  }
}

export function checkAuth(response) {
  return (dispatch, getState) => {
    const { browser } = getState().app

    let user = Cookies.get('SC_USER')
    if (browser.localStorage) {
      user = lStorage.getObj('SC_USER')
    }

    if (user || response) {
      const { access_token, user_id } = user || response
      dispatch(authSuccess({ access_token, user_id }))
      dispatch(loadAuthedUser())
      dispatch(syncCollection())
    }

    return response
  }
}

export function authConnect() {
  return dispatch => {
    dispatch(authRequest())

    return connect()
      .then(response => dispatch(setUser(response)))
      .then(response => dispatch(checkAuth(response)))
      .catch(error => dispatch(authFailure(error.message)))
  }
}

export function authDisconnect() {
  return dispatch => (
    disconnect()
      .then(() => dispatch(flushUser()))
      .then(() => dispatch(authLogout()))
      .catch(error => dispatch(authFailure(error.message)))
  )
}
