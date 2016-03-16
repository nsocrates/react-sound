import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  isAuthorizing: false,
  isAuthorized: false,
  result: {}
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return Object.assign({}, state, {
        isAuthorizing: true
      })
    case ActionTypes.AUTH_SUCCESS: {
      const { id, access_token, service } = action.response
      return Object.assign({}, state, {
        isAuthorizing: false,
        isAuthorized: true,
        result: {
          id,
          service,
          token: access_token
        }
      })
    }
    case ActionTypes.AUTH_DISCONNECT:
      return initialState
    default:
      return state
  }
}
