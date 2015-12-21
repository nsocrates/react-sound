import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import makeStore from './store/store';

// Load main stylesheet
require('../stylesheets/main.scss');

export const store = makeStore();

// Render the main component into the dom
ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('app')
);
