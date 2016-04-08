import api from './api'
import qs from 'query-string'

const SC = {
  initAuth(req, res) {
    const url = api.getConnectUrl(req.query.state)
    res.writeHead(301, { Location: url })
    return res.end()
  },

  handleRedirect(req, res) {
    const { state, code } = req.query
    api.authorize(state, code,
      (err, payload) => {
        if (err) return res.json(err)
        const callback = `/callback?${qs.stringify(payload)}`
        return res.redirect(callback)
      })
  },

  getMe(req, res) {
    api.getMe(
      (err, me) => (
        err ? res.send(err) : res.json(me)))
  },

  handleLogout(req, res) {
    api.flush()
    res.redirect('/')
  }
}

export default SC
