import React from 'react'
import { Link } from 'react-router'

export default class MenuItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  ShouldComponentUpdate() {
    return false
  }

  handleClick(event) {
    const { genre, loadGenre, toggleMenu } = this.props

    event.preventDefault()
    loadGenre(genre)
    toggleMenu()
  }

  render() {
    const { children, genre, componentClass } = this.props

    return (
      <Link
        className={ componentClass }
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
  componentClass: React.PropTypes.string,
  genre: React.PropTypes.string.isRequired,
  loadGenre: React.PropTypes.func.isRequired,
  toggleMenu: React.PropTypes.func
}

MenuItem.defaultProps = {
  toggleMenu() { return },
  componentClass: null
}
