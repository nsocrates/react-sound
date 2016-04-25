import secrets from '../config/secrets'

const config = {
  hostname: 'api.soundcloud.com',
  connectURL: '//soundcloud.com/connect',
  callbackURL: secrets.soundcloud.callbackURL,
  clientID: secrets.soundcloud.clientID,
  clientSecret: secrets.soundcloud.clientSecret
}

export default {
  get(key) {
    return config[key]
  }
}
