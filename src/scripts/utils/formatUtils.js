import { FORMAT, FALLBACK } from 'constants/ImageConstants'

export function formatCover(url) {
  const cover = url || ''
  if (!cover || cover.indexOf('default_avatar_large.png') !== -1) {
    return {
      xLarge: FALLBACK.AVATAR.LARGE,
      large: FALLBACK.AVATAR.LARGE,
      default: FALLBACK.AVATAR.LARGE,
      badge: FALLBACK.AVATAR.SMALL
    }
  }

  return {
    xLarge: cover.replace(/large/, FORMAT.XLARGE),
    large: cover.replace(/large/, FORMAT.LARGE),
    default: cover,
    badge: cover.replace(/large/, FORMAT.BADGE)
  }
}

export function kFormatter(number) {
  return number > 999 ? `${Number((number / 1000).toFixed(1))}k` : number
}

export function markNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function dtFormatter(timestamp) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const dt = new Date(timestamp)
  return `${monthNames[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
}
