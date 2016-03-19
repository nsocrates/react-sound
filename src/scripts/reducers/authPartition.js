import { AUTH_TYPES } from 'constants/Auth'
import { combineReducers } from 'redux'
import union from 'lodash/union'
import merge from 'lodash/merge'

const initialState = {
  ids: [],
  isFetching: false,
  next_href: undefined,
  offset: 0
}

function partitionate({ types }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected types to be strings.')
  }

  const [requestType, successType, failureType] = types

  return function updatePartition(state = initialState, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        })
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          next_href: action.response.next_href,
          offset: action.offset || 0
        })
      case failureType:
        return merge({}, state, {
          isFetching: false
        })
      default:
        return state
    }
  }
}

export const authPartition = combineReducers({
  tracks: partitionate({
    types: AUTH_TYPES.TRACKS
  }),
  playlists: partitionate({
    types: AUTH_TYPES.PLAYLISTS
  }),
  favorites: partitionate({
    types: AUTH_TYPES.FAVORITES
  }),
  comments: partitionate({
    types: AUTH_TYPES.COMMENTS
  })
})

export default authPartition
