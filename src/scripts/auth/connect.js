import config from './config'
import dialogFactory from './dialog/factory'
import authUser from './authUser'

export default function connect() {
  const access_token = config.get('accessToken')
  const user_id = config.get('userId')

  if (access_token && user_id) {
    return new Promise(resolve => resolve({ access_token, user_id }))
  }

  const dialog = dialogFactory()
  return dialog.open().then(res => authUser.set(res))
}
