'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toggleMenu} from '../actions/sideMenu';
import Menu from '../components/SideMenu';

const OffCanvasContainer = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		const { dispatch } = this.props;

		return (
			<Menu
				{ ...this.props }
				onToggleMenu={ toggle =>
					dispatch(toggleMenu(toggle))
				}
			/>
		);
	}
});

function mapStateToProps(state) {
	return { sideMenu: state.sideMenu }
}

export default connect(mapStateToProps)(OffCanvasContainer);
