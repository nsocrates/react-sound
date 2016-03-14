import 'isomorphic-fetch'
import { OAuth } from 'utils/OAuth'
import { AUTH } from 'constants/Auth'
import { normalize } from 'normalizr'
import { sendNotif, destroyNotif } from 'actions/notification'

const authFactory = () => {
  OAuth.initialize(AUTH.KEY)

  return {
    connect(endpoint, schema) {
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
    },
    disconnect() {
      return OAuth.clearCache(AUTH.SERVICE)
    }
  }
}

export default store => next => action => {
  const callAUTH = action[AUTH.CALL]
  if (typeof callAUTH === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAUTH
  const { schema, types } = callAUTH

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (types.indexOf('AUTH_DISCONNECT') === -1) {
    if (!schema) {
      throw new Error('Specify one of the exported Schemas.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.')
    }
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    finalAction[AUTH.CALL] = null

    return finalAction
  }

  const auth = authFactory()
  const { dispatch } = store

  if (types.indexOf('AUTH_DISCONNECT') > -1) {
    auth.disconnect()
    dispatch(sendNotif({
      kind: 'success',
      body: 'Successfully disconnected'
    }))
    return next(actionWith({ type: 'AUTH_DISCONNECT' }))
  }

  const [requestType, successType, failureType] = types
  const notifReq = {
    id: new Date().getTime() + 1,
    kind: 'info',
    duration: 0,
    body: 'Requesting connection'
  }
  const notifSuccess = {
    id: new Date().getTime() + 2,
    kind: 'success',
    body: 'Successfully connected'
  }
  const notifError = {
    id: new Date().getTime() + 3,
    kind: 'error',
    body: 'Failed to connect',
    priority: true
  }
  dispatch(sendNotif(notifReq))
  next(actionWith({ type: requestType }))

  return auth.connect(endpoint, schema).then(
    response => {
      dispatch(destroyNotif(notifReq.id))
      dispatch(sendNotif(notifSuccess))
      return next(actionWith({
        response,
        type: successType
      }))},
    error => {
      dispatch(destroyNotif(notifReq.id))
      dispatch(sendNotif(notifError))
      return next(actionWith({
        type: failureType,
        error: error.message || 'Cannot request Auth..'
      }))}
  )
}
