/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { callApi } from 'actions/call'
import { Schemas } from 'constants/Schemas'
import { setPagination } from 'actions/pagination'

export function loadTrack({ params }) {
  const { id } = params
  return (dispatch, getState) => {
    const track = getState().app.entities.tracks[id]
    const { ids = [] } = getState().app.partition.commentsByTrack[id] || {}

    if (track && ids.length) {
      return null
    }

    const trackOptions = {
      types: [
        ActionTypes.TRACK_REQUEST,
        ActionTypes.TRACK_SUCCESS,
        ActionTypes.TRACK_FAILURE
      ],
      endpoint: `/tracks/${id}`,
      schema: Schemas.TRACK
    }

    const commentOptions = {
      types: [
        ActionTypes.TRACK_COMMENTS_REQUEST,
        ActionTypes.TRACK_COMMENTS_SUCCESS,
        ActionTypes.TRACK_COMMENTS_FAILURE
      ],
      endpoint: `/tracks/${id}/comments`,
      schema: Schemas.COMMENT_ARRAY
    }

    return dispatch(callApi({ id }, trackOptions))
      .then(() => (
        dispatch(callApi({ id }, commentOptions))
      )
      .then(res => (
        dispatch(setPagination(id, res.response.result)))
      )
    )
  }
}

export function loadTrackComments(id, offset, endpoint, force = true) {
  return (dispatch, getState) => {
    const { commentsByTrack } = getState().app.partition
    const {
      next_href = `/tracks/${id}/comments`
    } = commentsByTrack[id] || {}
    const path = endpoint || next_href
    const options = {
      types: [
        ActionTypes.TRACK_COMMENTS_REQUEST,
        ActionTypes.TRACK_COMMENTS_SUCCESS,
        ActionTypes.TRACK_COMMENTS_FAILURE
      ],
      endpoint: path,
      schema: Schemas.COMMENT_ARRAY
    }

    if (!force) {
      return null
    }

    return dispatch(callApi({ id, offset }, options))
      .then(res => (
        dispatch(setPagination(id, res.response.result))
      ))
  }
}
