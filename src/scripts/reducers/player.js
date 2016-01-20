import merge from 'lodash/object/merge'
import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  volume: {
    shouldExpand: false,
    level: 0.5,
    isDragging: false,
    isMuted: false
  }
}

export default function stream(state = initialState, action) {
  const { shouldExpand, level, isDragging, isMuted } = action
  switch (action.type) {
    case ActionTypes.VOLUME_EXPAND:
      return merge({}, state, {
        volume: {
          shouldExpand,
          isDragging: !shouldExpand ? false : null
        }
      })
    case ActionTypes.VOLUME_CHANGE:
      return merge({}, state, {
        volume: {
          level,
          isDragging,
          isMuted: false,
          shouldExpand: true
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
