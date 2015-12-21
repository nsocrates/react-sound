'use strict';

import React from 'react';
import classNames from 'classnames';
import MenuItem from './SideMenuItem';
import {GENRES} from '../constants/ItemLists';

export default class SideMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props;
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(prevProps) {
		this.setState(prevProps);
		this.setOverflow();
	}

	getItems() {
		return GENRES.map((item, index) =>
			<MenuItem key={ index }>{ item }</MenuItem>
		);
	}

	handleClick() {
		this.props.onToggleMenu();
	}

	setOverflow() {
		const body = document.body;

		if (this.state.isVisible) {
			body.style.overflow = '';
		} else {
			body.style.overflow = 'hidden';
		}
	}

	render() {
		const overlay = classNames('oc-overlay', {
			'slide': this.state.isVisible
		});
		const slider = classNames('oc-menu', {
			'slide': this.state.isVisible
		});
		return (
			<div className="off-canvas-menu">
				<div
					className={ overlay }
					onClick={ this.handleClick }
				/>
				<div className={ slider }>
					<button
						className="oc-times"
						onClick={ this.handleClick }
					>
						<i className="fa fa-times" />
					</button>
					<div className="oc-item-container">
						{ this.getItems() }
					</div>
				</div>
			</div>
		);
	}
}

SideMenu.propTypes = {
	onToggleMenu: React.PropTypes.func
}
