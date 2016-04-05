import jwt from 'jsonwebtoken'
import path from 'path'
import secrets from './secrets'
import queryString from 'query-string'

const compiled_app_module_path = path.resolve(__dirname, '../../', 'dist', 'assets', 'server.js')
const App = require(compiled_app_module_path)

export default function (app, passport) {
  app.get('/callback',
    (req, res) => res.sendFile(path.resolve(__dirname, '../public', 'callback.html')))

  app.get('/auth/soundcloud',
    passport.authenticate('soundcloud', { session: false }))

  app.get('/auth/soundcloud/callback',
    passport.authenticate('soundcloud', {
      session: false
    }), (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180 // 180 days
      const token = jwt.sign(req.user, secrets.jwt.secret, { expiresIn })
      const queries = queryString.stringify(req.query)
      const callback = queries ? `/callback?${queries}` : '/callback'

      res.cookie('id_token', token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true
      })
      res.redirect(callback)
    })

  app.get('/logout',
    (req, res) => {
      req.logout()
      res.redirect('/')
    })

  app.get('*', (req, res) => App.default(req, res))
}
