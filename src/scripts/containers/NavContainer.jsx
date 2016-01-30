import * as uiActionCreators from 'actions/ui'
import Nav from 'components/Nav'
import React from 'react'
import Waypoint from 'components/Waypoint'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'

class NavContainer extends React.Component {

  componentWillMount() {
    const { apiActions, genre } = this.props
    apiActions.loadGenre(genre)
  }

  render() {
    const { uiActions } = this.props

    return (
      <Nav
        { ...this.props }
        genreList={ GENRES }
      >
        <Waypoint
          onEnter={ uiActions.triggerSticky }
          onLeave={ uiActions.triggerSticky }
        />
      </Nav>
    )
  }
}

NavContainer.propTypes = {
  apiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genre: React.PropTypes.string.isRequired,
  navbar: React.PropTypes.shape({
    isSticky: React.PropTypes.bool.isRequired
  }),
  uiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch),
    apiActions: bindActionCreators({
      loadGenre,
      loadSearch
    }, dispatch)
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
