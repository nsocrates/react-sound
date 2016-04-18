import { PAGINATION_SET } from 'constants/ActionTypes'

export function setPagination(id, collection) {
  return {
    id: Number(id),
    collection,
    type: PAGINATION_SET
  }
}
