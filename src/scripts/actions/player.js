import * as ActionTypes from 'constants/ActionTypes'

export function expandVolume(shouldExpand) {
  return {
    type: ActionTypes.VOLUME_EXPAND,
    shouldExpand
  }
}

export function setVolume(level) {
  return {
    type: ActionTypes.VOLUME_CHANGE,
    level
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

export function toggleAudio(isPlaying) {
  return {
    type: ActionTypes.AUDIO_TOGGLE,
    isPlaying
  }
}

export function setAudioPosition(position) {
  return {
    type: ActionTypes.SET_AUDIO_POSITION,
    position
  }
}

export function getAudioDuration(duration) {
  return {
    type: ActionTypes.GET_AUDIO_DURATION,
    duration
  }
}
