import path from 'path'
import SC from '../soundcloud/index'

export default function configureRoutes(app) {
  app.get('/callback',
    (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'callback.html')))

  app.get('/auth/soundcloud', SC.initAuth)
  app.get('/auth/soundcloud/callback', SC.handleRedirect)
  app.get('/auth/soundcloud/logout', SC.handleLogout)
  app.get('/auth/soundcloud/me', SC.handleMe)
}
