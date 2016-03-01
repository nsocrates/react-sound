import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function PaginationItem({ page, ellipsis = [], isCurrent, onClick }) {
  if (page === ellipsis[0] || page === ellipsis[1]) {
    return (
      <li className="pagination__item pagination__item--rest pagination__page" />
    )
  }

  const current = classNames('pagination__item pagination__page', {
    'pagination__page--current': isCurrent,
    'pagination__item--stateful': !isCurrent
  })

  return (
    <li className={ current }>
      <button className="pagination__link" href="#" onClick={ onClick }>
        { page }
      </button>
    </li>
  )
}

PaginationItem.propTypes = {
  page: PropTypes.number,
  isCurrent: PropTypes.bool,
  ellipsis: PropTypes.array,
  onClick: PropTypes.func
}
