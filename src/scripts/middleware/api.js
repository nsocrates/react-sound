import 'isomorphic-fetch'
import { API_ROOT, API_DATA, CALL_API } from 'constants/Api'
import { normalize } from 'normalizr'

// Constructs url from endpoint.
function constructUrl(endpoint) {
  if (endpoint.indexOf(API_ROOT) === -1) {
    return API_ROOT + endpoint + API_DATA
  }

  return endpoint + API_DATA
}

// Extracts the next page URI from API response.
function getNextHref(json) {
  return json.next_href ? json.next_href : null
}

// Accesses collection property if it exists.
function getCollection(json) {
  return json.collection ? json.collection : json
}

// Checks for streamable property.
function isStreamable(json) {
  return json.streamable
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
      const objectJSON = getCollection(json).filter(isStreamable)

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
    throw new Error('Specify a strong endpoint URL.')
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
    delete finalAction[CALL_API]

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
