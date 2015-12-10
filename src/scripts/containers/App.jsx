'use strict';

import React from 'react';

import HeaderContainer from './HeaderContainer';
import NavContainer from './NavContainer';
import MainContainer from './MainContainer';

export default React.createClass({
	render: function() {
		return (
			<div>
				<HeaderContainer />
				<NavContainer />
				<MainContainer />
			</div>
		);
	}
});
