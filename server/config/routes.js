import path from 'path'
import SC from '../service/index'
import config from '../service/config'

const compiled_app_module_path = path.resolve(__dirname, '../../', 'dist', 'assets', 'server.js')
const App = require(compiled_app_module_path)

export default function configureRoutes(app) {
  app.get('/callback',
    (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'callback.html')))

  app.get('/auth/soundcloud', SC.initAuth)
  app.get('/auth/soundcloud/callback', SC.handleRedirect)

  app.get('/auth/soundcloud/logout', SC.handleLogout)

  app.get('/auth/soundcloud/me', SC.handleMe)
  app.get('/test', SC.testRoute)

  app.get('*', (req, res) => App.default(req, res, config.getMe()))
}
