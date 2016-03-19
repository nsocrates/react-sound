import 'isomorphic-fetch'
import { OAuth } from 'utils/OAuth'
import { AUTH, REQ } from 'constants/Auth'
import { normalize } from 'normalizr'

const authFactory = () => {
  OAuth.initialize(AUTH.KEY)
  let requestObject = OAuth.create(AUTH.SERVICE)

  return {
    connect(...theArgs) {
      const schema = theArgs[1]

      return OAuth.popup(AUTH.SERVICE, { cache: true })
        .fail(error => new Error(error))
        .then((result) => (
          result.me()
            .fail(error => new Error(error))
            .then(response => {
              requestObject = OAuth.create(AUTH.SERVICE)

              return Object.assign({},
              normalize(response.raw, schema), {
                avatar: response.avatar,
                id: response.raw.id,
                username: response.alias,
                access_token: requestObject.access_token
              })
            })
        ))
    },
    disconnect() {
      return OAuth.clearCache(AUTH.SERVICE)
    },
    get(endpoint, schema) {
      return OAuth.popup(AUTH.SERVICE, { cache: true })
        .fail(error => new Error(error))
        .then(result => (
          result.get(endpoint)
            .fail(error => new Error(error))
            .then(response => (
              Object.assign({},
                normalize(response, schema),
                { requestObject })
            ))
        ))
    },
    put(endpoint) {
      return OAuth.popup(AUTH.SERVICE, { cache: true })
        .fail(error => new Error(error))
        .then(result => (
          result.put(endpoint)
            .fail(error => new Error(error))
            .then(response => response)
        ))
    },
    call(request, ...theArgs) {
      switch (request) {
        case REQ.CONNECT:
          return this.connect(...theArgs)
        case REQ.DISCONNECT:
          return this.disconnect()
        case REQ.GET:
          return this.get(...theArgs)
        case REQ.PUT:
          return this.put(...theArgs)
        default:
          return new Error('Request method does not exist')
      }
    }
  }
}

export default store => next => action => {
  const callAUTH = action[AUTH.CALL]
  if (typeof callAUTH === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAUTH
  const { schema, types, request } = callAUTH

  if (!request) {
    throw new Error('Specify a request method')
  }

  if (request === REQ.GET) {
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
      throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.')
    }
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    finalAction[AUTH.CALL] = null

    return finalAction
  }

  const auth = authFactory()

  const [requestType, successType, failureType] = types

  next(actionWith({ type: requestType }))

  if (request === REQ.DISCONNECT) {
    return auth.disconnect()
  }

  return auth.call(request, endpoint, schema).then(
    response => (
      next(actionWith({
        response,
        type: successType
      }))),
    error => (
      next(actionWith({
        type: failureType,
        error: error.message || 'Something went wrong...'
      })))
  )
}
