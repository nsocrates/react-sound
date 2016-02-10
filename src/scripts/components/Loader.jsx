import React from 'react'

const Loader = ({ className = 'rw__loader' }) => (
  <aside className={ className }>
    <i className="fa fa-spinner fa-pulse" />
  </aside>
)

Loader.propTypes = {
  className: React.PropTypes.string
}

export default Loader
