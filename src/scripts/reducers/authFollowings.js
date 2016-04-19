import * as ActionTypes from 'constants/ActionTypes'
import { AuthTypes } from 'constants/Auth'
import { combineReducers } from 'redux'
import union from 'lodash/union'

const initialState = {
  ids: [],
  isFetching: false,
  next_href: undefined,
  offset: -1,
  error: null
}

function partitionate({ types }) {
  const [
    requestType,
    successType,
    failureType,
    putType,
    deleteType,
    syncType
  ] = types

  return function updatePartition(state = initialState, action) {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true
        })
      case successType: {
        return Object.assign({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          next_href: action.response.next_href,
          offset: action.offset || 24
        })
      }
      case failureType:
        return Object.assign({}, state, {
          isFetching: false,
          error: action.error
        })
      case putType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: state.ids.concat(action.id)
        })
      case deleteType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: state.ids.filter(n => n !== action.id)
        })
      case syncType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: action.response.collection
        })
      default:
        return state
    }
  }
}

export const authLikes = combineReducers({
  followings: partitionate({
    types: AuthTypes.FOLLOWINGS.concat(ActionTypes.SYNC_FOLLOWINGS)
  })
})

export default authLikes
