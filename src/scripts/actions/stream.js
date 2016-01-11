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

// function shouldPauseStream(state, trackId) {
//   return (trackId === state.trackId && state.isPlaying)
// }

// function shouldPlayStream(state, trackId) {
//   return (trackId === state.trackId && !state.isPlaying)
// }

export function toggleStream(isPlaying) {
  return {
    type: ActionTypes.STREAM_IS_TOGGLED,
    isPlaying
  }
}

// export function loadStream(trackId) {
//   return (dispatch, getState) => {
//     const state = getState().app.stream

//     if (shouldPauseStream(state, trackId)) {
//       console.log('should Pause Stream')
//       return dispatch(toggleStream(false))
//     } else if (shouldPlayStream(state, trackId)) {
//       console.log('should Play Stream')
//       return dispatch(toggleStream(true))
//     }

//     return dispatch(requestStream(trackId))
//   }
// }
