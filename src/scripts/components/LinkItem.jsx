import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { toggleCloseAll } from 'actions/toggle'

function LinkItem(props) {
  const { children, className, to, onClick, title } = props

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
      title={ title }
    >
      { children }
    </Link>
  )
}

LinkItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dataContent: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  onClick: PropTypes.func,
  title: PropTypes.string,
  to: PropTypes.string
}

LinkItem.defaultProps = {
  children: null,
  className: undefined,
  dataContent: undefined,
  title: undefined,
  to: '#'
}

export default connect()(LinkItem)
