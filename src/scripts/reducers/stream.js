import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isSeeking: false,
  trackId: 0
}

export default function stream(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STREAM_REQUEST:
      return Object.assign({}, state, {
        trackId: action.trackId,
        isPlaying: true,
        hasEnded: false
      })
    case ActionTypes.STREAM_IS_PLAYING:
      return Object.assign({}, state, {
        isPlaying: action.isPlaying,
        hasEnded: false
      })
    case ActionTypes.STREAM_IS_TOGGLED:
      return Object.assign({}, state, {
        isPlaying: action.isPlaying
      })
    default:
      return state
  }
}
