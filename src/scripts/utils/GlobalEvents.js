import events from 'events'

const GlobalEvents = new events.EventEmitter()

function hideBodyOverflow(shouldHide) {
  const body = document.body
  return (body.style.overflow = shouldHide ? 'hidden' : '')
}

function blurBody(target, shouldBlur) {
  return shouldBlur ? target.classList.add('blur') : target.classList.remove('blur')
}

GlobalEvents
  .on('hideBodyOverflow', hideBodyOverflow)
  .on('blurBody', blurBody)

export default GlobalEvents
