import * as ActionTypes from 'constants/ActionTypes'
import { AuthTypes } from 'constants/Auth'
import { combineReducers } from 'redux'
import union from 'lodash/union'

const initialState = {
  e1: [],
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

  function unionFn(e1, data) {
    if (!e1 || !e1.length) {
      return data
    }

    const arr1 = e1.length > data.length ? e1 : data
    const arr2 = e1.length > data.length ? data : e1

    return arr1.filter(n => (
      arr2.filter(c => (
        n.id !== c.id
      ))
    ))
  }

  return function updatePartition(state = initialState, action) {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true
        })
      case successType: {
        const data = action.response.data || []
        return Object.assign({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          next_href: action.response.next_href,
          offset: action.offset || 24,
          e1: unionFn(state.e1, data)
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
          ids: state.ids.filter(n => n !== action.id),
          e1: state.e1.length
            ? state.e1.filter(n => n.id !== action.id)
            : state.e1
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

export const authCollection = combineReducers({
  tracks: partitionate({
    types: AuthTypes.TRACKS.concat(ActionTypes.SYNC_TRACKS)
  }),
  playlists: partitionate({
    types: AuthTypes.PLAYLISTS.concat(ActionTypes.SYNC_PLAYLISTS)
  }),
  followings: partitionate({
    types: AuthTypes.FOLLOWINGS.concat(ActionTypes.SYNC_FOLLOWINGS)
  })
  // comments: partitionate({
  //   types: AuthTypes.COMMENTS.concat(ActionTypes.SYNC_COMMENTS)
  // })
})

export default authCollection
