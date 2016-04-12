import { TEST_BROWSER } from 'constants/ActionTypes'

const initialState = {
  localStorage: null,
  cookies: null
}

export default function authConfig(state = initialState, action) {
  if (action.type === TEST_BROWSER) {
    return Object.assign({}, state, action.results)
  }

  return state
}
