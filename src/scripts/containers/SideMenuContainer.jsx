import Menu from 'components/SideMenu'
import Overlay from 'components/Overlay'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GENRES } from 'constants/ItemLists'
import { push } from 'react-router-redux'
import { toggleMenu } from 'actions/ui'

class SideMenuContainer extends React.Component {

  render() {
    const { actions, isVisible } = this.props
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
            onOverlayClick={ actions.toggleMenu}
          />
          <Menu
            { ...this.props }
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
}

SideMenuContainer.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  isVisible: React.PropTypes.bool.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleMenu, push }, dispatch)
  }
}

function mapStateToProps(state) {
  const { requested, ui: { sideMenu: { isVisible }}} = state.app

  return {
    isVisible,
    requested
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer)
