import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  duration: 0,
  isPlaying: false,
  isPaused: false,
  didInvalidate: false,
  trackId: 0
}

export default function stream(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STREAM_REQUEST:
      return Object.assign({}, state, {
        didInvalidate: false,
        trackId: action.trackId,
        isPlaying: action.isPlaying,
        isPaused: !action.isPlaying
      })
    case ActionTypes.STREAM_FAILURE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case ActionTypes.STREAM_IS_PLAYING:
      return Object.assign({}, state, {
        isPlaying: action.isPlaying,
        isPaused: !action.isPlaying
      })
    case ActionTypes.STREAM_IS_PAUSED:
      return Object.assign({}, state, {
        isPaused: action.isPaused,
        isPlaying: !action.isPaused
      })
    default:
      return state
  }
}
