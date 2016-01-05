import * as ActionTypes from '../constants/ActionTypes'
import { CALL_API } from '../constants/Api'
import { Schemas } from '../constants/Schemas'

// Fetches a single user:
function fetchUser(id) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.USER_REQUEST,
        ActionTypes.USER_SUCCESS,
        ActionTypes.USER_FAILURE
      ],
      endpoint: `/users/${id}?`,
      schema: Schemas.USER
    }
  }
}

// Fetches a single user from SoundCloud API unless it is cached:
export function loadUser(id) {
  return (dispatch, getState) => {
    const user = getState().app.entities.users[id]
    if (user) {
      return null
    }

    return dispatch(fetchUser(id))
  }
}
