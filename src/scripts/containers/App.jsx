'use strict';

import React from 'react';

import HeaderContainer from './HeaderContainer';
import NavContainer from './NavContainer';
import MainContainer from './MainContainer';
import SideMenuContainer from './SideMenuContainer';

export default React.createClass({
	render: function() {
		return (
			<div>
				<SideMenuContainer />
				<HeaderContainer />
				<NavContainer />
				<MainContainer />
			</div>
		);
	}
});
