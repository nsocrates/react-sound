import events from 'events'

export const GLOBAL_EVENTS = new events.EventEmitter()

const body = document.body

function hideBodyOverflow(shouldHide) {
  body.style.overflow = shouldHide ? 'hidden' : ''
}

GLOBAL_EVENTS
  .on('hideBodyOverflow', hideBodyOverflow)
