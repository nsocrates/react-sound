import React from 'react'
import classNames from 'classnames'
import MenuItem from './SideMenuItem'
import { GENRES } from '../constants/ItemLists'
import { GLOBAL_EVENTS } from '../constants/GlobalEvents'

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.props
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(prevProps) {
    this.emitState(prevProps.isVisible)
    this.setState(prevProps)
  }

  getItems() {
    return GENRES.map((item, index) =>
      <MenuItem
        genre={ item }
        key={ index }
        onChange={ this.handleChange }
        onExit={ this.handleClick }
      >
        { item }
      </MenuItem>
    )
  }

  handleChange(genre) {
    this.props.onLoadGenre(genre)
  }

  handleClick() {
    this.props.onToggleMenu()
  }

  emitState(state) {
    GLOBAL_EVENTS.emit('sideMenu', state)
  }

  render() {
    const overlay = classNames('oc-overlay', {
      'slide': this.state.isVisible
    })
    const slider = classNames('oc-menu', {
      'slide': this.state.isVisible
    })
    return (
      <div className="off-canvas-menu">
        <div
          className={ overlay }
          onClick={ this.handleClick }
        />
        <div className={ slider }>
          <button
            className="oc-times"
            onClick={ this.handleClick }
          >
            <i className="fa fa-times" />
          </button>
          <div className="oc-item-container">
            { this.getItems() }
          </div>
        </div>
      </div>
    )
  }
}

SideMenu.propTypes = {
  onLoadGenre: React.PropTypes.func.isRequired,
  onToggleMenu: React.PropTypes.func.isRequired
}
