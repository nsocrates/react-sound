import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  isAuthorizing: false,
  isAuthorized: !!localStorage.oauthio_provider_soundcloud,
  id: null,
  token: null,
  storage: localStorage
}

export default function authResult(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return Object.assign({}, state, {
        isAuthorizing: true
      })
    case ActionTypes.AUTH_SUCCESS: {
      const { id, access_token } = action.response
      return Object.assign({}, state, {
        isAuthorizing: false,
        isAuthorized: true,
        id,
        token: access_token
      })
    }
    case ActionTypes.AUTH_DISCONNECT:
      return initialState
    default:
      return state
  }
}
