import * as ActionTypes from 'constants/ActionTypes'
import Cookies from 'js-cookie'
import SC from 'auth/index'
import { AuthTypes } from 'constants/Auth'
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

function setUser(response) {
  return (dispatch, getState) => {
    const { browser } = getState().app

    const { access_token } = response
    const SC_USER = { access_token }

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
  return dispatch => (
    dispatch(get('/me', AuthTypes.PROFILE, null, Schemas.USER))
      .then(response => response.result)
  )
}

export function checkAuth(response) {
  return (dispatch, getState) => {
    const { browser } = getState().app

    let user = Cookies.get('SC_USER')
    if (browser.localStorage) {
      user = lStorage.getObj('SC_USER')
    }

    if (user || response) {
      const { access_token } = user || response
      dispatch(authSuccess({ access_token }))
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
  return dispatch => {
    dispatch(flushUser())
    dispatch(authLogout())
  }
}
