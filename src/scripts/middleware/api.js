/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/middleware/api.js
 */

import { CALL_API } from 'constants/Api'
import { constructUrlFromEndpoint } from 'utils/urlUtils'
import { extractNumber } from 'utils/extractUtils'
import { normalize } from 'normalizr'

const entityFactory = json => ({
  next_href: json.next_href || null,
  future_href: json.future_href || null,
  isStreamable(item) {
    return item.streamable
  },
  getCollection() {
    return json.collection || json
  },
  getSubResource(args) {
    const { entity, id, resource } = args
    const { collection } = json

    return {
      entities: { [entity]: { [id]: { [resource]: collection } } }
    }
  },
  handleE1(collection, schema, next_href) {
    const entities = collection.map(item => item.playlist || item.track)
    const data = collection.map(item => {
      const media = item.playlist || item.track
      return { created_at: item.created_at, id: media.id }
    })
    return Object.assign({},
      normalize(entities, schema),
      { data },
      { next_href })
  }
})

// Fetches an API response and normalizes the result JSON according to schema.
function callApi(method, endpoint, params, schema) {
  const url = constructUrlFromEndpoint(endpoint, params)

  return fetch(url, { method })
    .then(response => {
      if (!response.ok) {
        return Promise.reject({
          message: `${response.status} - ${response.statusText}`
        })
      }

      return response.json()
    })
    .then(json => {
      if (method !== 'GET' || !schema) {
        return json
      }

      const entity = entityFactory(json)
      const { next_href, future_href } = entity
      let collection = entity.getCollection()

      if (/web-profiles/.test(endpoint)) {
        const separated = endpoint.replace('?', '')
                                  .replace('-', '_')
                                  .split('/')
        const args = {
          entity: separated[1],
          id: extractNumber(endpoint),
          resource: separated[3]
        }
        // const subResource = entity.getSubResource(args)

        return entity.getSubResource(args)
      }

      if (/genres|favorites|tags|\?q=/.test(endpoint)) {
        collection = collection.filter(entity.isStreamable)
      }

      if (/e1/.test(endpoint) && !/ids/.test(endpoint)) {
        return entity.handleE1(collection, schema, next_href)
      }

      if (/activities/.test(endpoint)) {
        collection = collection.map(item => item.origin)
                               .filter(origin => origin.kind !== 'playlist')
      }
      return Object.assign({},
        normalize(collection, schema),
        { next_href, future_href })
    })
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => { // eslint-disable-line no-unused-vars
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { method, endpoint, schema, types, params } = callAPI

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    finalAction[CALL_API] = null
    return finalAction
  }

  const [requestType, successType, failureType, putType, deleteType] = types

  let responseType
  if (method === 'PUT') {
    responseType = putType
  } else if (method === 'DELETE') {
    responseType = deleteType
  } else {
    responseType = successType
  }

  next(actionWith({ type: requestType }))

  return callApi(method, endpoint, params, schema).then(
    response => next(actionWith({
      response,
      type: responseType
    })),
    err => next(actionWith({
      type: failureType,
      error: err.message || 'Something went wrong...'
    })))
}
