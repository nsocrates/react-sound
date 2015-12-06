import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

// Load main stylesheet
require('../stylesheets/main.scss');

// Render the main component into the dom
ReactDOM.render(
	<App />,
	document.getElementById('app')
);
