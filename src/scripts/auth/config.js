import { CLIENT_ID } from 'constants/ApiConstants'

const config = {
  access_token: undefined,
  client_id: CLIENT_ID
}

export default {
  get(key) {
    return config[key]
  },
  set(key, value) {
    return !!value && (config[key] = value)
  },

  expose() {
    return config
  }
}
