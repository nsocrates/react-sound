import * as ActionTypes from 'constants/ActionTypes'

const initialState = []

export default function notification(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.NOTIF_PUBLISH:
      return [action.payload, ...state]
    case ActionTypes.NOTIF_DESTROY:
      return state.filter(notif => notif.id !== action.id)
    case ActionTypes.NOTIF_CLEAR:
      return initialState
    default:
      return state
  }
}
