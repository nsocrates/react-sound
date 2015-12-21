'use strict';

import React from 'react';
import classNames from 'classnames';

export default class MenuItem extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		this.props.onChange(this.props.index);
	}

	render() {
		const active = classNames({ 'active': this.props.isActive });
		return (
			<li className={ this.props.listClass }>
				<a
					className={ active }
					href="#"
					onClick={ this.handleClick }
				>
					{ this.props.children }
				</a>
			</li>
		)
	}
}

MenuItem.propTypes = {
	children: React.PropTypes.node,
	index: React.PropTypes.number,
	isActive: React.PropTypes.bool,
	listClass: React.PropTypes.string,
	onChange: React.PropTypes.func
}
