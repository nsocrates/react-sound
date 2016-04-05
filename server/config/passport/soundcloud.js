import { Strategy as SoundCloudStrategy } from 'passport-soundcloud'
import secrets from '../secrets'

export default new SoundCloudStrategy({
  clientID: secrets.soundcloud.clientID,
  clientSecret: secrets.soundcloud.clientSecret,
  callbackURL: secrets.soundcloud.callbackURL
}, (accessToken, refreshToken, profile, done) => (
  done(null, profile)
))
