import * as ActionTypes from 'constants/ActionTypes'

function requestStream(trackId, isPlaying) {
  return {
    type: ActionTypes.STREAM_REQUEST,
    trackId,
    isPlaying
  }
}

export function toggleStream(isPlaying) {
  return {
    type: ActionTypes.STREAM_IS_PLAYING,
    isPlaying
  }
}

export function pauseStream(isPaused) {
  return {
    type: ActionTypes.STREAM_IS_PAUSED,
    isPaused
  }
}

function shouldFetchStream(state, trackId) {
  return (trackId !== state.trackId)
}

function shouldPauseStream(state, trackId) {
  return (trackId === state.trackId && state.isPlaying)
}

export function loadStream(trackId) {
  return (dispatch, getState) => {
    const state = getState().app.stream

    if (shouldFetchStream(state, trackId)) {
      return dispatch(requestStream(trackId, true))
    }
    if (shouldPauseStream(state, trackId)) {
      return dispatch(pauseStream(true))
    }

    return dispatch(toggleStream(true))
  }
}
