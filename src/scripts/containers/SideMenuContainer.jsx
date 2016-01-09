import React from 'react'
import Menu from 'components/SideMenu'
import { connect } from 'react-redux'
import { loadGenre } from 'actions/genre'
import { toggleMenu } from 'actions/sideMenu'
import { GENRES } from 'constants/ItemLists'

class SideMenuContainer extends React.Component {

  render() {
    const handleLoadGenre = genre => this.props.loadGenre(genre)
    const handleToggleMenu = () => this.props.toggleMenu()
    const { genre, isVisible } = this.props

    return (
      <Menu
        genre={ genre }
        genreList={ GENRES }
        isVisible={ isVisible }
        onLoadGenre={ handleLoadGenre }
        onToggleMenu={ handleToggleMenu }
      />
    )
  }
}

SideMenuContainer.propTypes = {
  genre: React.PropTypes.string.isRequired,
  isVisible: React.PropTypes.bool.isRequired,
  loadGenre: React.PropTypes.func.isRequired,
  toggleMenu: React.PropTypes.func.isRequired
}

const mapDispatchToProps = {
  loadGenre,
  toggleMenu
}

function mapStateToProps(state) {
  const { requested, sideMenu } = state.app

  return {
    isVisible: sideMenu.isVisible,
    genre: requested
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer)
