import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push, replace } from 'react-router-redux'
import { toggleCloseAll } from 'actions/toggle'

function LinkItem(props) {
  const { children, className, to, onClick, title } = props

  const handleClick = e => {
    e.preventDefault()

    const { dispatch } = props

    dispatch(toggleCloseAll())
    return to.replace ? dispatch(replace(to)) : dispatch(push(to))
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

LinkItem.defaultProps = {
  children: null,
  className: undefined,
  dataContent: undefined,
  title: undefined,
  to: {}
}

export default connect()(LinkItem)
