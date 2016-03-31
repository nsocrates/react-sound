import React from 'react'

export default function Overlay({
  className = undefined,
  onClick = () => ({}),
  Type = 'span',
  children = null
}) {
  return (
    <Type
      className={ className }
      onClick={ onClick }
    >
      { children }
    </Type>
  )
}

Overlay.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  Type: React.PropTypes.string
}

export default Overlay
