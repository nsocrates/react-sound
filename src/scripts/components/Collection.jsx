import React, { PropTypes } from 'react'

export default function Collection(props) {
  const { title = 'Collection', children = null } = props

  return (
    <section className="collection">
      <h3 className="collection__head">{ title }</h3>
      { children }
    </section>
  )
}

Collection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
