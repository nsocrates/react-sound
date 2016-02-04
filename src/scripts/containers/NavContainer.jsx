import * as uiActionCreators from 'actions/ui'
import Nav from 'components/Nav'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { push } from 'react-router-redux'

class NavContainer extends React.Component {
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
  apiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genre: React.PropTypes.string,
  navbar: React.PropTypes.shape({
    isSticky: React.PropTypes.bool.isRequired
  })
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch),
    apiActions: bindActionCreators({
      loadGenre,
      loadSearch
    }, dispatch),
    routeActions: bindActionCreators({ push }, dispatch)
  }
}

function mapStateToProps(state) {
  const { requested, ui: { sideMenu, searchModal, navbar }} = state.app

  return {
    navbar,
    searchModal,
    sideMenu,
    genre: requested
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
