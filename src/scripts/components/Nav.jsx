'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SearchModal from './SearchModal';
import {GENRES} from '../constants/ItemLists';

export default React.createClass({
	mixins: [PureRenderMixin],

	handleClick: function() {
		this.props.onToggleMenu();
	},

	getItems: function() {
		return GENRES.map((item, index) => {
			return (
				<li key={ index } className="genre"><a href="#">{ item }</a></li>
			);
		});
	},

	render: function() {
		return (
			<nav className="nav-bar">
				<div className="container">
					<ul className="nav-section">
						{ this.getItems() }
					</ul>
					<ul className="nav-section">
						<li className="bars">
							<a onClick={ this.handleClick } href="#"><i className="fa fa-bars"></i></a>
						</li>
					</ul>
					<ul className="nav-search">
						<li className="search">
							<form className="form-group">
								<input className="searchbar" type="text" placeholder="Looking for something...?" />
								<span className="focus-bar"></span>
								<i className="fa fa-search"></i>
							</form>
						</li>
					</ul>
					<SearchModal { ...this.props } />
				</div>
			</nav>
		);
	}
});
