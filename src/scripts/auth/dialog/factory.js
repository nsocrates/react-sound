import deferred from '../deferred'
import dialogStore from './store'
import popup from './popup'
import { CONNECT } from 'constants/ApiConstants'
import { constructUrl } from 'utils/urlUtils'

export default function dialogFactory(opts) {
  const ID_PREFIX = 'Dialog_'

  const generateId = () => (
    [ID_PREFIX, Math.ceil(Math.random() * 1000000).toString(16)].join('_'))

  const id = generateId()

  return {
    id,
    opts: Object.assign({}, opts, { state: id }),
    width: 456,
    height: 510,
    deferred: deferred(),

    open() {
      const url = constructUrl(CONNECT, this.opts)
      this.popup = popup.open(url, this.width, this.height)
      dialogStore.set(this.id, this)

      return this.deferred.promise
    },

    handleConnectResponse(data) {
      const hasError = opts.error
      if (hasError) {
        this.deferred.reject(data)
      } else {
        this.deferred.resolve(data)
      }

      this.popup.close()
    }
  }
}
