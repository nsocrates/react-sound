import * as ActionTypes from 'constants/ActionTypes'

function requestStream(trackId) {
  return {
    type: ActionTypes.STREAM_REQUEST,
    trackId
  }
}

export function toggleStream(isPlaying) {
  return {
    type: ActionTypes.STREAM_IS_TOGGLED,
    isPlaying
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
      return dispatch(requestStream(trackId))
    }
    if (shouldPauseStream(state, trackId)) {
      return dispatch(toggleStream(false))
    }

    return dispatch(toggleStream(!state.isPlaying))
  }
}
