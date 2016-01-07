import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

export default class SideMenuItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const { genre, onLoadGenre, onToggleMenu } = this.props
    event.preventDefault()
    onLoadGenre(genre)
    onToggleMenu()
  }

  render() {
    const { isActive, genre, children } = this.props
    const active = classNames('oc-item', {
      'oc-active': isActive
    })

    return (
      <Link
        className={ active }
        onClick={ this.handleClick }
        to={ `/genre/${genre}` }
      >
        { children }
      </Link>
    )
  }
}

SideMenuItem.propTypes = {
  children: React.PropTypes.node,
  genre: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool,
  onLoadGenre: React.PropTypes.func.isRequired,
  onToggleMenu: React.PropTypes.func
}
