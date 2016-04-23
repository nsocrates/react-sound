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

      if (endpoint.indexOf('/web-profiles') > -1) {
        const separated = endpoint.replace('?', '')
                                  .replace('-', '_')
                                  .split('/')
        const args = {
          entity: separated[1],
          id: extractNumber(endpoint),
          resource: separated[3]
        }

        return entity.getSubResource(args)
      }

      if ((
        endpoint.indexOf('/favorites') > -1 ||
        endpoint.indexOf('/tracks/?genres=') > -1 ||
        endpoint.indexOf('/tracks/?tags=') > -1
      )) {
        collection = collection.filter(entity.isStreamable)
      }

      if (endpoint.indexOf('/e1/me') > -1) {
        return entity.handleE1(collection, schema, next_href)
      }

      if (endpoint.indexOf('/me/activities/') > -1) {
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
    delete finalAction[CALL_API]
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
