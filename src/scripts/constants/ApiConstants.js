/* eslint-disable max-len */
const hasWindow = typeof window !== 'undefined'

export const CLIENT_ID = '178cca51f2fb0a81487dc7aafafb4787'
export const CALLBACK = hasWindow && `${window.location.protocol}//${window.location.host}/auth/soundcloud/callback`
export const ROOT = 'https://api.soundcloud.com'
export const CONNECT = 'https://connect.soundcloud.com'
export const CALL_API = Symbol('Call API')

export const DATA = {
  client_id: CLIENT_ID,
  linked_partitioning: 1,
  limit: 24
}
