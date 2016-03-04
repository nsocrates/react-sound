import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

function fetchTag(tag, next_href) {
  return {
    tag,
    [CALL_API]: {
      types: [
        ActionTypes.TAG_REQUEST,
        ActionTypes.TAG_SUCCESS,
        ActionTypes.TAG_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.TRACK_ARRAY
    }
  }
}

export function loadTag(tag, next = false) {
  return (dispatch, getState) => {
    if (!tag) {
      return null
    }
    const decoded = decodeURIComponent(tag.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const {
      ids = [],
      next_href = `/tracks/?tags=${encoded}&`
    } = getState().app.partition.tracksByTag[decoded] || {}

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchTag(decoded, next_href))
  }
}
