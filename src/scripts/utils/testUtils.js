export function tStorage() {
  const tmp = '__tmp'
  try {
    localStorage.setItem(tmp, tmp)
    localStorage.removeItem(tmp)
    return true
  } catch (e) {
    return false
  }
}

export function tCookies() {
  try {
    document.cookie = '__tmp=1'
    const ret = document.cookie.indexOf('__tmp') !== -1
    return !!ret
  } catch (e) {
    return false
  }
}
