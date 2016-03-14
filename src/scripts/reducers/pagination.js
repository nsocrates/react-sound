import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  isLoading: false,
  id: null,
  result: []
}

export default function pagination(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PAGINATION_LOAD:
      return Object.assign({}, state, {
        isLoading: true
      })
    case ActionTypes.PAGINATION_SET:
      return Object.assign({}, state, {
        isLoading: false,
        id: action.id,
        result: action.collection
      })
    default:
      return state
  }
}
