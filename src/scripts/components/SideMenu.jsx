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
      const active = classNames('oc-item', {
        'active': genre === item
      })

      return (
        <MenuItem
          componentClass={ active }
          genre={ item }
          key={ index }
          loadGenre={ actions.loadGenre }
          toggleMenu={ actions.toggleMenu }
        >
          { item }
        </MenuItem>
      )
    })

    return (
      <nav
        className={ "oc-menu" }
      >
        <button
          className="oc-times"
          onClick={ actions.toggleMenu }
        >
          <i className="fa fa-times" />
        </button>
        <div className="oc-item-container">
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
