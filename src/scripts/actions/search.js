import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'
import { loadCached } from 'actions/collection'

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

// function loadCached(input, next_href) {
//   return {
//     input,
//     next_href: !!next_href,
//     type: ActionTypes.SEARCH_CACHED
//   }
// }

export function loadSearch(input, next = true) {
  return (dispatch, getState) => {
    if (!input) {
      return null
    }
    const decoded = decodeURIComponent(input.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const {
      next_href = `/tracks/?q=${encoded}&`,
      offset = 0
    } = getState().app.partition.searchesByInput[decoded] || {}

    if (offset > 0 && !next) {
      const args = {
        input,
        next_href,
        type: ActionTypes.SEARCH_SUCCESS
      }
      return dispatch(loadCached(args))
    }

    return dispatch(fetchSearch(decoded, next_href))
  }
}
