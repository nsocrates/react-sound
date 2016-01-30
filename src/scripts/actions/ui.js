import * as ActionTypes from 'constants/ActionTypes'

export function toggleMenu() {
  return {
    type: ActionTypes.TOGGLE_MENU
  }
}

export function toggleModal() {
  return {
    type: ActionTypes.TOGGLE_MODAL
  }
}

export function triggerSticky() {
  return {
    type: ActionTypes.NAVBAR_STICK
  }
}
