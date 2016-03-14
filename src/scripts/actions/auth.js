import * as ActionTypes from 'constants/ActionTypes'
import { AUTH } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { push } from 'react-router-redux'

function authorize(endpoint, schema) {
  if (endpoint === 'disconnect') {
    return {
      [AUTH.CALL]: {
        types: [ActionTypes.AUTH_DISCONNECT],
        endpoint
      }
    }
  }

  return {
    [AUTH.CALL]: {
      types: [
        ActionTypes.AUTH_REQUEST,
        ActionTypes.AUTH_SUCCESS,
        ActionTypes.AUTH_FAILURE
      ],
      endpoint,
      schema
    }
  }
}

export function authConnect() {
  return dispatch => (
    dispatch(authorize('/me', Schemas.USER))
      .then(res => {
        const id = res.response.result.toString()

        return dispatch(push({ pathname: `#user/${id}` }))
      })
  )
}

export function authDisconnect() {
  return dispatch => dispatch(authorize('disconnect'))
}
