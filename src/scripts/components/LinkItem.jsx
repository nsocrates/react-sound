import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { toggleCloseAll } from 'actions/toggle'

function LinkItem(props) {
  const { children, className, to, onClick } = props

  const handleClick = e => {
    e.preventDefault()

    const { dispatch, location } = props
    const locationDescriptor = location || {
      pathname: to
    }

    dispatch(toggleCloseAll())
    return dispatch(push(locationDescriptor))
  }

  return (
    <Link
      className={ className }
      onClick={ onClick || handleClick }
      to={ to }
    >
      { children }
    </Link>
  )
}

LinkItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  onClick: PropTypes.func,
  to: PropTypes.string
}

LinkItem.defaultProps = {
  children: null,
  className: null,
  to: '#'
}

export default connect()(LinkItem)
