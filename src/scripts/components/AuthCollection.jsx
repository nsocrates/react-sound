import React, { PropTypes } from 'react'

export default function AuthCollection() {
  return (
    <section className="collection">
      <h2>AuthCollection..</h2>
    </section>
  )
}

AuthCollection.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
}
