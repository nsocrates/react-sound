import React from 'react'
import Nav from 'components/Nav'
import SearchModal from 'components/SearchModal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { toggleMenu } from 'actions/sideMenu'

class NavContainer extends React.Component {

  componentWillMount() {
    const { actions, genre } = this.props
    actions.loadGenre(genre)
  }

  render() {
    const { actions } = this.props
    return (
      <Nav
        { ...this.props }
        genreList={ GENRES }
      >
        <SearchModal actions={ actions }/>
      </Nav>
    )
  }
}

NavContainer.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genre: React.PropTypes.string.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ loadGenre, toggleMenu, loadSearch }, dispatch)
  }
}

function mapStateToProps(state) {
  const { requested, sideMenu } = state.app

  return {
    isVisible: sideMenu.isVisible,
    genre: requested
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
