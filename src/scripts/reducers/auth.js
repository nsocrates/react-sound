import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  isAuthorizing: false,
  hasAuthorized: false,
  id: null,
  request: {}
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return Object.assign({}, state, {
        isAuthorizing: true
      })
    case ActionTypes.AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuthorizing: false,
        hasAuthorized: true,
        id: action.response.result,
        request: action.response.request
      })
    case ActionTypes.AUTH_DISCONNECT:
      return initialState
    default:
      return state
  }
}
