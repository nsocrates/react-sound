/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { setPagination } from 'actions/pagination'
import { Schemas } from 'constants/Schemas'
import { callApi } from 'actions/call'

export function loadPlaylist({ params }) {
  const { id } = params
  const options = {
    types: [
      ActionTypes.PLAYLIST_REQUEST,
      ActionTypes.PLAYLIST_SUCCESS,
      ActionTypes.PLAYLIST_FAILURE
    ],
    endpoint: `/playlists/${id}`,
    schema: Schemas.PLAYLIST,
    params: {
      limit: 500
    }
  }
  return (dispatch, getState) => (
    dispatch(callApi({ id }, options))
      .then(() => {
        const collection = getState().app.entities.playlists[id].tracks.slice(0, 15)
        return dispatch(setPagination(id, collection))
      })
      .catch(err => { throw err })
  )
}
