import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function Pagination({ next, prev, onNext, onPrev, children }) {
  const prevState = classNames('pagination__item pagination__item--caret', {
    'pagination__item--disabled': !prev,
    'pagination__item--stateful': prev
  })

  const nextState = classNames('pagination__item pagination__item--caret', {
    'pagination__item--disabled': !next,
    'pagination__item--stateful': next
  })

  return (
    <div className="pagination-wrapper">
      <ul className="pagination">
        <li className={ prevState } onClick={ onPrev }>
          <i className="fa fa-caret-left" />
          <label className="pagination__label pagination__label--prev">{" Prev"}</label>
        </li>

        <ul className="pagination__pages">
          { children }
        </ul>

        <li className={ nextState } onClick={ onNext }>
          <label className="pagination__label pagination__label--next">{"Next "}</label>
          <i className="fa fa-caret-right" />
        </li>
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  next: PropTypes.bool,
  prev: PropTypes.bool,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  children: PropTypes.node
}
