// Renders off-canvas menu & toggles visibility

'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			isVisible: false
		};
	},

	toggleMenu: function() {
		let visible = !this.state.isVisible;
		this.setState({ isVisible: visible });
		this.setOverflow();
	},

	setOverflow: function() {
		if (this.state.isVisible) {
			document.body.style.overflow = '';
		} else {
			document.body.style.overflow = 'hidden';
		}
	},

	render: function() {
		return (
			<div className="oc-menu">
				<div onClick={this.toggleMenu} className={(this.state.isVisible ? 'visible ' : '') + 'oc-overlay'}></div>
				<div className={(this.state.isVisible ? 'visible ' : '') + 'oc-slider'}>
					{this.props.children}
				</div>
			</div>
		);
	}
});
