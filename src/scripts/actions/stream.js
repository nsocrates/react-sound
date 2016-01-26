import * as ActionTypes from 'constants/ActionTypes'

export function requestStream(trackId) {
  return {
    type: ActionTypes.STREAM_REQUEST,
    trackId
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
