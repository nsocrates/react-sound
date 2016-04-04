import express from 'express'
import passport from 'passport'
import bsExpress from './config/express'
import bsPassport from './config/passport'
import bsRoutes from './config/routes'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack/config.client.babel'

const app = express()
const isDev = app.get('env') === 'development'

if (isDev) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
}

bsExpress(app, passport)
bsPassport(app, passport)
bsRoutes(app, passport)

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`\nExpress server listening on port ${app.get('port')} in ${app.get('env')} mode`)
})
