import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  shouldPlay: null,
  canPlay: null,
  trackId: null,
  error: null
}

export default function stream(state = initialState, action) {
  const { trackId, error, shouldPlay } = action

  switch (action.type) {
    case ActionTypes.STREAM_REQUEST:
      return Object.assign({}, state, {
        trackId,
        shouldPlay: true,
        canPlay: false,
        error: null
      })
    case ActionTypes.STREAM_SUCCESS:
      return Object.assign({}, state, {
        canPlay: true,
        error: null
      })
    case ActionTypes.STREAM_FAILURE:
      return Object.assign({}, state, {
        error
      })
    case ActionTypes.STREAM_ENDED:
      return Object.assign({}, state, {
        shouldPlay
      })
    default:
      return state
  }
}
