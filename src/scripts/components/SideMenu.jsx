import React from 'react'
import classNames from 'classnames'
import MenuItem from './MenuItem'
import GlobalEvents from 'utils/GlobalEvents'

export default class SideMenu extends React.Component {

  componentWillMount() {
    GlobalEvents.emit('hideBodyOverflow', true)
  }

  componentWillUnmount() {
    GlobalEvents.emit('hideBodyOverflow', false)
  }

  render() {
    const { actions, genre, genreList } = this.props

    const menuItems = genreList.map((item, index) => {
      const active = classNames('side-menu__list--item', {
        'side-menu__list--item--active': genre === item
      })

      return (
        <MenuItem
          componentClass={ active }
          genre={ item }
          key={ `side-menu__${index}_${item}` }
          loadGenre={ actions.loadGenre }
          toggleMenu={ actions.toggleMenu }
        >
          { item }
        </MenuItem>
      )
    })

    return (
      <nav
        className="side-menu__nav"
      >
        <button
          className="side-menu__btn"
          onClick={ actions.toggleMenu }
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
  genre: React.PropTypes.string.isRequired,
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  isVisible: React.PropTypes.bool.isRequired
}
