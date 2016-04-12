import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import environment from './environment'
import express from 'express'
import methodOverride from 'method-override'
import morgan from 'morgan'
import path from 'path'
import PrettyError from 'pretty-error'

export default function configureExpress(app) {
  app.set('port', environment.port)
  app.disable('x-powered-by')
  app.set('view cache', false)
  app.use(cookieParser())
  app.use(methodOverride())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(express.static(path.join(__dirname, '../..', 'dist')))

  app.use(morgan('dev'))

  const pe = new PrettyError();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  pe.start()

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(pe.render(err)) // eslint-disable-line no-console
    const statusCode = err.status || 500
    res.status(statusCode)
    res.send({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    })
  })
}
