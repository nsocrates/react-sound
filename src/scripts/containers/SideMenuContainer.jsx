import React from 'react'
import Menu from 'components/SideMenu'
import { connect } from 'react-redux'
import { loadGenre } from 'actions/genre'
import { toggleMenu } from 'actions/sideMenu'

class SideMenuContainer extends React.Component {

  render() {
    const { dispatch } = this.props
    const handleState = () => dispatch(toggleMenu())
    const handleRequest = genre => dispatch(loadGenre(genre))

    return (
      <Menu
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

SideMenuContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  genre: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps)(SideMenuContainer)
