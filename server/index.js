import express from 'express'
import path from 'path'
import configureExpress from './config/express'
import configureRoutes from './config/routes'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack/config.babel'
import SC from './soundcloud/config'

const app = express()
const compiled_app_module_path = path.resolve(__dirname, '..', 'dist', 'assets', 'server.js')
const App = require(compiled_app_module_path)
const isDev = app.get('env') === 'development'

if (isDev) {
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, config.devServer))
  app.use(webpackHotMiddleware(compiler))
}

configureExpress(app)
configureRoutes(app)
app.get('*', (req, res) => App.default(req, res, SC.getMe()))

/* eslint-disable no-console */
app.listen(app.get('port'), err => {
  if (err) throw err
  console.log(`\nExpress server listening on port ${app.get('port')} in ${app.get('env')} mode`)
})
