import React from 'react'
import Menu from 'components/SideMenu'
import Overlay from 'components/SideMenuOverlay'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { loadGenre } from 'actions/genre'
import { toggleMenu } from 'actions/ui'

class SideMenuContainer extends React.Component {

  render() {
    const { actions, isVisible } = this.props
    const ReactCSSTransitionNames = {
      enter: 'enter',
      leave: 'leave'
    }
    const shouldRenderMenu = () => {
      if (isVisible) {
        return (
          <Menu
            { ...this.props }
            genreList={ GENRES }
          />
        )
      }
    }
    const shouldRenderOverlay = () => {
      if (isVisible) {
        return (
          <Overlay onOverlayClick={ actions.toggleMenu }/>
        )
      }
    }

    return (
      <ReactCSSTransitionGroup
        className="off-canvas-menu"
        component="section"
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionName={ ReactCSSTransitionNames }
      >
        { shouldRenderOverlay() }
        { shouldRenderMenu() }
      </ReactCSSTransitionGroup>
    )
  }
}

SideMenuContainer.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  isVisible: React.PropTypes.bool.isRequired
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
