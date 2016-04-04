import jwt from 'jsonwebtoken'
import path from 'path'
import secrets from './secrets'

const compiled_app_module_path = path.resolve(__dirname, '../../', 'dist', 'assets', 'server.js')
const App = require(compiled_app_module_path)

export default function (app, passport) {
  app.get('/failure',
    (req, res) => res.sendFile(path.resolve(__dirname, '../public', 'failure.html')))

  app.get('/callback',
    (req, res) => res.sendFile(path.resolve(__dirname, '../public', 'callback.html')))

  app.get('/auth/soundcloud',
    passport.authenticate('soundcloud', { session: false }))

  app.get('/auth/soundcloud/callback',
    passport.authenticate('soundcloud', {
      failureRedirect: '/failure',
      session: false
    }), (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180 // 180 days
      const token = jwt.sign(req.user, secrets.jwt.secret, { expiresIn })
      res.cookie('id_token', token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true
      })
      res.redirect('/callback')
    })

  app.get('*', (req, res) => App.default(req, res))
}
