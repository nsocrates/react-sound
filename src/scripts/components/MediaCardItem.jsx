import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'
import classNames from 'classnames'

export default function MediaCardItem(props) {
  const { children, imgUrl, href, title, byline, onClickPlay, meta,
        titlePath, bylinePath, onClickFav, isFavorite, head, stats,
        onClickAdd } = props

  const isFav = classNames('artwork__fav-icon fa fa-heart', {
    'artwork__fav-icon--is-fav': isFavorite
  })

  const cardStats = stats.map(item => (
    <li className="card__stats-item" key={`${item.title}_${item.value}`}>
      <i className={`card__icon fa fa-${item.icon}`} />
        { item.value }
    </li>
  ))

  return (
    <article className="card__item">

      { head }

      <section className="card__body">

        <section className="card__cover">
          <div
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
              className="artwork__add"
              onClick={ onClickAdd }
            >
              <i className="artwork__add-icon fa fa-plus" />
            </button>
            <button
              className="fa artwork__filter"
              onClick={ onClickPlay }
            />
          </div>
        </section>

        <section className="card__content">

          <h5 className="card__title">
            <LinkItem
              className="card__ellipsis"
              to={ titlePath }
            >
              { title }
            </LinkItem>
          </h5>

          <h6 className="card__byline">
            <LinkItem
              className="card__ellipsis"
              to={ bylinePath }
            >
              { byline }
            </LinkItem>
          </h6>

          <h6 className="card__meta">
            <small>{ meta }</small>
          </h6>

          <ul className="card__stats">
            { cardStats }
          </ul>

          { children }

        </section>
      </section>
    </article>
  )
}

MediaCardItem.propTypes = {
  byline: PropTypes.string,
  bylinePath: PropTypes.string,
  children: PropTypes.node,
  head: PropTypes.node,
  href: PropTypes.string,
  imgUrl: PropTypes.string,
  isFavorite: PropTypes.bool,
  meta: PropTypes.string,
  onClickAdd: PropTypes.func,
  onClickFav: PropTypes.func,
  onClickPlay: PropTypes.func,
  stats: PropTypes.array,
  title: PropTypes.string,
  titlePath: PropTypes.string
}

MediaCardItem.defaultProps = {
  byline: null,
  bylinePath: undefined,
  children: null,
  date: null,
  head: null,
  href: undefined,
  imgUrl: null,
  isFavorite: false,
  stats: [],
  title: null,
  titlePath: undefined,
  onClickAdd() {},
  onClickFav() {},
  onClickPlay() {}
}
