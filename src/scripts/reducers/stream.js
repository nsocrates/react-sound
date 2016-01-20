import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  canPlay: null,
  isPlaying: null,
  trackId: null
}

export default function stream(state = initialState, action) {
  const { trackId, isPlaying, isMuted } = action

  switch (action.type) {
    case ActionTypes.STREAM_REQUEST:
      return Object.assign({}, state, {
        trackId,
        canPlay: false,
        isPlaying: false
      })
    case ActionTypes.STREAM_SUCCESS:
      return Object.assign({}, state, {
        canPlay: true
      })
    case ActionTypes.STREAM_IS_TOGGLED:
      return Object.assign({}, state, {
        isPlaying
      })
    case ActionTypes.STREAM_IS_MUTED:
      return Object.assign({}, state, {
        isMuted
      })
    default:
      return state
  }
}
