import React from 'react'
import Nav from '../components/Nav'
import { connect } from 'react-redux'
import { loadGenre } from '../actions/genre'
import { toggleMenu } from '../actions/sideMenu'

class NavContainer extends React.Component {

  render() {
    const { dispatch } = this.props
    const handleState = () => dispatch(toggleMenu())
    const handleRequest = genre => dispatch(loadGenre(genre))

    return (
      <Nav
        { ...this.props }
        onLoadGenre={ handleRequest }
        onToggleMenu={ handleState }
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    genre: state.app.requested,
    isVisible: state.app.sideMenu
  }
}

NavContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  genre: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps)(NavContainer)
