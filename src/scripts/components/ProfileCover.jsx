import React, { PropTypes } from 'react'

export default function ProfileCover(props) {
  const {
    className = undefined,
    children = null,
    href = undefined,
    imgClassName = undefined,
    onClick = undefined,
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
