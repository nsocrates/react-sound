'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			isTransformed: false
		};
	},

	toggleSearch: function() {
		let transformed = !this.state.isTransformed;
		this.setState({ isTransformed: transformed });
		document.body.classList.toggle('body-overflow');
	},

	render: function() {
		return (
			<div className="control" onClick={this.toggleSearch} >
				<div className="modal"></div>
				<i className="fa fa-search"></i>
			</div>
		);
	}
});
