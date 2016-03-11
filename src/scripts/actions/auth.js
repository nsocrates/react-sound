import * as ActionTypes from 'constants/ActionTypes'
import { CALL_AUTH } from 'constants/Auth'

export default function authorizeUser() {
  return {
    [CALL_AUTH]: {
      types: [
        ActionTypes.AUTH_REQUEST,
        ActionTypes.AUTH_SUCCESS,
        ActionTypes.AUTH_FAILURE
      ]
    }
  }
}
