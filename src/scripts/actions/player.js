import * as ActionTypes from 'constants/ActionTypes'

export function expandVolume(shouldExpand) {
  return {
    type: ActionTypes.VOLUME_EXPAND,
    shouldExpand
  }
}

export function changeVolume(level, isDragging) {
  return {
    type: ActionTypes.VOLUME_CHANGE,
    level,
    isDragging
  }
}

export function dragVolume(isDragging) {
  return {
    type: ActionTypes.VOLUME_DRAGGING,
    isDragging
  }
}

export function muteVolume(isMuted) {
  return {
    type: ActionTypes.VOLUME_MUTE,
    isMuted
  }
}
