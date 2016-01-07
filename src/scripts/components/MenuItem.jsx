import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

export default class MenuItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const { genre, onLoadGenre } = this.props

    event.preventDefault()
    onLoadGenre(genre)
  }

  render() {
    const { children, genre, isActive, menuItemClass } = this.props
    const active = classNames({ 'active': isActive })

    return (
      <li className={ menuItemClass }>
        <Link
          className={ active }
          onClick={ this.handleClick }
          to={ `/genre/${genre}` }
        >
          { children }
        </Link>
      </li>
    )
  }
}

MenuItem.propTypes = {
  children: React.PropTypes.node.isRequired,
  genre: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  menuItemClass: React.PropTypes.string,
  onLoadGenre: React.PropTypes.func.isRequired
}
