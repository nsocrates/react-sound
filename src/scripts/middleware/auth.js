import 'isomorphic-fetch'
import { OAuth } from 'oauth/oauth'
import { AUTH, CALL_AUTH } from 'constants/Auth'
import { normalize } from 'normalizr'

function callAuth(endpoint, schema) {
  OAuth.initialize(AUTH.KEY)

  if (endpoint === 'disconnect') {
    return OAuth.clearCache()
  }

  return OAuth.popup(AUTH.SERVICE, { cache: true })
    .fail(error => new Error(error))
    .then(service => (
      service.get(endpoint)
        .then(me => {
          const request = OAuth.create(AUTH.SERVICE)
          return Object.assign({},
            normalize(me, schema),
            { request })
        })
    ))
}

export default store => next => action => {
  const callAUTH = action[AUTH.CALL]
  if (typeof callAUTH === 'undefined') {
    return next(action)
  }

  const { schema, types, endpoint } = callAUTH

  if (endpoint === 'disconnect') {
    return callAuth(endpoint)
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

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    finalAction[AUTH.CALL] = null

    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callAuth(endpoint, schema).then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Cannot request Auth...'
      }))
    )
}
