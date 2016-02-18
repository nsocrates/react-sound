import events from 'events'

const GlobalEvents = new events.EventEmitter()

function hideBodyOverflow(shouldHide) {
  const body = document.body
  body.style.overflow = shouldHide ? 'hidden' : ''
}

function pushBottom(shouldPush) {
  return null
  // const main = document.getElementById('main')
  // main.style.marginBottom = shouldPush ? '6rem' : ''
}

GlobalEvents
  .on('hideBodyOverflow', hideBodyOverflow)
  .on('pushBottom', pushBottom)

export default GlobalEvents
