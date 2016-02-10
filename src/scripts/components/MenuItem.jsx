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

  handleClick(e) {
    e.preventDefault()
    const { genre, loadGenre, toggleMenu, push } = this.props
    const location = {
      pathname: '#genre',
      query: {
        q: genre
      }
    }

    loadGenre(genre, false)
    toggleMenu()
    push(location)
  }

  render() {
    const { children, componentClass } = this.props

    return (
      <Link
        className={ componentClass }
        onClick={ this.handleClick }
        to="#genre"
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
  push: React.PropTypes.func.isRequired,
  toggleMenu: React.PropTypes.func
}

MenuItem.defaultProps = {
  toggleMenu() {},
  componentClass: null
}
