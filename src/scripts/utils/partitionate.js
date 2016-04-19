import merge from 'lodash/merge'
import union from 'lodash/union'

const initialState = {
  ids: [],
  isFetching: false,
  next_href: undefined,
  offset: -1,
  error: null
}

export default function partitionate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [requestType, successType, failureType] = types

  function updatePartition(state = initialState, action) {
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
          offset: action.offset || 24
        })
      case failureType:
        return merge({}, state, {
          isFetching: false,
          error: action.response.error
        })
      default:
        return state
    }
  }

  return function updatePartitionByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error(`Expected key (${key}) to be a string.`)
        }
        return merge({}, state, {
          [key]: updatePartition(state[key], action)
        })
      }
      default:
        return state
    }
  }
}
