'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			visible: false
		};
	},

	show: function() {
		this.setState({ visible: true });
	},

	hide: function() {
		this.setState({ visible: false });
	},

	render: function() {
		return (
			<div className="menu">
				<div onClick={this.hide} className={(this.state.visible ? 'visible ' : '') + 'overlay'}></div>
				<div className={(this.state.visible ? 'visible ' : '') + 'slider'}>
					{this.props.children}
				</div>
			</div>
		);
	}
});
