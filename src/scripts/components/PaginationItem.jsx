import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function PaginationItem({ index, isEllipsis, isCurrent, onClick }) {
  if (isEllipsis) {
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
      <a className="pagination__link" href="#" onClick={ onClick }>
        { index }
      </a>
    </li>
  )
}

PaginationItem.propTypes = {
  index: PropTypes.number,
  isCurrent: PropTypes.bool,
  isEllipis: PropTypes.bool,
  onClick: PropTypes.func
}
