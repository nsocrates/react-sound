import React from 'react'
import { connect } from 'react-redux'
import { toggleMenu } from '../actions/sideMenu'

class SlideMenuContainer extends React.Component {

	render() {
		const { dispatch } = this.props
		const handleState = () => dispatch(toggleMenu())

		return (
			<Menu
				{ ...this.props }
				onToggleMenu={ handleState }
			/>
		)
	}
}

function mapStateToProps(state) {
	return { isVisible: state.app.sideMenu }
}

export default connect(mapStateToProps)(SlideMenuContainer)

OffCanvasContainer.propTypes = {
	dispatch: React.PropTypes.func
}
