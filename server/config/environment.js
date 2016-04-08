const port = 8000

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || port,
  ip: process.env.IP || '0.0.0.0',
  domain: process.env.DOMAIN || `http://localhost:${port}`
}
