import * as ActionTypes from 'constants/ActionTypes'
import { generateUid } from 'utils/mutationUtils'

function publishNotif(payload) {
  return {
    payload,
    type: ActionTypes.NOTIF_PUBLISH
  }
}

export function destroyNotif(id) {
  return {
    id,
    type: ActionTypes.NOTIF_DESTROY
  }
}

export function clearNotif() {
  return {
    type: ActionTypes.NOTIF_CLEAR
  }
}

export function sendNotif(notifObj) {
  return dispatch => {
    const {
      body,
      icon = null,
      id = generateUid('Notif'),
      kind = 'info',
      priority = false,
      duration = 5000
    } = notifObj || {}

    dispatch(publishNotif({ body, icon, id, kind, priority }))
    if (duration && !priority) {
      setTimeout(() => (
        dispatch(destroyNotif(id))
      ), duration)
    }
  }
}

export function sendNotifSuccess(body, duration, icon) {
  return dispatch => {
    const payload = {
      body,
      duration,
      icon,
      id: generateUid('Notif_Success'),
      kind: 'success',
      priority: false
    }
    return dispatch(sendNotif(payload))
  }
}

export function sendNotifError(body) {
  return dispatch => {
    const payload = {
      body,
      id: generateUid('Notif_Error'),
      kind: 'error',
      priority: true
    }
    return dispatch(sendNotif(payload))
  }
}

export function sendNotifInfo(body, duration, icon) {
  return dispatch => {
    const payload = {
      body,
      duration,
      icon,
      id: generateUid('Notif_Info'),
      kind: 'info',
      priority: false
    }
    return dispatch(sendNotif(payload))
  }
}

export function sendNotifAction(body, duration, icon) {
  return dispatch => {
    const payload = {
      body,
      duration,
      icon,
      id: generateUid('Notif_Action'),
      kind: 'action',
      priority: false
    }
    return dispatch(sendNotif(payload))
  }
}

export const notif = {
  info: sendNotifInfo,
  action: sendNotifAction,
  success: sendNotifSuccess,
  error: sendNotifError,
  clear: clearNotif
}
