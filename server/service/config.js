import secrets from '../config/secrets'

const config = {
  accessToken: undefined,
  hostname: 'api.soundcloud.com',
  connectURL: '//soundcloud.com/connect',
  callbackURL: secrets.soundcloud.callbackURL,
  clientID: secrets.soundcloud.clientID,
  clientSecret: secrets.soundcloud.clientSecret
}

export default {
  get(key) {
    return config[key]
  },
  set(key, value) {
    return !!value && (config[key] = value)
  },
  flush() {
    return (config.accessToken = undefined)
  }
}
