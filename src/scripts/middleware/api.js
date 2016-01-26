/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/middleware/api.js
 */

import 'isomorphic-fetch'
import { CALL_API } from 'constants/Api'
import { constructUrl } from 'utils/Utils'
import { normalize } from 'normalizr'

// Extracts the next page URI from API response.
function getNextHref(json) {
  return json.next_href ? json.next_href : null
}

// Checks for streamable property.
function isStreamable(json) {
  return json.streamable
}

// Accesses collection property; if it exists, filters streamable.
function getCollection(json) {
  return json.collection ? json.collection.filter(isStreamable) : json
}

// Fetches an API response and normalizes the result JSON according to schema.
function callApi(endpoint, schema) {
  const url = constructUrl(endpoint)

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }

      return response.json()
    })
    .then(json => {
      const next_href = getNextHref(json)
      const objectJSON = getCollection(json)

      return Object.assign({},
        normalize(objectJSON, schema),
        { next_href })
    })
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error ('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    finalAction[CALL_API] = null

    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    err => next(actionWith({
      type: failureType,
      error: err.message || 'Something went wrong...'
    })))
}
