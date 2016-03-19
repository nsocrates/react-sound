import React, { PropTypes } from 'react'
import { IMG_FALLBACK } from 'constants/ItemLists'

export default function ProfileCover(props) {
  const handleClick = e => {
    e.preventDefault()

    return null
  }

  const handleError = e => {
    const { currentTarget } = e
    const { fallback = IMG_FALLBACK.PLACEHOLDER.LARGE } = props
    return (currentTarget.src = fallback)
  }

  const {
    anchorClassName = null,
    children = null,
    href = '#',
    imgClassName = null,
    onClick = handleClick,
    onError = handleError,
    src = null
  } = props

  return (
    <section className="profile__section profile__section--cover">
      <a
        className={ anchorClassName }
        href={ href }
        target="_blank"
        onClick={ onClick }
      >
        <img
          className={ imgClassName }
          onError={ onError }
          src={ src }
        />
        { children }
      </a>
    </section>
  )
}

ProfileCover.propTypes = {
  anchorClassName: PropTypes.string,
  children: PropTypes.node,
  fallback: PropTypes.string,
  href: PropTypes.string,
  imgClassName: PropTypes.string,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  src: PropTypes.string
}
