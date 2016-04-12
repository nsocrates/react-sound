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

function processOptions(method, endpoint, _params, _callback = () => {}) {
  let params = _params
  let callback = _callback

  const requiresAuth = method === 'PUT' ||
                       method === 'DELETE' ||
                       endpoint.split('/').indexOf('me') !== -1

  if (typeof params === 'function') {
    callback = params
    params = {}
  }

  if (requiresAuth) {
    const accessToken = config.get('accessToken')
    params.oauth_token = accessToken

    if (!accessToken) {
      return callback({
        code: 401,
        message: 'Unauthorized'
      })
    }
  }

  params.client_id = config.get('clientID')
  params.format = 'json'

  return callApi({
    endpoint,
    hostname: config.get('hostname'),
    method,
    params
  }, callback)
}

const soundcloud = {
  setToken(token) {
    return config.set('accessToken', token)
  },

  setProfile(profile) {
    return config.set('profile', profile)
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

        this.setToken(res.access_token)
        return this.getMe((err2, me) => {
          if (err2) {
            return callback(err2)
          }

          this.setProfile(me)
          return callback(undefined, {
            access_token: res.access_token,
            user_id: me.id,
            state
          })
        })
      })
  },

  get(endpoint, params, callback) {
    return processOptions('GET', endpoint, params, callback)
  },

  put(endpoint, params, callback) {
    return processOptions('PUT', endpoint, params, callback)
  },

  delete(endpoint, params, callback) {
    return processOptions('DELETE', endpoint, params, callback)
  },

  getMe(callback) {
    const { accessToken, profile } = config.getMe()

    if (accessToken && Object.keys(profile).length) {
      return callback(undefined, profile)
    }

    return accessToken
      ? this.get('/me', {
        oauth_token: accessToken
      }, callback)
      : callback({
        code: 401,
        message: 'Unauthorized'
      })
  }
}

export default soundcloud
