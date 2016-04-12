import { extractNumber } from 'utils/extractUtils'
import { CALL_AUTH, AUTH_BASE, AuthReq } from 'constants/Auth'
import { normalize } from 'normalizr'
import SC from 'auth/index'

const authFactory = () => {
  function handleCollection(response) {
    return response.collection
  }

  function handleArray(response) {
    return response.map(item => item.playlist)
  }

  function handleFavorites(response, schema) {
    const entities = response.map(item => item.playlist || item.track)
    const likes = response.map(item => {
      const media = item.playlist || item.track
      return Object.assign({}, {
        created_at: item.created_at,
        id: media.id
      })
    })
    return Object.assign({},
      normalize(entities, schema), {
        likes
      }
    )
  }

  function connect(...theArgs) {
    const schema = theArgs[1]

    return SC.connect()
      .then(resolve => (
        fetch(`${AUTH_BASE}/me`)
          .then(response => {
            if (!response.ok) {
              return Promise.reject(response)
            }
            return response.json().then(json => (
              Object.assign({},
                normalize(json, schema), {
                  avatar: json.avatar_url,
                  username: json.username
                }, resolve)
            ))
          })
      ))
      .catch(error => { throw new Error(error.error_description) })
  }

  function disconnect() {
    return fetch(`${AUTH_BASE}/logout`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`)
        }
        SC.disconnect()
        return response
      })
  }

  function get(endpoint, schema) {
    // return OAuth.popup(AUTH.SERVICE, { cache: true })
    //   .fail(error => new Error(error))
    //   .then(resolve => (
    //     resolve.get(endpoint)
    //       .fail(error => new Error(error))
    //       .then(response => {
    //         let collection = response
    //         if (Array.isArray(response) && !response.every(item => item.id)) {
    //           collection = handleArray(response)
    //           return handleFavorites(response, schema)
    //         }
    //         if (response.collection) {
    //           collection = handleCollection(response)
    //         }
    //         return Object.assign({},
    //           normalize(collection, schema),
    //           { response })
    //       })
    //   ))
  }

  function put(endpoint) {
    // return OAuth.popup(AUTH.SERVICE, { cache: true })
    //   .fail(error => new Error(error))
    //   .then(resolve => (
    //     resolve.put(endpoint)
    //       .fail(error => new Error(error))
    //       .then(response => response)
    //   ))
  }

  function del(endpoint) {
    // return OAuth.popup(AUTH.SERVICE, { cache: true })
    //   .fail(error => new Error(error))
    //   .then(resolve => (
    //     resolve.del(endpoint)
    //       .fail(error => new Error(error))
    //       .then(() => (
    //         Object.assign({}, { id: extractNumber(endpoint) })
    //       ))
    //   ))
  }

  return {
    call(request, ...theArgs) {
      switch (request) {
        case AuthReq.CONNECT:
          return connect(...theArgs)
        case AuthReq.DISCONNECT:
          return disconnect()
        case AuthReq.GET:
          return get(...theArgs)
        case AuthReq.PUT:
          return put(...theArgs)
        case AuthReq.DEL:
          return del(...theArgs)
        default:
          return new Error('Request method does not exist')
      }
    }
  }
}

export default store => next => action => { // eslint-disable-line no-unused-vars
  const callAUTH = action[CALL_AUTH]
  if (typeof callAUTH === 'undefined') {
    return next(action)
  }

  const { endpoint, schema, types, request, deleteType = undefined } = callAUTH

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    finalAction[CALL_AUTH] = null

    return finalAction
  }

  const auth = authFactory()

  const [requestType, successType, failureType] = types

  next(actionWith({ type: requestType }))

  if (request === AuthReq.DISCONNECT) {
    return auth.call(request)
  }

  return auth.call(request, endpoint, schema).then(
    response => (
      next(actionWith({
        response,
        type: deleteType || successType
      }))),
    error => (
      next(actionWith({
        type: failureType,
        error: error.message || error.responseJSON.errors[0].error_message
      })))
  )
}
