import connect from './connect'
import config from './config'
import callback from './callback'

export default global.SC = {
  connect() {
    return connect()
  },

  isConnected() {
    return config.get('access_token') !== undefined
  },

  disconnect() {
    Storage.clear()
    return config.set('access_token', undefined)
  },

  callback() {
    return callback.notifyDialog(this.location)
  },

  expose() {
    return config.expose()
  }
}
