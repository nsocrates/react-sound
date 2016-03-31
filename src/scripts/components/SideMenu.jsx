import React from 'react'
import classNames from 'classnames'
import GlobalEvents from 'utils/GlobalEvents'
import LinkItem from './LinkItem'

export default class SideMenu extends React.Component {

  componentWillMount() {
    GlobalEvents.emit('hideBodyOverflow', true)
  }

  componentWillUnmount() {
    GlobalEvents.emit('hideBodyOverflow', false)
  }

  render() {
    const { actions, location, genreList } = this.props

    const menuItems = genreList.map(item => {
      const locationDescriptor = {
        pathname: '#genre',
        query: {
          q: item
        }
      }

      const active = classNames('side-menu__list--item', {
        'side-menu__list--item--active': location.query.q === item
      })

      return (
        <LinkItem
          className={ active }
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
  isVisible: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object
}
