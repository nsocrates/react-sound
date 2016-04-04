export default {
  jwt: { secret: process.env.JWT_SECRET || 'ufocat' },

  soundcloud: {
    clientID: process.env.SOUNDCLOUD_CLIENT_ID || '178cca51f2fb0a81487dc7aafafb4787',
    clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET || '7e1e6a71da1fe5d021e362fb4fcebfa2',
    callbackURL: `${process.env.DOMAIN || ''}/auth/soundcloud/callback`
  }
}
