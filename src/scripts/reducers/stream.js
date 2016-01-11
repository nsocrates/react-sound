import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  currentTime: null,
  duration: null,
  canPlay: null,
  isPlaying: null,
  isSeeking: null,
  trackId: null,
  errorMessage: null
}

export default function stream(state = initialState, action) {
  const { trackId, isPlaying, error } = action

  switch (action.type) {
    case ActionTypes.STREAM_REQUEST:
      return Object.assign({}, state, {
        trackId,
        canPlay: false,
        isPlaying: false
      })
    case ActionTypes.STREAM_SUCCESS:
      return Object.assign({}, state, {
        canPlay: true,
        isPlaying: true
      })
    case ActionTypes.STREAM_FAILURE:
      return Object.assign({}, initialState, {
        errorMessage: error,
        trackId
      })
    case ActionTypes.STREAM_IS_TOGGLED:
      return Object.assign({}, state, {
        isPlaying
      })
    default:
      return state
  }
}
