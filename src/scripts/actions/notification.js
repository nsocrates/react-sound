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
