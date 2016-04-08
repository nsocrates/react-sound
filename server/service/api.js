import https from 'https'
import qs from 'query-string'
import config from './config'

function sendRequest(opts, callback) {
  let body = ''

  const { hostname, endpoint, method, params } = opts
  const queries = qs.stringify(params)
  const path = `${endpoint}?${queries}`
  const options = {
    hostname,
    path,
    method
  }

  if (method === 'POST') {
    options.path = endpoint
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': queries.length
    }
  }

  const req = https.request(options, response => {
    response.on('data', chunk => (body += chunk))
    response.on('end', () => {
      try {
        const data = JSON.parse(body)
        if (Number(response.statusCode) >= 400) {
          callback(data.errors, data)
        } else {
          callback(undefined, data)
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

function callApi(method, endpoint, _params, _callback = () => {}) {
  let params = _params
  let callback = _callback

  if (typeof params === 'function') {
    callback = params
    params = {}
  }

  if (method === 'PUT' || method === 'DELETE') {
    params.oauth_token = config.get('accessToken')
  }

  params.client_id = config.get('clientID')
  params.format = 'json'

  return sendRequest({
    method,
    hostname: config.get('hostname'),
    endpoint,
    params
  }, callback)
}

const soundcloud = {
  setToken(token) {
    return config.set('accessToken', token)
  },

  flush() {
    return config.flush()
  },

  getConnectUrl(state) {
    const params = {
      client_id: config.get('clientID'),
      redirect_uri: config.get('callbackURL'),
      response_type: 'code',
      scope: 'non-expiring',
      display: 'popup',
      state
    }
    return `${config.get('connectURL')}?${qs.stringify(params)}`
  },

  authorize(state, code, callback = () => {}) {
    const accessToken = config.get('accessToken')
    if (accessToken) {
      return callback(null, {
        access_token: accessToken,
        state
      })
    }

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
    return sendRequest(options,
      (err, res) => {
        if (err) return callback(err)
        this.setToken(res.access_token)
        return callback(null, {
          access_token: res.access_token,
          state
        })
      })
  },

  get(endpoint, params, callback) {
    return callApi('GET', endpoint, params, callback)
  },

  getMe(callback) {
    return this.get('/me', {
      oauth_token: config.get('accessToken')
    }, callback)
  }
}

export default soundcloud
