import React from 'react'
import classNames from 'classnames'
import MenuItem from './MenuItem'
import { GLOBAL_EVENTS } from 'constants/GlobalEvents'

export default class SideMenu extends React.Component {

  componentWillReceiveProps(prevProps) {
    this.emitState(prevProps.isVisible)
  }

  emitState(state) {
    GLOBAL_EVENTS.emit('sideMenu', state)
  }

  render() {
    const { genre, isVisible, toggleMenu, loadGenre, genreList } = this.props
    const willSlide = { 'slide': isVisible }
    const overlay = classNames('oc-overlay', willSlide)
    const menu = classNames('oc-menu', willSlide)

    const menuItems = genreList.map((item, index) => {
      const active = classNames('oc-item', {
        'oc-active': genre === item
      })

      return (
        <MenuItem
          genre={ item }
          itemClassName={ active }
          key={ index }
          loadGenre={ loadGenre }
          toggleMenu={ toggleMenu }
        >
          { item }
        </MenuItem>
      )
    })

    return (
      <section className="off-canvas-menu">
        <div
          className={ overlay }
          onClick={ toggleMenu }
        />
        <nav className={ menu }>
          <button
            className="oc-times"
            onClick={ toggleMenu }
          >
            <i className="fa fa-times" />
          </button>
          <div className="oc-item-container">
            { menuItems }
          </div>
        </nav>
      </section>
    )
  }
}

SideMenu.propTypes = {
  genre: React.PropTypes.string.isRequired,
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  isVisible: React.PropTypes.bool.isRequired,
  loadGenre: React.PropTypes.func.isRequired,
  toggleMenu: React.PropTypes.func.isRequired
}
