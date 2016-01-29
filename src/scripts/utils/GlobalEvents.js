import events from 'events'

const GlobalEvents = new events.EventEmitter()

function hideBodyOverflow(shouldHide) {
  const body = document.body
  body.style.overflow = shouldHide ? 'hidden' : ''
}

function padBottom(shouldPad) {
  const main = document.getElementById('main')
  main.style.paddingBottom = shouldPad ? '7rem' : ''
}

GlobalEvents
  .on('hideBodyOverflow', hideBodyOverflow)
  .on('padBottom', padBottom)

export default GlobalEvents
