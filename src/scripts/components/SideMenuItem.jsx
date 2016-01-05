import React from 'react'
import { Link } from 'react-router'

export default class SideMenuItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.onChange(this.props.genre)
    this.props.onClose()
  }

  render() {
    return (
      <Link
        className="oc-item"
        onClick={ this.handleClick }
        to={ `/genre/${this.props.genre}` }
      >
        { this.props.children }
      </Link>
    )
  }
}

SideMenuItem.propTypes = {
  children: React.PropTypes.node,
  genre: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func
}
