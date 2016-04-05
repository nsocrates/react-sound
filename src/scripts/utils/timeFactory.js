export default function timeFactory(seconds) {
  return {
    getHours() {
      const hh = `0${Math.floor(seconds / 3600)}`
      return hh.substr(-2)
    },
    getMinutes() {
      const mm = `0${Math.floor((seconds % 3600) / 60)}`
      return mm.substr(-2)
    },
    getSeconds() {
      const ss = `0${Math.floor(seconds % 60)}`
      return ss.substr(-2)
    },
    getFormatted() {
      const hh = this.getHours()
      const mm = this.getMinutes()
      const ss = this.getSeconds()
      const hasHours = parseInt(hh, 10) ? `${hh}:` : ''

      return `${hasHours}${mm}:${ss}`
    },
    getShorthand() {
      const hh = Math.floor(seconds / 3600)
      const mm = Math.floor((seconds % 3600) / 60)
      const ss = Math.floor(seconds % 60)

      if (hh) {
        return `${hh}h`
      } else if (mm) {
        return `${mm}m`
      } else if (ss) {
        return `${ss}s`
      }

      return `${seconds}ss`
    }
  }
}
