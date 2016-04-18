import { tStorage, tCookies } from 'utils/testUtils'
import { TEST_BROWSER } from 'constants/ActionTypes'

export function testBrowser() {
  const results = {
    localStorage: tStorage(),
    cookies: tCookies()
  }
  return {
    type: TEST_BROWSER,
    results
  }
}
