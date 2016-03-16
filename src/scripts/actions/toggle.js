import * as ActionTypes from 'constants/ActionTypes'

export function toggleSideMenu() {
  return {
    type: ActionTypes.TOGGLE_MENU
  }
}

export function toggleModal() {
  return {
    type: ActionTypes.TOGGLE_MODAL
  }
}

export function toggleTracklist(forceClose = false) {
  return {
    type: ActionTypes.TOGGLE_TRACKLIST,
    forceClose
  }
}

export function toggleNavBar() {
  return {
    type: ActionTypes.TOGGLE_NAVBAR
  }
}

export function toggleProfileMenu(isTrue = false) {
  return {
    type: ActionTypes.TOGGLE_PROFILE_MENU,
    isTrue
  }
}

export function toggleDropdown() {
  return {
    type: ActionTypes.TOGGLE_DROPDOWN
  }
}

export function toggleCloseAll() {
  return {
    type: ActionTypes.TOGGLE_CLOSE_ALL
  }
}
