import 'isomorphic-fetch'
import { OAuth } from 'oauth/oauth'
import { AUTH, CALL_AUTH } from 'constants/Auth'
import { normalize } from 'normalizr'

function callAuth(schema) {
  OAuth.initialize(AUTH.KEY)

  return OAuth.popup(AUTH.SERVICE)
    .fail(error => new Error(error))
    .then(result => (
      result.get('/me')
        .then(me => (
          Object.assign({}, normalize(me, schema))
        ))
    ))
}

export default store => next => action => {
  const callAUTH = action[AUTH.CALL]
  if (typeof callAUTH === 'undefined') {
    return next(action)
  }

  const { schema, types } = callAUTH

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

  return callAuth(schema).then(
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
