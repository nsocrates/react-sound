import config from './config'
import dialogFactory from './dialog/factory'
import { Promise } from 'es6-promise'

export default function connect(opts = {}) {
  const oauth_token = config.get('oauth_token')
  if (oauth_token) {
    return new Promise(resolve => { resolve({ oauth_token })})
  }

  const dialogOptions = {
    client_id: config.get('client_id'),
    redirect_uri: config.get('redirect_uri'),
    response_type: 'code_and_token',
    scope: opts.scope || 'non-expiring',
    display: 'popup'
  }
  if (!dialogOptions.client_id || !dialogOptions.redirect_uri) {
    throw new Error('Options client_id and redirect_uri must be passed');
  }
  const dialog = dialogFactory(dialogOptions)

  const setOauthToken = options => config.set('oauth_token', options.oauth_token)

  return dialog.open().then(res => setOauthToken(res))
}
