import React from 'react'
import Menu from 'components/SideMenu'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadGenre } from 'actions/genre'
import { toggleMenu } from 'actions/ui'
import { GENRES } from 'constants/ItemLists'

class SideMenuContainer extends React.Component {
  render() {
    return (
      <Menu
        { ...this.props }
        genreList={ GENRES }
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ loadGenre, toggleMenu }, dispatch)
  }
}

function mapStateToProps(state) {
  const { requested, ui: { sideMenu: { isVisible }}} = state.app

  return {
    isVisible,
    genre: requested
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer)
