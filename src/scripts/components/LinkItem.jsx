import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

class LinkItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

    const { dispatch, to } = this.props
    const location = {
      pathname: to
    }

    return dispatch(push(location))
  }

  render() {
    const { children, className, to, onClick } = this.props

    return (
      <Link
        className={ className }
        onClick={ onClick || this.handleClick }
        to={ to }
      >
        { children }
      </Link>
    )
  }
}

LinkItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string
}

LinkItem.defaultProps = {
  children: null,
  className: null,
  to: '#'
}

export default connect()(LinkItem)
