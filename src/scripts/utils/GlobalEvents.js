import events from 'events'

const GlobalEvents = new events.EventEmitter()

function hideBodyOverflow(shouldHide) {
  const body = document.body
  body.style.overflow = shouldHide ? 'hidden' : ''
}

function padBottom(shouldPad) {
  const main = document.getElementById('main')
  main.style.marginBottom = shouldPad ? '6rem' : ''
}

GlobalEvents
  .on('hideBodyOverflow', hideBodyOverflow)
  .on('padBottom', padBottom)

export default GlobalEvents
