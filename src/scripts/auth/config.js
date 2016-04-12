const config = {
  accessToken: undefined,
  userId: undefined,
  state: {}
}

export default {
  get(key) {
    return config[key]
  },
  set(key, value) {
    return !!value && (config[key] = value)
  },
  remove(key) {
    return (config[key] = null)
  },
  expose() {
    return config
  }
}
