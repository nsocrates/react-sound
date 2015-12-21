'use strict';

import React from 'react';

export default class SideMenuItem extends React.Component {

	render() {
		return (
			<a
				className="oc-item"
				href="#"
			>
				{ this.props.children }
			</a>
		);
	}
}

SideMenuItem.propTypes = {
	children: React.PropTypes.node
}
