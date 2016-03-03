/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'
import { loadCached } from 'actions/collection'

// Fetches a single track:
function fetchTrack(id, endpoint, types, schema) {
  return {
    id,
    [CALL_API]: {
      types,
      endpoint,
      schema
    }
  }
}

function fetchTrackComments(id, offset, next_href) {
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

export function loadTrackComments(id, offst, endpoint, next = true) {
  return (dispatch, getState) => {
    const { commentsByTrack } = getState().app.partition
    const {
      next_href = `/tracks/${id}/comments?`,
      offset = 0
    } = commentsByTrack[id] || {}
    const url = endpoint || next_href

    if (offset > 0 && !next) {
      const args = {
        id,
        type: ActionTypes.TRACK_COMMENTS_SUCCESS,
        next_href
      }
      return dispatch(loadCached(args))
    }

    return dispatch(fetchTrackComments(id, offst, url))
  }
}

// Fetches a single track from SoundCloud API unless it is cached:
export function loadTrack(id) {
  return (dispatch, getState) => {
    const track = getState().app.entities.tracks[id]
    const { ids = null } = getState().app.partition.commentsByTrack[id] || {}
    const action = {
      base: {
        endpoint: `/tracks/${id}?`,
        schema: Schemas.TRACK,
        types: [
          ActionTypes.TRACK_REQUEST,
          ActionTypes.TRACK_SUCCESS,
          ActionTypes.TRACK_FAILURE
        ]
      },
      comments: {
        endpoint: `/tracks/${id}/comments?`,
        schema: Schemas.COMMENT_ARRAY,
        types: [
          ActionTypes.TRACK_COMMENTS_REQUEST,
          ActionTypes.TRACK_COMMENTS_SUCCESS,
          ActionTypes.TRACK_COMMENTS_FAILURE
        ]
      }
    }
    const { base, comments } = action

    if (track && !ids) {
      dispatch(fetchTrack(id, comments.endpoint, comments.types, comments.schema))
    }

    if (track && ids) {
      const args = {
        id,
        type: ActionTypes.TRACK_SUCCESS
      }
      return dispatch(loadCached(args))
    }

    return dispatch(fetchTrack(id, base.endpoint, base.types, base.schema))
      .then(() => (
        dispatch(fetchTrack(id, comments.endpoint, comments.types, comments.schema))
      )
    )
  }
}
