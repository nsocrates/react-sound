import * as ActionTypes from '../constants/ActionTypes'

// Resets current visible error message:
export function resetErrorMessage() {
	return {
		type: ActionTypes.RESET_ERROR_MESSAGE
	}
}
