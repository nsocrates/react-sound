'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toggleMenu} from '../actions/sideMenu';
import Nav from '../components/Nav';

const NavContainer = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		const { dispatch } = this.props;

		return (
			<Nav
				{ ...this.props }
				onToggleMenu={toggle =>
					dispatch(toggleMenu(toggle))
				}
			/>
		);
	}
});

function mapStateToProps(state) {
	return { sideMenu: state.sideMenu }
}

export default connect(mapStateToProps)(NavContainer);
