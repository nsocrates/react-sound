import * as ActionTypes from 'constants/ActionTypes'
import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { loadTag } from 'actions/tag'

export function loadCollection(path, query, force = false) {
  switch (path) {
    case '#genre':
      return loadGenre(query, force)
    case '#search':
      return loadSearch(query, force)
    case '#tag':
      return loadTag(query, force)
    default:
      return null
  }
}

export function loadPagination() {
  return {
    type: ActionTypes.PAGINATION_LOAD
  }
}

export function setPagination(id, collection) {
  return {
    id: Number(id),
    collection,
    type: ActionTypes.PAGINATION_SET
  }
}

export function delayPagination(id, collection, delay) {
  return dispatch => {
    dispatch(loadPagination())
    if (delay) {
      setTimeout(() => (
        dispatch(setPagination(id, collection))
      ), delay)
    }
  }
}
