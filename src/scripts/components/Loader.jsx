import React from 'react'

const Loader = ({ className = '' }) => {
  const loaderClass = `loader ${className}`

  return (
    <aside className={ loaderClass.trim() }>
      <i className="loader__icon fa fa-spinner fa-pulse" />
    </aside>
  )
}

Loader.propTypes = {
  className: React.PropTypes.string
}

export default Loader
