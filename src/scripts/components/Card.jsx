import React, { PropTypes } from 'react'

export default function Card(props) {
  const { children, imgUrl, href, title, byline, onCoverClick } = props
  return (
    <article className="card__item">
      <div className="card__cover">
        <a
          className="fa card__cover--link"
          href={ href }
          onClick={ onCoverClick }
        >
          <img
            className="card__cover--img"
            src={ imgUrl }
          />
        </a>
      </div>
      <div className="card__content">
        <h5 className="card__content--title">{ title }</h5>
        <h6 className="card__content--byline">{ byline }</h6>
        { children }
      </div>
    </article>
  )
}

Card.propTypes = {
  byline: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  imgUrl: PropTypes.string,
  onCoverClick: PropTypes.func,
  title: PropTypes.string
}

Card.defaultProps = {
  byline: null,
  children: null,
  href: '#',
  imgUrl: null,
  title: null,
  onCoverClick() {}
}
