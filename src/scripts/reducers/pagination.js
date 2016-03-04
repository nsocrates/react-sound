import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  isLoading: false,
  id: null,
  result: []
}

export default function pagination(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_PAGINATION:
      return Object.assign({}, state, {
        isLoading: true
      })
    case ActionTypes.PAGINATE:
      return Object.assign({}, state, {
        isLoading: false,
        id: action.id,
        result: action.collection
      })
    default:
      return state
  }
}
