/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

// Fetches a single user:
function fetchUser(id, endpoint, schema) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.USER_REQUEST,
        ActionTypes.USER_SUCCESS,
        ActionTypes.USER_FAILURE
      ],
      endpoint,
      schema
    }
  }
}

// Fetches a single user from SoundCloud API unless it is cached:
export function loadUser(id) {
  return (dispatch, getState) => {
    const user = getState().app.entities.users[id]
    const action = {
      base: {
        endpoint: `/users/${id}?`,
        schema: Schemas.USER
      },
      profile: {
        endpoint: `/users/${id}/web-profiles?`,
        schema: Schemas.USER
      },
      tracks: {
        endpoint: `/users/${id}/tracks?`,
        schema: Schemas.TRACK_ARRAY
      },
      playlists: {
        endpoint: `/users/${id}/playlists?`,
        schema: Schemas.PLAYLIST_ARRAY
      }
    }
    const { base, profile, tracks, playlists } = action

    if (user && user.hasOwnProperty('online')) {
      return null
    }
    return dispatch(
      fetchUser(id, base.endpoint, base.schema)
    ).then(() =>
      Promise.all([
        dispatch(fetchUser(id, profile.endpoint, profile.schema)),
        dispatch(fetchUser(id, tracks.endpoint, tracks.schema))
      ])
    )
  }
}
