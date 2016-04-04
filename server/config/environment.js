export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
  ip: process.env.IP || '0.0.0.0',

  jwt: { secret: process.env.JWT_SECRET || 'secret' },

  soundcloud: {
    clientID: process.env.SOUNDCLOUD_CLIENT_ID || 'id',
    clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/connect/soundcloud/callback`
  }
}
