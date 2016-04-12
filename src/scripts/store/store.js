if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.dist')
} else {
  module.exports = require('./store.dev')
}
