import 'isomorphic-fetch'
import { OAuth } from 'utils/OAuth'
import { AUTH, REQ } from 'constants/Auth'
import { normalize } from 'normalizr'

const authFactory = () => {
  OAuth.initialize(AUTH.KEY)
  const requestObject = OAuth.create(AUTH.SERVICE)

  return {
    connect(...args) {
      const schema = args.filter(n => !!n)[0]

      return OAuth.popup(AUTH.SERVICE, { cache: true })
        .fail(error => new Error(error))
        .then((response) => (
          response.me()
            .then(data => (
              Object.assign({},
              normalize(data.raw, schema), {
                id: data.raw.id,
                access_token: requestObject.access_token,
                service: requestObject.provider
              })
            ))
        ))
    },
    disconnect() {
      return OAuth.clearCache(AUTH.SERVICE)
    },
    get(endpoint, schema) {
      return OAuth.popup(AUTH.SERVICE, { cache: true })
        .fail(error => new Error(error))
        .then(response => (
          response.get(endpoint)
            .then(data => (
              Object.assign({},
                normalize(data, schema),
                { requestObject })
            ))
        ))
    },
    put(endpoint) {
      return OAuth.popup(AUTH.SERVICE, { cache: true })
        .fail(error => new Error(error))
        .then(response => (
          response.put(endpoint)
            .fail(error => new Error(error))
            .then(data => data)
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
          return {}
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
