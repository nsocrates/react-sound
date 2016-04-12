import Cookies from 'js-cookie'
import config from './config'
import runTests from './runTests'

const authUser = {
  set(data) {
    runTests()
    const { accessToken, userId } = data
    const state = config.get('state')

    config.set('accessToken', accessToken)
    config.set('userId', userId)

    if (state.localStorage) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('userId', userId)
    } else if (state.cookies) {
      Cookies.set('me', { accessToken, userId })
    }

    return data
  },

  destroy() {
    runTests()
    const state = config.get('state')

    if (state.localStorage) {
      localStorage.clear()
    }
    if (state.cookies) {
      Cookies.remove('me')
    }

    config.remove('accessToken')
    config.remove('userId')
  }
}

export default authUser
