import React from 'react'
import LinkItem from './LinkItem'

export default class SideMenu extends React.Component {

  componentWillMount() {
    return this.hideBodyOverflow(true)
  }

  componentWillUnmount() {
    return this.hideBodyOverflow(false)
  }

  hideBodyOverflow(shouldHide) {
    const body = document.body
    return (body.style.overflow = shouldHide ? 'hidden' : '')
  }

  render() {
    const { actions, genreList } = this.props

    const menuItems = genreList.map(item => {
      const locationDescriptor = {
        pathname: '/genre',
        query: {
          q: item
        }
      }

      return (
        <LinkItem
          activeClassName="side-menu__list--item--active"
          className="side-menu__list--item"
          key={ item }
          to={ locationDescriptor }
        >
          { item }
        </LinkItem>
      )
    })

    return (
      <nav
        className="side-menu__nav"
      >
        <button
          className="side-menu__btn"
          onClick={ actions.toggleSideMenu }
        >
          <i className="fa fa-times" />
        </button>
        <div className="side-menu__list">
          { menuItems }
        </div>
      </nav>
    )
  }
}

SideMenu.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  isVisible: React.PropTypes.bool.isRequired
}
