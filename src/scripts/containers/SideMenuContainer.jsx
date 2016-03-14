import SideMenu from 'components/SideMenu'
import Overlay from 'components/Overlay'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { push } from 'react-router-redux'
import { toggleSideMenu } from 'actions/toggle'

function SideMenuContainer(props) {
  const { actions, isVisible } = props
  const ReactCSSTransitionNames = {
    enter: 'enter',
    leave: 'leave'
  }

  const shouldRenderMenuContainer = () => {
    if (isVisible) {
      return (
      <ReactCSSTransitionGroup
        className = "side-menu"
        component = "section"
        transitionEnterTimeout = { 500 }
        transitionLeaveTimeout = { 500 }
        transitionName = { ReactCSSTransitionNames }
      >
        <Overlay
          classNames="side-menu__overlay"
          onOverlayClick={ actions.toggleSideMenu}
        />
        <SideMenu
          { ...props }
          genreList={ GENRES }
        />
      </ReactCSSTransitionGroup>
      )
    }
    return (
      <ReactCSSTransitionGroup
        className = "side-menu"
        component = "section"
        transitionEnterTimeout = { 500 }
        transitionLeaveTimeout = { 500 }
        transitionName = { ReactCSSTransitionNames }
      />
    )
  }

  return shouldRenderMenuContainer()
}

SideMenuContainer.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  isVisible: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleSideMenu, push }, dispatch)
  }
}

function mapStateToProps(state) {
  const { isVisible } = state.app.ui.toggles.sideMenu

  return {
    isVisible
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer)
