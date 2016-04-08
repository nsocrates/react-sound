import deferred from '../deferred'
import dialogStore from './store'
import popup from './popup'
import { AUTH_ROUTE } from 'constants/ApiConstants'
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
      const url = constructUrl(AUTH_ROUTE, this.query)

      this.popup = popup.open(url, this.width, this.height)
      dialogStore.set(this.id, this)

      return this.deferred.promise
    },

    handleConnectResponse(response) {
      const hasError = response.error
      if (hasError) {
        this.deferred.reject(response)
      } else {
        this.deferred.resolve(response)
      }

      this.popup.close()
    }
  }
}
