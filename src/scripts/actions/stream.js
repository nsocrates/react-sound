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

export function toggleMute(isMuted) {
  return {
    type: ActionTypes.STREAM_IS_MUTED,
    isMuted
  }
}

export function toggleStream(isPlaying) {
  return {
    type: ActionTypes.STREAM_IS_TOGGLED,
    isPlaying
  }
}
