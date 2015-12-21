'use strict';

import React from 'react';
import SearchModal from './SearchModal';
import {GENRES} from '../constants/ItemLists';

export default class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onToggleMenu();
	}

	getItems() {
		return GENRES.map((item, index) =>
			<li
				className="genre"
				key={ index }
			>
				<a href="#">{ item }</a>
			</li>
		);
	}

	render() {
		return (
			<nav className="nav-bar">
				<div className="container">
					<ul className="nav-section">
						{ this.getItems() }
					</ul>
					<ul className="nav-section">
						<li className="bars">
							<button onClick={ this.handleClick }>
								<i className="fa fa-bars" />
							</button>
						</li>
					</ul>
					<ul className="nav-search">
						<li className="search">
							<form className="form-group">
								<input
									className="searchbar"
									placeholder="Looking for something...?"
									type="text"
								/>
								<span className="focus-bar" />
								<i className="fa fa-search" />
							</form>
						</li>
					</ul>
					<SearchModal { ...this.props } />
				</div>
			</nav>
		);
	}
}

Nav.propTypes = {
	onToggleMenu: React.PropTypes.func
}
