import { tStorage, tCookies } from 'utils/testUtils'
import config from './config'

export default function runTests() {
  const results = {
    localStorage: tStorage(),
    cookies: tCookies()
  }

  return config.set('state', results)
}
