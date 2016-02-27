import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function Card(props) {
  const { children, imgUrl, href, title, byline, onCoverClick, date,
        titlePath, bylinePath } = props
  return (
    <article className="card__item">

      <div className="card__cover">
        <a
          className="card__cover--link artwork"
          href={ href }
          onClick={ onCoverClick }
        >
          <img
            className="card__cover--img"
            src={ imgUrl }
          />
          <aside className="artwork__filter" />
        </a>
      </div>

      <div className="card__content">

        <h5 className="card__content--title">
          <LinkItem to={ titlePath } >
            { title }
          </LinkItem>
        </h5>

        <h6 className="card__content--byline">
          <LinkItem to={ bylinePath }>
            { byline }
          </LinkItem>
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
  onCoverClick: PropTypes.func,
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
  onCoverClick() {}
}
