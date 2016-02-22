import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  menu: {
    isSticky: false
  },
  navbar: {
    isSticky: false
  },
  sideMenu: {
    isVisible: false
  },
  searchModal: {
    isOpen: false
  },
  tracklist: {
    isOpen: false
  }
}

export default function ui(state = initialState, action) {
  const { navbar, sideMenu, searchModal, tracklist } = state
  const { isTrue } = action

  switch (action.type) {
    case ActionTypes.MENU_STICK:
      return Object.assign({}, state, {
        menu: {
          isSticky: isTrue
        }
      })
    case ActionTypes.NAVBAR_STICK:
      return Object.assign({}, state, {
        navbar: {
          isSticky: !navbar.isSticky
        }
      })
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
    case ActionTypes.TOGGLE_TRACKLIST:
      return Object.assign({}, state, {
        tracklist: {
          isOpen: !tracklist.isOpen
        }
      })
    default:
      return state
  }
}
