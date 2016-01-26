/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

// Fetches a collection of tracks for a particular playlist:
function fetchPlaylist(id) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.PLAYLIST_REQUEST,
        ActionTypes.PLAYLIST_SUCCESS,
        ActionTypes.PLAYLIST_FAILURE
      ],
      endpoint: `/playlists/${id}?`,
      schema: Schemas.PLAYLIST
    }
  }
}

export function loadPlaylist(id) {
  return dispatch => (
    dispatch(fetchPlaylist(id))
  )
}
