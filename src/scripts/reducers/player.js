import merge from 'lodash/merge'
import union from 'lodash/union'
import flatten from 'lodash/flatten'
import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  tracklist: {
    ids: []
  },
  audio: {
    position: 0,
    duration: 0,
    isPlaying: false,
    isSeeking: false
  },
  volume: {
    shouldExpand: false,
    level: 0.5,
    isDragging: false,
    isMuted: false
  }
}

export default function stream(state = initialState, action) {
  const {
    shouldExpand,
    level,
    isDragging,
    isMuted,
    isPlaying,
    isSeeking,
    position,
    duration,
    trackId,
    kind
  } = action

  switch (action.type) {
    case ActionTypes.SET_AUDIO_POSITION:
      return merge({}, state, {
        audio: {
          position
        }
      })
    case ActionTypes.SET_AUDIO_DURATION:
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
    case ActionTypes.AUDIO_SEEKING:
      return merge({}, state, {
        audio: {
          isSeeking,
          position
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
    case ActionTypes.TRACK_ADD:

      if (kind === 'playlist') {
        return Object.assign({}, state, {
          tracklist: {
            ids: flatten(trackId)
          }
        })
      }

      return merge({}, state, {
        tracklist: {
          ids: union(state.tracklist.ids, [trackId])
        }
      })
    default:
      return state
  }
}
