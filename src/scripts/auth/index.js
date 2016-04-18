import connect from './connect'
import callback from './callback'

export default global.SC = {
  connect() {
    return connect()
  },

  callback() {
    return callback.notifyDialog(this.location)
  }
}
