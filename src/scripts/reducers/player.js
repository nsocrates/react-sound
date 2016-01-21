import merge from 'lodash/object/merge'
import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  audio: {
    position: 0,
    duration: 0,
    isPlaying: false,
    isSeeking: false
  },
  volume: {
    shouldExpand: false,
    level: 1,
    isDragging: false,
    isMuted: false
  }
}

export default function stream(state = initialState, action) {
  const { shouldExpand, level, isDragging, isMuted, isPlaying, position, duration } = action
  switch (action.type) {
    case ActionTypes.SET_AUDIO_POSITION:
      return merge({}, state, {
        audio: {
          position
        }
      })
    case ActionTypes.GET_AUDIO_DURATION:
      return merge({}, state, {
        audio: {
          duration
        }
      })
    case ActionTypes.AUDIO_TOGGLE:
      return merge({}, state, {
        audio: {
          isPlaying
        }
      })
    case ActionTypes.VOLUME_DRAGGING:
      return merge({}, state, {
        volume: {
          isDragging
        }
      })
    case ActionTypes.VOLUME_EXPAND:
      return merge({}, state, {
        volume: {
          shouldExpand
        }
      })
    case ActionTypes.VOLUME_CHANGE:
      return merge({}, state, {
        volume: {
          level,
          isMuted: false
        }
      })
    case ActionTypes.VOLUME_MUTE:
      return merge({}, state, {
        volume: { isMuted }
      })
    default:
      return state
  }
}
