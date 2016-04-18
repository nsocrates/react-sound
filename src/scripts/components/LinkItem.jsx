import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push, replace } from 'react-router-redux'
import { toggleCloseAll } from 'actions/toggle'

function LinkItem(props) {
  const {
    activeClassName,
    children,
    className,
    dispatch,
    method,
    onClick,
    title,
    to
  } = props

  const handleClick = e => {
    e.preventDefault()
    dispatch(toggleCloseAll())

    const location = typeof to === 'string'
      ? { pathname: to }
      : to

    return method === 'REPLACE'
      ? dispatch(replace(location))
      : dispatch(push(location))
  }

  return (
    <Link
      activeClassName={ activeClassName }
      className={ className }
      onClick={ onClick || handleClick }
      to={ to }
      title={ title }
    >
      { children }
    </Link>
  )
}

LinkItem.defaultProps = {
  method: 'PUSH'
}

LinkItem.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dataContent: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  method: PropTypes.oneOf(['PUSH', 'REPLACE']).isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.object,
      hash: PropTypes.string,
      state: PropTypes.object
    }).isRequired
  ])
}

export default connect()(LinkItem)
