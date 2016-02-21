import React, { PropTypes } from 'react'

export default function Card(props) {
  const { children, imgUrl, href, title, byline, onCoverClick, date,
        titlePath, bylinePath, onTitleClick, onBylineClick } = props
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
          <aside className="card__cover--filter" />
        </a>
      </div>

      <div className="card__content">

        <h5 className="card__content--title">
          <a
            href={ titlePath }
            onClick={ onTitleClick }
          >
            { title }
          </a>
        </h5>

        <h6 className="card__content--byline">
          <a
            href={ bylinePath }
            onClick={ onBylineClick }
          >
            { byline }
          </a>
        </h6>

        <h6 className="card__content--date">
          <small>{ date }</small>
        </h6>

        { children }
      </div>
    </article>
  )
}

Card.propTypes = {
  byline: PropTypes.string,
  bylinePath: PropTypes.string,
  children: PropTypes.node,
  date: PropTypes.string,
  href: PropTypes.string,
  imgUrl: PropTypes.string,
  onBylineClick: PropTypes.func,
  onCoverClick: PropTypes.func,
  onTitleClick: PropTypes.func,
  title: PropTypes.string,
  titlePath: PropTypes.string
}

Card.defaultProps = {
  byline: null,
  children: null,
  date: null,
  href: '#',
  imgUrl: null,
  title: null,
  titlePath: '#',
  bylinePath: '#',
  onCoverClick() {},
  onTitleClick() {},
  onBylineClick() {}
}
