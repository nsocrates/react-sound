import React from 'react'
import classNames from 'classnames'
import MenuItem from './SideMenuItem'
import { GENRES } from 'constants/ItemLists'
import { GLOBAL_EVENTS } from 'constants/GlobalEvents'

export default class SideMenu extends React.Component {

  componentWillReceiveProps(prevProps) {
    this.emitState(prevProps.isVisible)
  }

  emitState(state) {
    GLOBAL_EVENTS.emit('sideMenu', state)
  }

  renderMenuItems() {
    const { genre, onToggleMenu, onLoadGenre } = this.props
    return GENRES.map((item, index) =>
      <MenuItem
        genre={ item }
        isActive={ genre === item }
        key={ index }
        onLoadGenre={ onLoadGenre }
        onToggleMenu={ onToggleMenu }
      >
        { item }
      </MenuItem>
    )
  }

  render() {
    const { isVisible, onToggleMenu } = this.props
    const overlay = classNames('oc-overlay', {
      'slide': isVisible
    })
    const slider = classNames('oc-menu', {
      'slide': isVisible
    })

    return (
      <div className="off-canvas-menu">
        <div
          className={ overlay }
          onClick={ onToggleMenu }
        />
        <div className={ slider }>
          <button
            className="oc-times"
            onClick={ onToggleMenu }
          >
            <i className="fa fa-times" />
          </button>
          <div className="oc-item-container">
            { this.renderMenuItems() }
          </div>
        </div>
      </div>
    )
  }
}

SideMenu.propTypes = {
  genre: React.PropTypes.string.isRequired,
  isVisible: React.PropTypes.bool.isRequired,
  onLoadGenre: React.PropTypes.func.isRequired,
  onToggleMenu: React.PropTypes.func.isRequired
}
