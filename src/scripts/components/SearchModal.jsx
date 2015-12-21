import React from 'react';

export default class SearchModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isOpen: false }
		this.listenForClose = this.listenForClose.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	componentDidMount() {
		window.onkeydown = this.listenForClose;
	}

	listenForClose(e) {
		e = e || window.event;

		if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
			this.handleToggle();
		}
	}

	handleToggle() {
		const mSearchBar = document.getElementById('m-searchbar');
		const body = document.body;
		const open = !this.state.isOpen;
		this.setState({ isOpen: open });
		body.classList.toggle('m-open');
		mSearchBar.focus();
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
		);
	}
}
