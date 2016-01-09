import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  isVisible: false
}

export default function sideMenu(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU:
      return Object.assign({}, state, {
        isVisible: !state.isVisible
      })
    default:
      return state
  }
}
