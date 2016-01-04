import React from 'react'
import { connect } from 'react-redux'
import { toggleMenu } from '../actions/sideMenu'
import Menu from '../components/SideMenu'

class OffCanvasContainer extends React.Component {

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

export default connect(mapStateToProps)(OffCanvasContainer)

OffCanvasContainer.propTypes = {
	dispatch: React.PropTypes.func
}
