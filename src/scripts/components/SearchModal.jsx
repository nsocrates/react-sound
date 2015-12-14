'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			isOpen: false
		};
	},

	listenForClose: function(e) {
		e = e || window.event;

		if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
			this.toggleSearch();
		}
	},

	toggleSearch: function() {
		const mSearchBar = document.getElementById('m-searchbar');
		const body = document.body;
		let open = !this.state.isOpen;
		this.setState({ isOpen: open });
		body.classList.toggle('m-open');
		mSearchBar.focus();
	},

	componentDidMount: function() {
		window.onkeydown = this.listenForClose;
	},

	render: function() {
		return (
			<div className="m-search">
				<div className="m-control">
					<div className="m-modal" onClick={ this.toggleSearch } ></div>
					<i className="fa fa-search" onClick={ this.toggleSearch } ></i>
					<i className="fa fa-times" onClick={ this.toggleSearch } ></i>
				</div>
				<form className="form-group">
					<input id="m-searchbar" className="m-searchbar" type="text" placeholder="Looking for something...?" />
					<label><h5>Click anywhere to close (esc)</h5></label>
				</form>
			</div>
		);
	}
});
