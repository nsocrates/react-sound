import queryString from 'query-string'
import dialogStore from './dialog/store'

const callback = {
  notifyDialog(location) {
    const searchParams = queryString.parse(location.search)
    const hashParams = queryString.parse(location.hash)
    const opts = {
      oauth_token: searchParams.access_token || hashParams.access_token,
      dialog_id: searchParams.state || hashParams.state,
      error: searchParams.error || hashParams.error,
      error_description: searchParams.error_description || hashParams.error_description
    }

    const dialog = dialogStore.get(opts.dialog_id)
    return !!dialog && dialog.handleConnectResponse(opts)
  }
}

export default callback
