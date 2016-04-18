import React from 'react'
import LinkItem from 'components/LinkItem'

export default function CollectionNav() {
  const navItems = [{
    text: 'Collection',
    to: '/me/collection'
  }, {
    text: 'Tracks',
    to: '/me/tracks'
  }, {
    text: 'Playlists',
    to: '/me/playlists'
  }, {
    text: 'Followings',
    to: '/me/followings'
  }]

  const subNavItems = navItems.map((item, index) => (
    <li className="sub-nav__item" key={`${item.text}${index}`}>
      <LinkItem
        activeClassName="sub-nav__link--active"
        className="sub-nav__link"
        to={{ pathname: item.to }}
      >
        { item.text }
      </LinkItem>
    </li>
  ))

  return (
    <nav className="sub-nav">
      <ul className="sub-nav__list">
        { subNavItems }
      </ul>
    </nav>
  )
}
