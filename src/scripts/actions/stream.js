import * as ActionTypes from 'constants/ActionTypes'
import { pushTrack } from 'actions/player'

export function requestStream(trackId) {
  return {
    type: ActionTypes.STREAM_REQUEST,
    trackId: Number(trackId)
  }
}

export function loadStreamList(ids) {
  return dispatch => {
    dispatch(requestStream(ids[0]))
    dispatch(pushTrack(ids, 'playlist'))
  }
}

export function streamCanPlay() {
  return {
    type: ActionTypes.STREAM_SUCCESS
  }
}

export function streamFailure(error) {
  return {
    type: ActionTypes.STREAM_FAILURE,
    error
  }
}

export function endStream(shouldPlay = false) {
  return {
    type: ActionTypes.STREAM_ENDED,
    shouldPlay
  }
}
