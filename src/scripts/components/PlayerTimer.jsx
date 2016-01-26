import React from 'react'

const PlayerTimer = ({ children = null, componentClassName = '' }) => (
  <li className={ componentClassName }>
    { children }
  </li>
)

PlayerTimer.propTypes = {
  children: React.PropTypes.node,
  componentClassName: React.PropTypes.string
}

export default PlayerTimer
