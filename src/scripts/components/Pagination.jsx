import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function Pagination({ next, prev, onNext, onPrev, children }) {
  const prevState = classNames('pagination__item pagination__item--pointer', {
    'pagination__item--disabled': !prev,
    'pagination__item--stateful': prev
  })

  const nextState = classNames('pagination__item pagination__item--pointer', {
    'pagination__item--disabled': !next,
    'pagination__item--stateful': next
  })

  return (
    <div className="pagination-wrapper">
      <ul className="pagination">
        <li className={ prevState }>
          <a className="pagination__link" href="#" onClick={ onPrev }>
            <i className="fa fa-caret-left" />
          </a>
        </li>

        <ul className="pagination__pages">
          { children }
        </ul>

        <li className={ nextState }>
          <a className="pagination__link pagination__link--active" href="#" onClick={ onNext }>
            <i className="fa fa-caret-right" />
          </a>
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
