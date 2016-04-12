import qs from 'query-string'
import dialogStore from './dialog/store'

const callback = {
  notifyDialog(location) {
    const searchParams = qs.parse(location.search)
    const hashParams = qs.parse(location.hash)
    const opts = {
      access_token: searchParams.access_token || hashParams.access_token,
      dialog_id: searchParams.state || hashParams.state,
      error: searchParams.error || hashParams.error,
      error_description: searchParams.error_description || hashParams.error_description,
      user_id: searchParams.user_id || hashParams.user_id
    }

    const dialog = dialogStore.get(opts.dialog_id)
    return !!dialog && dialog.handleConnectResponse(opts)
  }
}

export default callback
