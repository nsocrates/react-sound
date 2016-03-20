import React, { PropTypes } from 'react'
import Main from 'components/Main'
import LinkItem from 'components/LinkItem'
import classNames from 'classnames'

export default function AuthCollection(props) {
  const { shouldPlay, currPath, children = null } = props
  const navItems = [{
    text: 'Collection',
    to: '#me/collection'
  }, {
    text: 'Tracks',
    to: '#me/collection/tracks'
  }, {
    text: 'Playlists',
    to: '#me/collection/playlists'
  }, {
    text: 'Favorites',
    to: '#me/collection/favorites'
  }]

  const mapNavItems = navItems.map((item, index) => {
    const isActive = classNames('sub-nav__link', {
      'sub-nav__link--active': item.to === currPath
    })

    return (
      <li className="sub-nav__item" key={`sub-nav__${index}`}>
        <LinkItem className={ isActive } to={ item.to }>
          { item.text }
        </LinkItem>
      </li>
    )
  })

  return (
    <Main
      className="main main__container main__container--main"
      shouldPush={ shouldPlay }
    >
      <nav className="sub-nav">
        <ul className="sub-nav__list">

          { mapNavItems }

        </ul>
      </nav>
      { children }
    </Main>
  )
}

AuthCollection.propTypes = {
  children: PropTypes.node,
  currPath: PropTypes.string.isRequired,
  shouldPlay: PropTypes.bool.isRequired
}
