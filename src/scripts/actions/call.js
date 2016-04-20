import { CALL_API } from 'constants/Api'
import { authConnect } from 'actions/authenticate'

export function callApi(meta, payload) {
  const {
    endpoint,
    types,
    schema,
    params,
    method = 'GET'
  } = payload

  return Object.assign({}, meta, {
    [CALL_API]: {
      endpoint,
      types,
      schema,
      params,
      method
    }
  })
}

/**
 * [Normalizes arguments for callApi]
 * @param  {[string]} id               [Meta]
 * @param  {[string]} accessToken      [oauth_token]
 * @param  {[object]} _options         [method, endpoint, types, schema, params]
 * @return {[function]}                [Dispatch callApi action]
 */

function processOptions(id, accessToken, _options) {
  const options = _options
  options.params = options.params || {}
  if (accessToken) {
    options.params.oauth_token = accessToken
  }

  return dispatch => dispatch(callApi({ id }, options))
}

export function get(endpoint, types, params, schema) {
  return (dispatch, getState) => {
    const options = {
      method: 'GET',
      endpoint,
      schema,
      types,
      params
    }
    const requiresAuth = endpoint && endpoint.split('/').indexOf('me') !== -1
    const { accessToken } = getState().app.auth.user
    const token = requiresAuth && accessToken
    if (requiresAuth && !accessToken) {
      return dispatch(authConnect())
    }

    return dispatch(processOptions(null, token, options))
  }
}

export function putOrDelete(method, id, endpoint, types) {
  return (dispatch, getState) => {
    const { accessToken } = getState().app.auth.user
    const options = {
      method,
      endpoint,
      types
    }

    return dispatch(processOptions(id, accessToken, options))
  }
}
