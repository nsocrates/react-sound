export function getUserLocation(city, country) {
  if (city || country) {
    return city && country
      ? `${city}, ${country}`
      : country || city
  }

  return 'Unspecified'
}

export function generateUid(prefix) {
  return [prefix, Math.ceil(Math.random() * 1000000).toString(16)].join('_')
}

export const lStorage = {
  setObj(key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
  },

  getObj(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}
