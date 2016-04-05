import connect from './connect'
import config from './config'
import callback from './callback'

export default global.OAuth = {
  connect(opts) {
    return connect(opts)
  },

  isConnected() {
    return config.get('oauth_token') !== undefined
  },

  callback() {
    callback.notifyDialog(this.location)
  }
}
