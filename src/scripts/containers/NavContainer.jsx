import React from 'react'
import Nav from 'components/Nav'
import { connect } from 'react-redux'
import { loadGenre } from 'actions/genre'
import { toggleMenu } from 'actions/sideMenu'
import { GENRES } from 'constants/ItemLists'

class NavContainer extends React.Component {

  componentWillMount() {
    const { genre } = this.props
    this.props.loadGenre(genre)
  }

  render() {
    return (
      <Nav
        { ...this.props }
        genreList={ GENRES }
      />
    )
  }
}

NavContainer.propTypes = {
  genre: React.PropTypes.string.isRequired,
  loadGenre: React.PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
