import React, { PropTypes } from 'react'

export default function Body({ headIconClassName, headText, others, children }) {
  return (
    <section className="body">
      <header className="body__head">
        <h6>
          <i className={ headIconClassName } />
          {` ${headText}`}
          { others }
        </h6>
      </header>
      { children }
    </section>
  )
}

Body.propTypes = {
  children: PropTypes.node,
  others: PropTypes.node,
  headIconClassName: PropTypes.string,
  headText: PropTypes.string
}
