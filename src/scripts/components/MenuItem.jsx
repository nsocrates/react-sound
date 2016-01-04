import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

export default class MenuItem extends React.Component {

	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		event.preventDefault()
		this.props.onChange(this.props.index)
	}

	render() {
		const active = classNames({ 'active': this.props.isActive })

		return (
			<li className={ this.props.listClass }>
				<Link
					className={ active }
					onClick={ this.handleClick }
					to={ `/genre/${this.props.genre}` }
				>
					{ this.props.children }
				</Link>
{/*				<a
					className={ active }
					href={ this.props.link }
					onClick={ this.handleClick }
				>
					{ this.props.children }
				</a>*/}
			</li>
		)
	}
}

MenuItem.propTypes = {
	children: React.PropTypes.node,
	genre: React.PropTypes.string,
	index: React.PropTypes.number,
	isActive: React.PropTypes.bool,
	listClass: React.PropTypes.string,
	onChange: React.PropTypes.func
}
