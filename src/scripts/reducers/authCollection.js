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

function partitionate({ types, deleteType }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error(`Expected types to be an array of three elements. Got: ${types}`)
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error(`Expected types to be strings. Got: ${types}`)
  }

  const [requestType, successType, failureType] = types

  return function updatePartition(state = initialState, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        })
      case successType: {
        const result = Array.isArray(action.response.result)
          ? action.response.result
          : [action.response.result]
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, result),
          next_href: action.response.next_href,
          offset: action.offset || 0
        })
      }
      case failureType:
        return merge({}, state, {
          isFetching: false
        })
      case deleteType:
        return Object.assign({}, state, {
          ids: state.ids.filter(n => n !== Number(action.response.id))
        })
      default:
        return state
    }
  }
}

export const authCollection = combineReducers({
  tracks: partitionate({
    types: AUTH_TYPES.TRACKS,
    deleteType: AUTH_TYPES.DEL.TRACKS
  }),
  playlists: partitionate({
    types: AUTH_TYPES.PLAYLISTS,
    deleteType: AUTH_TYPES.DEL.PLAYLISTS
  }),
  followings: partitionate({
    types: AUTH_TYPES.FOLLOWINGS,
    deleteType: AUTH_TYPES.DEL.FOLLOWINGS
  }),
  comments: partitionate({
    types: AUTH_TYPES.COMMENTS,
    deleteType: AUTH_TYPES.DEL.COMMENTS
  })
})

export default authCollection
