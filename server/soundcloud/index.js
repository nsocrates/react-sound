import Api from './Api'
import qs from 'query-string'
import config from './config'

const SC = {
  initAuth(req, res) {
    const { accessToken, userId } = config.getMe()
    const { state } = req.query

    if (accessToken && userId) {
      const q = qs.stringify({
        access_token: accessToken,
        user_id: userId,
        state })
      const callback = `/callback?${q}`
      return res.redirect(callback)
    }

    const url = Api.getConnectUrl(state)
    res.writeHead(301, { Location: url })
    return res.end()
  },

  handleRedirect(req, res) {
    const { state, code } = req.query
    Api.authorize(state, code,
      (err, payload) => {
        if (err) {
          const qErr = qs.stringify({
            code: err.code || 404,
            error_message: err.message || 'Something went wrong',
            error: err.error || 'error',
            state
          })
          return res.redirect(`/callback?${qErr}`)
        }

        const callback = `/callback?${qs.stringify(payload)}`
        return res.redirect(callback)
      })
  },

  handleMe(req, res) {
    Api.getMe(
      (err, me) => (
        err ? res.status(err.code).send(err.message) : res.json(me)))
  },

  handleLogout(req, res) {
    Api.flush()
    res.redirect('back')
  }
}

export default SC
