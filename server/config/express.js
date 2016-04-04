import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import environment from './environment'
import express from 'express'
import expressJwt from 'express-jwt'
import methodOverride from 'method-override'
import morgan from 'morgan'
import path from 'path'
import secrets from './secrets'
import session from 'express-session'

export default function (app, passport) {
  app.set('port', environment.port)
  app.disable('x-powered-by')
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(cookieParser())
  app.use(methodOverride())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(expressJwt({
    secret: secrets.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token
  }))
  app.use(session({
    secret: secrets.jwt.secret,
    saveUninitialized: true,
    resave: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(morgan('dev'))
}
