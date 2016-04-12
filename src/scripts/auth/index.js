import connect from './connect'
import config from './config'
import callback from './callback'
import user from './authUser'

export default global.SC = {
  connect() {
    return connect()
  },

  isConnected() {
    return config.get('accessToken') !== undefined
  },

  disconnect() {
    return user.flush()
  },

  callback() {
    return callback.notifyDialog(this.location)
  },

  expose() {
    return config.expose()
  }
}
