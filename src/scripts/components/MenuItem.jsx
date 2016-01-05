import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

export default class MenuItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.onChange(this.props.genre)
  }

  render() {
    const active = classNames({ 'active': this.props.isActive })

    return (
      <li className={ this.props.listClass }>
        <Link
          className={ active }
          onClick={ this.handleClick }
          to={ `/genre/${this.props.genre}` }
        >
          { this.props.children }
        </Link>
      </li>
    )
  }
}

MenuItem.propTypes = {
  children: React.PropTypes.node,
  genre: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  isActive: React.PropTypes.bool,
  listClass: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}
