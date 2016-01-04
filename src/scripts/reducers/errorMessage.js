import * as ActionTypes from '../constants/ActionTypes'

// Updates error message to notify about failed fetches:
export default function errorMessage(state = null, action) {
	const { type, err } = action

	if (type === ActionTypes.RESET_ERROR_MESSAGE) {
		return null
	} else if (err) {
		return action.err
	}

	return state
}
