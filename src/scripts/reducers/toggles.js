import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  dropdown: {
    isOpen: false
  },
  profileMenu: {
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

export default function toggle(state = initialState, action) {
  const { dropdown, navbar, sideMenu, searchModal, tracklist } = state
  const { isTrue, forceClose } = action

  switch (action.type) {
    case ActionTypes.TOGGLE_DROPDOWN:
      return Object.assign({}, state, {
        dropdown: {
          isOpen: !dropdown.isOpen
        }
      })
    case ActionTypes.TOGGLE_PROFILE_MENU:
      return Object.assign({}, state, {
        profileMenu: {
          isSticky: isTrue
        }
      })
    case ActionTypes.TOGGLE_NAVBAR:
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
          isOpen: forceClose === true ? false : !tracklist.isOpen
        }
      })
    case ActionTypes.TOGGLE_CLOSE_ALL:
      return Object.assign({}, state, {
        dropdown: {
          isOpen: false
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
      })
    default:
      return state
  }
}
