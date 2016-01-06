import React from 'react'
import ReactDOM from 'react-dom'
import makeStore from 'stores/store'
import { Provider } from 'react-redux'
import { routes } from 'routes/routes'

require('stylesheets/main.scss')

// import { loadPlaylist } from './actions/playlist'
// import { loadGenre } from './actions/genre'
// import { loadTrack } from './actions/track'
// import { loadUser } from './actions/user'

// store.dispatch(loadPlaylist('405726')).then(() => console.log(store.getState()))
// store.dispatch(loadGenre('house')).then(() => console.log(store.getState()))
// store.dispatch(loadTrack('13158665')).then(() => console.log(store.getState()))
// store.dispatch(loadUser('3207')).then(() => console.log(store.getState()))

export const store = makeStore()

ReactDOM.render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('app')
)
