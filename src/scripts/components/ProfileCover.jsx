import React, { PropTypes } from 'react'
import { IMG_FALLBACK } from 'constants/ItemLists'

export default class ProfileCover extends React.Component {
  super(props) {
    constructor(props)
    this.handleError = this.handleError.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    return null
  }

  handleError(e) {
    const { currentTarget } = e
    currentTarget.src = IMG_FALLBACK.PLACEHOLDER.LARGE

    return currentTarget
  }

  render() {
    const {
      anchorClassName = null,
      children = null,
      href = '#',
      imgClassName = null,
      onClick = this.handleClick,
      onError = this.handleError,
      src = null
    } = this.props

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
}

ProfileCover.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string,
  anchorClassName: PropTypes.string,
  imgClassName: PropTypes.string,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node
}
