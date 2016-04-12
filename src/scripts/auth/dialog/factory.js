import deferred from '../deferred'
import dialogStore from './store'
import popup from './popup'
import { AUTH_BASE } from 'constants/Auth'
import { constructUrl } from 'utils/urlUtils'

export default function dialogFactory() {
  const ID_PREFIX = 'Dialog_'
  const generateId = () => (
    [ID_PREFIX, Math.ceil(Math.random() * 1000000).toString(16)].join('_'))

  const id = generateId()

  return {
    id,
    query: { state: id },
    width: 456,
    height: 510,
    deferred: deferred(),

    open() {
      const url = constructUrl(AUTH_BASE, this.query)
      this.popup = popup.open(url, this.width, this.height)
      dialogStore.set(this.id, this)

      this.listenForClose()
      return this.deferred.promise
    },

    listenForClose() {
      if (this.popup.closed && this.popup.location.pathname !== '/callback') {
        return this.handleConnectResponse({
          error: 'Access denied',
          error_description: 'The end user closed the popup.'
        })
      }
      return setTimeout(() => {
        this.listenForClose(this.popup)
      }, 1)
    },

    handleConnectResponse(response) {
      const hasError = response.error || response.error_description
      if (hasError) {
        this.deferred.reject(response)
      } else {
        this.deferred.resolve(response)
      }

      return this.popup.close()
    }
  }
}
