import Api from './Api'
import qs from 'query-string'

const SC = {
  initAuth(req, res) {
    const { state } = req.query
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
  }
}

export default SC
