import https from 'https'
import qs from 'query-string'
import config from './config'

function callApi(opts, callback) {
  const { hostname, endpoint, method, params } = opts
  const queries = qs.stringify(params)
  const pathname = `${endpoint}?${queries}`
  const options = {
    hostname,
    path: pathname,
    method
  }

  if (method === 'POST') {
    options.pathname = endpoint
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': queries.length
    }
  }

  const req = https.request(options, response => {
    let body = ''
    response.on('data', data => (body += data))
    response.on('end', () => {
      try {
        const parsed = JSON.parse(body)
        if (response.statusCode >= 400) {
          callback({
            code: response.statusCode,
            message: response.statusMessage,
            error: parsed.error
          }, undefined)
        } else {
          callback(undefined, parsed)
        }
      } catch (e) {
        callback(e)
      }
    })
  })

  req.on('error', error => callback(error))

  if (opts.method === 'POST') {
    req.write(queries)
  }

  return req.end()
}

const soundcloud = {
  getConnectUrl(state) {
    const params = {
      client_id: config.get('clientID'),
      redirect_uri: config.get('callbackURL'),
      response_type: 'code',
      scope: 'non-expiring',
      state
    }
    return `${config.get('connectURL')}?${qs.stringify(params)}`
  },

  authorize(state, code, callback = () => {}) {
    const options = {
      hostname: config.get('hostname'),
      endpoint: '/oauth2/token',
      method: 'POST',
      params: {
        client_id: config.get('clientID'),
        client_secret: config.get('clientSecret'),
        grant_type: 'authorization_code',
        redirect_uri: config.get('callbackURL'),
        code
      }
    }
    return callApi(options,
      (err, res) => {
        if (err) {
          return callback(err)
        }
        if (!res.access_token) {
          return callback({ message: 'Could not retrieve access token' })
        }

        return callback(undefined, {
          access_token: res.access_token,
          state
        })
      })
  }
}

export default soundcloud
