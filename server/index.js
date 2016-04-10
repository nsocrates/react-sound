import express from 'express'
import path from 'path'
import configureExpress from './config/express'
import configureRoutes from './config/routes'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack/config.babel'

const app = express()
const isDev = app.get('env') === 'development'
const isDevClient = process.argv.indexOf('--client') !== -1

function start(server, port) {
  /* eslint-disable no-console */
  app.listen(port, err => {
    if (err) throw err
    console.log(`\n${server} listening on port ${port} in ${app.get('env')} mode`)
  })
}

if (isDev) {
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, config.devServer))
  app.use(webpackHotMiddleware(compiler))
}

if (isDevClient) {
  app.get('/',
    (req, res) => res.sendFile(path.resolve(__dirname, '../', 'src', 'index.html')))
  start('Webpack Dev Server', config.port)
} else {
  configureExpress(app)
  configureRoutes(app)
  start('Express server', app.get('port'))
}
