'use strict';

import React from 'react';
import MenuItem from './MenuItem';
import SearchModal from './SearchModal';
import {GENRES} from '../constants/ItemLists';

export default class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.state = { activeItem: null };
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(index) {
		this.setState({ activeItem: index });
	}

	handleClick() {
		this.props.onToggleMenu();
	}

	render() {
		const menuItems = GENRES.map((item, index) =>
			<MenuItem
				index={ index }
				isActive={ this.state.activeItem === index }
				key={ index }
				listClass="genre"
				onChange={ this.handleChange }
			>
				{ item }
			</MenuItem>
		);

		return (
			<nav className="nav-bar">
				<div className="container">
					<ul className="nav-section">
						{ menuItems }
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
