import * as uiActionCreators from 'actions/ui'
import Nav from 'components/Nav'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'

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

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch)
  }
}

function mapStateToProps(state) {
  const { searchModal, navbar } = state.app.ui
  return {
    navbar,
    searchModal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
