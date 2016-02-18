import events from 'events'

const GlobalEvents = new events.EventEmitter()

function hideBodyOverflow(shouldHide) {
  const body = document.body
  body.style.overflow = shouldHide ? 'hidden' : ''
}

GlobalEvents
  .on('hideBodyOverflow', hideBodyOverflow)

export default GlobalEvents
