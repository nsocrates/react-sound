'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleMenu} from '../actions/sideMenu';
import Nav from '../components/Nav';

class NavContainer extends React.Component {

	render() {
		const { dispatch } = this.props;
		const handleState = (toggle) => dispatch(toggleMenu(toggle));

		return (
			<Nav
				{ ...this.props }
				onToggleMenu={ handleState }
			/>
		);
	}
}

function mapStateToProps(state) {
	return { isVisible: state.sideMenu }
}

export default connect(mapStateToProps)(NavContainer);

NavContainer.propTypes = {
	dispatch: React.PropTypes.func
}
