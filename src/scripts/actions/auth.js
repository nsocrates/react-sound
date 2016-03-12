import * as ActionTypes from 'constants/ActionTypes'
import { AUTH } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'

export default function authorizeUser() {
  return {
    [AUTH.CALL]: {
      types: [
        ActionTypes.AUTH_REQUEST,
        ActionTypes.AUTH_SUCCESS,
        ActionTypes.AUTH_FAILURE
      ],
      schema: Schemas.USER
    }
  }
}
