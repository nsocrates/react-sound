import { CLIENT_ID, CALLBACK, ROOT, CONNECT } from 'constants/ApiConstants'

const config = {
  oauth_token: undefined,
  client_id: CLIENT_ID,
  redirect_uri: CALLBACK,
  baseURL: ROOT,
  connectURL: CONNECT,

  get(key) {
    return this[key]
  },
  set(key, value) {
    return !!value && (this[key] = value)
  }

}

export default config
