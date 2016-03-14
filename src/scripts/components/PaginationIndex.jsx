import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function PaginationIndex({ page, ellipsis = [], isCurrent, onClick }) {
  if (page === ellipsis[0] || page === ellipsis[1]) {
    return (
      <li className="pagination__item pagination__item--ellipsis pagination__index" />
    )
  }

  const current = classNames('pagination__item pagination__index', {
    'pagination__index--current': isCurrent,
    'pagination__item--stateful': !isCurrent
  })

  return (
    <li className={ current } onClick={ onClick }>
      { page }
    </li>
  )
}

PaginationIndex.propTypes = {
  page: PropTypes.number,
  isCurrent: PropTypes.bool,
  ellipsis: PropTypes.array,
  onClick: PropTypes.func
}
