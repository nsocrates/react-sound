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
    const { actions, genre, isVisible, genreList } = this.props
    const willSlide = { 'slide': isVisible }
    const overlay = classNames('oc-overlay', willSlide)
    const menu = classNames('oc-menu', willSlide)

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
      <section className="off-canvas-menu">
        <div
          className={ overlay }
          onClick={ actions.toggleMenu }
        />
        <nav className={ menu }>
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
      </section>
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
