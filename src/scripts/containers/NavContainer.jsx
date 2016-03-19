import React from 'react'
import Nav from 'components/Nav'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { push } from 'react-router-redux'
import { toggleSideMenu, toggleModal } from 'actions/toggle'

function NavContainer(props) {
  return (
    <Nav
      { ...props }
      genreList={ GENRES }
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    routeActions: bindActionCreators({ push }, dispatch),
    uiActions: bindActionCreators({ toggleSideMenu, toggleModal }, dispatch)
  }
}

function mapStateToProps(state) {
  const { searchModal, navbar } = state.app.ui.toggles
  return {
    navbar,
    searchModal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
