import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

function fetchSearch(input, next_href) {
  return {
    input,
    [CALL_API]: {
      types: [
        ActionTypes.SEARCH_REQUEST,
        ActionTypes.SEARCH_SUCCESS,
        ActionTypes.SEARCH_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.TRACK_ARRAY
    }
  }
}

function loadCached(input) {
  return {
    input,
    type: ActionTypes.SEARCH_CACHED
  }
}

export function loadSearch(input, next = true) {
  return (dispatch, getState) => {
    const decoded = decodeURIComponent(input.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const unspaced = input.replace(/ /g, '')
    const {
      next_href = `/tracks/?q=${encoded}&`,
      offset = 0
    } = getState().app.partition.searchesByInput[decoded] || {}
    if (!unspaced) {
      return null
    }
    if (offset > 0 && !next) {
      return dispatch(loadCached(decoded))
    }

    return dispatch(fetchSearch(decoded, next_href))
  }
}
