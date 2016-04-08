import config from './config'
import dialogFactory from './dialog/factory'
import { Promise } from 'es6-promise'

export default function connect() {
  const access_token = config.get('access_token')
  if (access_token) {
    return new Promise(resolve => { resolve({ access_token })})
  }

  const dialog = dialogFactory()

  const setOauthToken = options => (
    config.set('access_token', options.access_token))

  return dialog.open().then(res => setOauthToken(res))
}
