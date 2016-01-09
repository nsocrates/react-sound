import React from 'react'
import { Link } from 'react-router'

export default class MenuItem extends React.Component {

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
  onLoadGenre: React.PropTypes.func.isRequired,
  onToggleMenu: React.PropTypes.func
}

MenuItem.defaultProps = {
  onToggleMenu() { return },
  itemClassName: null
}
