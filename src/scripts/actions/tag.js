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

function loadCached(input, next_href) {
  return {
    input,
    next_href: !!next_href,
    type: ActionTypes.TAG_CACHED
  }
}

export function loadTag(tag, next = true) {
  return (dispatch, getState) => {
    if (!tag) {
      return null
    }
    const decoded = decodeURIComponent(tag.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const {
      next_href = `/tracks/?tags=${encoded}&`,
      offset = 0
    } = getState().app.partition.tracksByTag[decoded] || {}

    if (offset > 0 && !next) {
      return dispatch(loadCached(decoded, next_href))
    }

    return dispatch(fetchTag(decoded, next_href))
  }
}
