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
		const mSearchBar = document.getElementById('m-searchbar');
		let transformed = !this.state.isTransformed;
		this.setState({ isTransformed: transformed });
		mSearchBar.focus();
		document.body.classList.toggle('body-overflow');
	},

	render: function() {
		return (
			<div className="m-search">
				<div className="m-control">
					<div className="m-modal" onClick={this.toggleSearch} ></div>
					<i className="fa fa-search" onClick={this.toggleSearch} ></i>
					<i className="fa fa-times" onClick={this.toggleSearch} ></i>
				</div>
				<form className="form-group">
					<input id="m-searchbar" className="m-searchbar" type="text" placeholder="Looking for something...?" />
					<label><h5>Click anywhere to close (<i className="fa fa-times"></i>)</h5></label>
				</form>
			</div>
		);
	}
});
