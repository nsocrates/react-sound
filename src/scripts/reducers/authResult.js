import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  id: null,
  accessToken: null,
  error: null
}

export default function authResult(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      })
    case ActionTypes.AUTH_SUCCESS: {
      const { id, access_token } = action.response
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        id,
        accessToken: access_token
      })
    }
    case ActionTypes.AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        error: action.error
      })
    case ActionTypes.AUTH_DISCONNECT:
      return initialState
    default:
      return state
  }
}
