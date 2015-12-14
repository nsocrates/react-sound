'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

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
		const body = document.body;

		if (this.state.isVisible) {
			body.style.overflow = '';
		} else {
			body.style.overflow = 'hidden';
		}
	},

	render: function() {
		const slider = classNames('oc-slider', this.props.className, {
			'slide': this.state.isVisible
		});
		const overlay = classNames('oc-overlay', this.props.className, {
			'slide': this.state.isVisible
		});
		return (
			<div className="oc-menu">
				<div onClick={this.toggleMenu} className={overlay}></div>
				<div className={slider}>
					{this.props.children}
				</div>
			</div>
		);
	}
});
