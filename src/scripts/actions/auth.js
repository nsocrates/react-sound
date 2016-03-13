import * as ActionTypes from 'constants/ActionTypes'
import { AUTH } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { loadUser } from 'actions/user'
import { push } from 'react-router-redux'

function authorize(endpoint, schema) {
  return {
    [AUTH.CALL]: {
      types: [
        ActionTypes.AUTH_REQUEST,
        ActionTypes.AUTH_SUCCESS,
        ActionTypes.AUTH_FAILURE
      ],
      endpoint,
      schema,
    }
  }
}

export function authConnect() {
  return dispatch => (
    dispatch(authorize('/me', Schemas.USER))
      .then(res => {
        const id = res.response.result.toString()
        dispatch(loadUser(id))
          .then(() => dispatch(push({ pathname: `#user/${id}` })))
      })
  )
}

export function authDisconnect() {
  return dispatch => dispatch(authorize('disconnect'))
}
