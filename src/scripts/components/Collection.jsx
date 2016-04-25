import React, { PropTypes } from 'react'

export default function Collection(props) {
  const { title, children = null } = props

  return (
    <section className="collection">
      {
        !!title &&
        <h3 className="collection__head">
          { title }
        </h3>
      }

      { children }
    </section>
  )
}

Collection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
