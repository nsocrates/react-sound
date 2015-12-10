'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import OCMenu from './OCMenu';
import SearchModal from './SearchModal'

export default React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<nav className="nav-bar">
				<div className="container">
					<ul className="nav-section">
						<li className="genre"><a href="#">Drum & Bass</a></li>
						<li className="genre"><a href="#">Electro</a></li>
						<li className="genre"><a href="#">Hardstyle</a></li>
						<li className="genre"><a href="#">House</a></li>
						<li className="genre"><a href="#">Techno</a></li>
						<li className="genre"><a href="#">Trance</a></li>
					</ul>
					<ul className="nav-section">
						<li className="bars">
							<OCMenu {...this.props} />
						</li>
					</ul>
					<ul className="nav-search">
						<li className="search">
							<SearchModal {...this.props} />
							<form className="form-group">
								<input className="searchbar" type="text" placeholder="Looking for something...?" />
								<span className="focus-bar"></span>
								<i className="fa fa-search"></i>
							</form>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
});
