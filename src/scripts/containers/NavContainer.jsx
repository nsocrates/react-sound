import React from 'react'
import Nav from 'components/Nav'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { toggleMenu, toggleModal } from 'actions/ui'

class NavContainer extends React.Component {

  componentWillMount() {
    const { actions, genre } = this.props
    actions.loadGenre(genre)
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
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genre: React.PropTypes.string.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleMenu,
      toggleModal,
      loadGenre,
      loadSearch
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { requested, ui: { searchModal }} = state.app

  return {
    searchModal,
    genre: requested
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
