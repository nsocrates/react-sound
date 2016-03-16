import * as ActionTypes from 'constants/ActionTypes'

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
      id = new Date().getTime(),
      body = notifObj,
      kind = 'info',
      priority = false,
      duration = priority ? 0 : 5000
    } = notifObj || {}
    dispatch(publishNotif({ id, body, kind, priority }))
    if (duration) {
      setTimeout(() => (
        dispatch(destroyNotif(id))
      ), duration)
    }
  }
}

export function sendNotifSuccess(body, duration) {
  return dispatch => {
    const payload = {
      body,
      duration,
      kind: 'success',
      id: new Date().getTime(),
      priority: false
    }
    return dispatch(sendNotif(payload))
  }
}

export function sendNotifError(body) {
  return dispatch => {
    const payload = {
      body,
      kind: 'error',
      id: new Date().getTime(),
      priority: true
    }
    return dispatch(sendNotif(payload))
  }
}

export function sendNotifInfo(body, duration) {
  return dispatch => {
    const payload = {
      body,
      duration,
      kind: 'info',
      id: new Date().getTime(),
      priority: false
    }
    return dispatch(sendNotif(payload))
  }
}

export function sendNotifAction(body, duration) {
  return dispatch => {
    const payload = {
      body,
      duration,
      kind: 'action',
      id: new Date().getTime(),
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
