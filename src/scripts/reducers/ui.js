import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  sideMenu: {
    isVisible: false
  },
  searchModal: {
    isOpen: false
  }
}

export default function ui(state = initialState, action) {
  const { sideMenu, searchModal } = state

  switch (action.type) {
    case ActionTypes.TOGGLE_MENU:
      return Object.assign({}, state, {
        sideMenu: {
          isVisible: !sideMenu.isVisible
        }
      })
    case ActionTypes.TOGGLE_MODAL:
      return Object.assign({}, state, {
        searchModal: {
          isOpen: !searchModal.isOpen
        }
      })
    default:
      return state
  }
}
