import soundcloud from './passport/soundcloud'

export default function (app, passport) {
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((obj, done) => done(null, obj))

  passport.use(soundcloud)
}
