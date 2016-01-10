import React from 'react'
import { Link } from 'react-router'

export default class MenuItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const { genre, loadGenre, toggleMenu } = this.props

    event.preventDefault()
    loadGenre(genre)
    toggleMenu()
  }

  render() {
    const { children, genre, itemClassName } = this.props

    return (
      <Link
        className={ itemClassName }
        onClick={ this.handleClick }
        to={ `/genre/${genre}` }
      >
        { children }
      </Link>
    )
  }
}

MenuItem.propTypes = {
  children: React.PropTypes.node.isRequired,
  genre: React.PropTypes.string.isRequired,
  itemClassName: React.PropTypes.string,
  loadGenre: React.PropTypes.func.isRequired,
  toggleMenu: React.PropTypes.func
}

MenuItem.defaultProps = {
  toggleMenu() { return },
  itemClassName: null
}
