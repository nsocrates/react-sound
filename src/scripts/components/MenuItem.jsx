// Renders menu items & handles click action

'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],

	navigate: function(hash) {
		window.location.hash = hash;
	},

	render: function() {
		return (
			<div className="oc-item" onClick={this.navigate.bind(this, this.props.hash)}>
				{this.props.children}
			</div>
		);
	}
});
