import React, { PropTypes } from 'react'

export default function Loader({ className = 'loader--center' }) {
  const loaderClass = `loader ${className}`

  return (
    <aside className={ loaderClass.trim() }>
      <i className="loader__icon fa fa-spinner fa-pulse" />
    </aside>
  )
}

Loader.propTypes = {
  className: PropTypes.string
}

export default Loader
