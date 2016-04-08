import path from 'path'
import SC from '../service/index'

const compiled_app_module_path = path.resolve(__dirname, '../../', 'dist', 'assets', 'server.js')
const App = require(compiled_app_module_path)

export default function (app) {
  app.get('/callback',
    (req, res) => res.sendFile(path.resolve(__dirname, '../public', 'callback.html')))

  app.get('/logout', SC.handleLogout)
  app.get('/auth/soundcloud', SC.initAuth)
  app.get('/auth/soundcloud/callback', SC.handleRedirect)

  app.get('/auth/soundcloud/me', SC.getMe)

  app.get('*', (req, res) => App.default(req, res))
}
