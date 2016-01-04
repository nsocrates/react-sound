import * as types from '../constants/ActionTypes'

export default function sideMenu(state = false, action) {
	switch (action.type) {
		case types.TOGGLE_MENU:
			return !state
		default:
			return state
	}
}
