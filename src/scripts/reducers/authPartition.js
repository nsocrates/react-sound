import * as ActionTypes from 'constants/ActionTypes'
import { AuthTypes } from 'constants/Auth'
import union from 'lodash/union'

const initialState = {
  ids: [],
  isFetching: false,
  next_href: undefined,
  future_href: undefined,
  offset: -1,
  error: null
}

function partitionate({ types }) {
  const [requestType, successType, failureType] = types

  return function updatePartition(state = initialState, action) {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true
        })
      case successType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          next_href: action.response.next_href,
          future_href: action.response.future_href,
          offset: action.offset || 24
        })
      case failureType:
        return Object.assign({}, state, {
          isFetching: false,
          error: action.error
        })
      case ActionTypes.AUTH_DISCONNECT:
        return initialState
      default:
        return state
    }
  }
}

export const stream = partitionate({
  types: AuthTypes.TRACK_ACTIVITIES
})

export const playlists = partitionate({
  types: AuthTypes.OWN_PLAYLISTS
})
