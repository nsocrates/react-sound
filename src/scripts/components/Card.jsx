import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'
import classNames from 'classnames'

export default function Card(props) {
  const { children, imgUrl, href, title, byline, onClickPlay, date,
        titlePath, bylinePath, onClickFav, isFavorite } = props

  const isFav = classNames('artwork__fav-icon fa fa-heart', {
    'artwork__fav-icon--is-fav': isFavorite
  })

  return (
    <article className="card__item">

      <div className="card__cover">
        <article
          className="card__cover--link artwork"
          href={ href }
        >
          <img
            className="card__cover--img"
            src={ imgUrl }
          />
          <button
            className="artwork__fav"
            onClick={ onClickFav }
          >
            <i className={ isFav } />
          </button>
          <button
            className="artwork__filter"
            onClick={ onClickPlay }
          />
        </article>
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
  isFavorite: PropTypes.bool,
  onClickFav: PropTypes.func,
  onClickPlay: PropTypes.func,
  title: PropTypes.string,
  titlePath: PropTypes.string
}

Card.defaultProps = {
  byline: null,
  children: null,
  date: null,
  href: undefined,
  imgUrl: null,
  isFavorite: false,
  title: null,
  titlePath: undefined,
  bylinePath: undefined,
  onClickPlay() {}
}
