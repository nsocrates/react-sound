/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/store/configureStore.js
 */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.dist')
} else {
  module.exports = require('./store.dev')
}
