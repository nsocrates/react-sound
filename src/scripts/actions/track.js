/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/ApiConstants'
import { Schemas } from 'constants/Schemas'
import { setPagination } from 'actions/collection'

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

function fetchTrackComments(id, offset, next_href = `/tracks/${id}/comments?`) {
  return {
    id,
    offset,
    [CALL_API]: {
      types: [
        ActionTypes.TRACK_COMMENTS_REQUEST,
        ActionTypes.TRACK_COMMENTS_SUCCESS,
        ActionTypes.TRACK_COMMENTS_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.COMMENT_ARRAY
    }
  }
}

export function loadTrackComments(id, offset, endpoint, next = true) {
  return (dispatch, getState) => {
    const { commentsByTrack } = getState().app.partition
    const {
      next_href = `/tracks/${id}/comments?`
    } = commentsByTrack[id] || {}
    const url = endpoint || next_href

    if (!next) {
      return null
    }

    return dispatch(fetchTrackComments(id, offset, url))
      .then(res => (
        dispatch(setPagination(id, res.response.result))
      ))
  }
}

// Fetches a single track from SoundCloud API unless it is cached:
export function loadTrack(id) {
  return (dispatch, getState) => {
    const track = getState().app.entities.tracks[id]
    const { ids = [] } = getState().app.partition.commentsByTrack[id] || {}

    if (track && ids.length) {
      return null
    }

    return dispatch(fetchTrack(id))
      .then(() => (
        dispatch(fetchTrackComments(id))
      )
      .then(res => (
        dispatch(setPagination(id, res.response.result)))
      )
    )
  }
}
