/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/middleware/api.js
 */

import 'isomorphic-fetch'
import { CALL_API } from 'constants/Api'
import { constructUrl, extractNumber } from 'utils/Utils'
import { normalize } from 'normalizr'

const entityFactory = json => ({
  next_href: json.next_href || null,
  isStreamable(item) {
    return item.streamable
  },
  getCollection() {
    this.getCollection = null
    return json.collection || json
  },
  getSubResource(args) {
    this.getSubResource = null
    const { entity, id, resource } = args
    const { collection } = json

    return {
      entities: { [entity]: { [id]: { [resource]: collection }}}
    }
  }
})

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
      const entity = entityFactory(json)
      const { next_href } = entity
      let collection = entity.getCollection()

      if (/web-profiles/.test(endpoint)) {
        const separated = endpoint.replace('?','')
                                  .replace('-','_')
                                  .split('/')
        const args = {
          entity: separated[1],
          id: extractNumber(endpoint),
          resource: separated[3]
        }
        const subResource = entity.getSubResource(args)

        return Object.assign({}, subResource)
      }

      if (/genres|\d\/playlists|favorites|tags|\?q=/.test(endpoint)) {
        collection = collection.filter(entity.isStreamable)
      }

      return Object.assign({},
        normalize(collection, schema),
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
