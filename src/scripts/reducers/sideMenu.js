import * as ActionTypes from '../constants/ActionTypes'

export default function sideMenu(state = false, action) {
	switch (action.type) {
		case ActionTypes.TOGGLE_MENU:
			return !state
		default:
			return state
	}
}
