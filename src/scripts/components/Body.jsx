import React, { PropTypes } from 'react'

export default function Body({ headIconClassName, headText, children }) {
  return (
    <section className="body">
      <header className="body__head">
        <h6>
          <i className={ headIconClassName } />
          {` ${headText}`}
        </h6>
      </header>
      { children }
    </section>
  )
}

Body.propTypes = {
  children: PropTypes.node,
  headIconClassName: PropTypes.string,
  headText: PropTypes.string
}
