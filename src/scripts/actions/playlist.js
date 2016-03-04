/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API, API_ROOT, CLIENT_ID } from 'constants/Api'
import { paginateCollection } from 'actions/collection'
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
      endpoint: `${API_ROOT}/playlists/${id}?${CLIENT_ID}`,
      schema: Schemas.PLAYLIST
    }
  }
}

export function loadPlaylist(id) {
  return (dispatch, getState) => (
    dispatch(fetchPlaylist(id))
      .then(() => {
        const collection = getState().app.entities.playlists[id].tracks.slice(0, 15)
        return dispatch(paginateCollection(id, collection))
      })
  )
}
