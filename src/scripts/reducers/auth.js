import * as ActionTypes from 'constants/ActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  isAuthorizing: false,
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
        id: action.response.result,
        request: action.response.request
      })
    default:
      return state
  }
}
