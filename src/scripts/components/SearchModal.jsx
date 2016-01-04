import React from 'react'
import { GLOBAL_EVENTS } from '../constants/GlobalEvents'

export default class SearchModal extends React.Component {

	constructor(props) {
		super(props)
		this.state = { isOpen: false }
		this.listenForClose = this.listenForClose.bind(this)
		this.handleToggle = this.handleToggle.bind(this)
	}

	componentDidUpdate() {
		if (this.state.isOpen) window.onkeydown = this.listenForClose
		else window.onkeydown = null
	}

	listenForClose(e) {
		e = e || window.event

		if (e.key === 'Escape' || e.keyCode === 27) {
			this.handleToggle()
		}
	}

	handleToggle() {
		const open = !this.state.isOpen
		this.setState({ isOpen: open })
		this.emitState(open)
	}

	emitState(state) {
		GLOBAL_EVENTS.emit('searchModal', state)
	}

	render() {
		return (
			<div className="m-search">
				<div className="m-controller">
					<span
						className="m-modal"
						onClick={ this.handleToggle }
					/>
					<button
						className="m-btn-search"
						onClick={ this.handleToggle }
					>
						<i className="fa fa-search" />
					</button>
					<button
						className="m-btn-times"
						onClick={ this.handleToggle }
					>
						<i className="fa fa-times" />
					</button>
				</div>
				<form className="form-group">
					<input
						className="m-searchbar"
						id="m-searchbar"
						placeholder="Looking for something...?"
						type="text"
					/>
					<label><h5>{ "Click anywhere to close (esc)" }</h5></label>
				</form>
			</div>
		)
	}
}
