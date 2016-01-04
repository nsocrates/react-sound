import React from 'react'
import ReactDOM from 'react-dom'
import makeStore from './store/store'
import { Provider } from 'react-redux'
import { routes } from './routes'

require('../stylesheets/main.scss')

import { loadPlaylist } from './actions/playlist'
import { loadGenre } from './actions/genre'
import { loadTrack } from './actions/track'
import { loadUser } from './actions/user'

export const store = makeStore()

store.dispatch(loadPlaylist('405726')).then(() => console.log(store.getState()))
// store.dispatch(loadGenre('house')).then(() => console.log(store.getState()))
// store.dispatch(loadTrack('13158665')).then(() => console.log(store.getState()))
// store.dispatch(loadUser('3207')).then(() => console.log(store.getState()))

ReactDOM.render(
	<Provider store={ store }>
		{ routes }
	</Provider>,
	document.getElementById('app')
)
