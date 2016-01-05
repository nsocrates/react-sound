import * as ActionTypes from '../constants/ActionTypes'
import { CALL_API } from '../constants/Api'
import { Schemas } from '../constants/Schemas'

// Fetches a single track:
function fetchTrack(id) {
  return {
    id,
    [CALL_API]: {
      types: [
        ActionTypes.TRACK_REQUEST,
        ActionTypes.TRACK_SUCCESS,
        ActionTypes.TRACK_FAILURE
      ],
      endpoint: `/tracks/${id}?`,
      schema: Schemas.TRACK
    }
  }
}

// Fetches a single track from SoundCloud API unless it is cached:
export function loadTrack(id) {
  return (dispatch, getState) => {
    const track = getState().app.entities.tracks[id]
    if (track) {
      return null
    }

    return dispatch(fetchTrack(id))
  }
}
