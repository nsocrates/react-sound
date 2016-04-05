const popup = {
  open(url, width, height) {
    const opts = {
      width,
      height,
      location: 'yes',
      left: window.screenX + (window.outerWidth - width) / 2,
      top: window.screenY + (window.outerHeight - height) / 2,
      toolbar: 'no',
      scrollbars: 'yes'
    }

    const stringOptions = Object.keys(opts)
      .map(key => `${key}=${opts[key]}`).join(', ')

    return window.open(url, opts.name, stringOptions)
  }
}

export default popup
