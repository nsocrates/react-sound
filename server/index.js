/* eslint-disable no-console */

import express from 'express'
import path from 'path'
import configureExpress from './config/express'
import configureRoutes from './config/routes'

const app = express()
const compiled_app_module_path = path.resolve(__dirname, '..', 'public', 'assets', 'server.js')
const App = require(compiled_app_module_path)
const isDev = app.get('env') === 'development'

if (isDev) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack/config.babel').default
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
  app.use(webpackHotMiddleware(compiler))
  console.log('\nUsing Webpack')
}

configureExpress(app)
configureRoutes(app)
app.get('*', (req, res) => App.default(req, res))

app.listen(app.get('port'), err => {
  if (err) throw err
  console.log(`\nExpress server listening on port ${app.get('port')} in ${app.get('env')} mode`)
})
