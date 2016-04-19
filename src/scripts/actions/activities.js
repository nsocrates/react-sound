import { AuthTypes } from 'constants/Auth'
import { Schemas } from 'constants/Schemas'
import { get } from 'actions/call'

export function loadTrackActivities(forceNext = false) {
  return (dispatch, getState) => {
    const {
      ids = [],
      next_href = '/me/activities/tracks/affiliated'
    } = getState().app.auth.stream || {}

    if (ids.length && !forceNext) {
      return null
    }

    return dispatch(get(next_href, AuthTypes.TRACK_ACTIVITIES, null, Schemas.TRACK_ARRAY))
  }
}

export function pollTrackActivities() {
  return (dispatch, getState) => {
    const { future_href } = getState().app.auth.stream || {}

    return future_href
      && dispatch(get(future_href, AuthTypes.TRACK_ACTIVITIES, null, Schemas.TRACK_ARRAY))
  }
}
