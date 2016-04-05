import React, { PropTypes } from 'react'
import { FALLBACK } from 'constants/ImageConstants'

export default function ProfileCover(props) {
  const handleError = e => {
    const { currentTarget } = e
    const { fallback = FALLBACK.PLACEHOLDER.LARGE } = props
    return (currentTarget.src = fallback)
  }

  const {
    className = undefined,
    children = null,
    href = undefined,
    imgClassName = undefined,
    onClick = undefined,
    onError = handleError,
    src = undefined,
    Type = 'a'
  } = props

  return (
    <section className="profile__section profile__section--cover">
      <Type
        className={ className }
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
      </Type>
    </section>
  )
}

ProfileCover.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  fallback: PropTypes.string,
  href: PropTypes.string,
  imgClassName: PropTypes.string,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  src: PropTypes.string,
  Type: PropTypes.string
}
