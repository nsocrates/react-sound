'use strict';

import React from 'react';

import HeaderContainer from './HeaderContainer';
import NavContainer from './NavContainer';

export default React.createClass({
	render: function() {
		return (
			<div>
				<HeaderContainer />
				<NavContainer />
			</div>
		);
	}
});
