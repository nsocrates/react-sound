/* eslint-disable max-len */
const hasWindow = typeof window !== 'undefined'

export const CLIENT_ID = '178cca51f2fb0a81487dc7aafafb4787'
export const AUTH_ROUTE = hasWindow &&
  `${window.location.protocol}//${window.location.host}/auth/soundcloud`
export const BASE = 'https://api.soundcloud.com'
export const CALL_API = Symbol('Call API')

export const PARAMS = {
  client_id: CLIENT_ID,
  linked_partitioning: 1,
  limit: 24,
  filter: 'streamable'
}
