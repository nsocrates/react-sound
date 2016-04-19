import React, { PropTypes } from 'react'

export default function Loader({
  className = 'loader--bottom',
  iconClassName = 'loader__icon',
  Type = 'aside'
}) {
  const loaderClass = `loader ${className}`

  return (
    <Type className={ loaderClass.trim() }>
      <i className={`${iconClassName} fa fa-spinner fa-pulse`} />
    </Type>
  )
}

Loader.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  Type: PropTypes.string
}

export default Loader
