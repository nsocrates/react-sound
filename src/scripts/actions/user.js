/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

// Fetches a single user:
function fetchUser(id, endpoint) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.USER_REQUEST,
        ActionTypes.USER_SUCCESS,
        ActionTypes.USER_FAILURE
      ],
      endpoint,
      schema: Schemas.USER
    }
  }
}

// function fetchWebProfiles(id) {
//   return {
//     id,
//     [CALL_API]: {
//       types: [
//         ActionTypes.USER_REQUEST,
//         ActionTypes.USER_SUCCESS,
//         ActionTypes.USER_FAILURE
//       ],
//       endpoint: `/users/${id}/web-profiles?`,
//       schema: Schemas.USER
//     }
//   }
// }

// Fetches a single user from SoundCloud API unless it is cached:
export function loadUser(id) {
  return (dispatch, getState) => {
    const user = getState().app.entities.users[id]
    const endpoints = {
      base: `/users/${id}?`,
      profile: `/users/${id}/web-profiles?`
    }

    if (user && user.hasOwnProperty('online')) {
      return null
    }
    return dispatch(
      fetchUser(id, endpoints.base)
    ).then(() =>
      Promise.all([
        dispatch(fetchUser(id, endpoints.profile))
      ])
    )
  }
}
