/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

// Fetches a single track:
function fetchTrack(id, endpoint, actionTypes) {
  const types = actionTypes || [
    ActionTypes.TRACK_REQUEST,
    ActionTypes.TRACK_SUCCESS,
    ActionTypes.TRACK_FAILURE
  ]
  return {
    id,
    [CALL_API]: {
      types,
      endpoint,
      schema: Schemas.TRACK
    }
  }
}

export function loadTrackComments(id) {
  return (dispatch, getState) => {
    const track = getState().app.entities.tracks[id]
    const endpoint = `/tracks/${id}/comments?`
    const actionTypes = [
      ActionTypes.TRACK_COMMENTS_REQUEST,
      ActionTypes.TRACK_COMMENTS_SUCCESS,
      ActionTypes.TRACK_COMMENTS_FAILURE
    ]
    if (track) {
      console.log('track comments are cached')
    }

    return dispatch(fetchTrack(id, endpoint, actionTypes))
  }
}

// Fetches a single track from SoundCloud API unless it is cached:
export function loadTrack(id) {
  return (dispatch, getState) => {
    const track = getState().app.entities.tracks[id]
    const endpoint = `/tracks/${id}?`
    if (track) {
      return null
    }

    return dispatch(fetchTrack(id, endpoint))
  }
}
