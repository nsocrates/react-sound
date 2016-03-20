import React, { PropTypes } from 'react'

import { IMG_FALLBACK } from 'constants/ItemLists'
import { getCover } from 'utils/Utils'
import { toggleProfileMenu } from 'actions/toggle'

import CanvasGradient from 'components/CanvasGradient'
import classNames from 'classnames'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import Menu from 'components/Menu'
import ProfileCover from 'components/ProfileCover'
import StatsTable from 'components/StatsTable'
import Waypoint from 'components/Waypoint'
import WebIcon from 'components/WebIcon'

export default class User extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEvent = this.handleWaypointEvent.bind(this)
  }

  componentWillUnmount() {
    return this.dispatchStickyMenu(false)
  }

  dispatchStickyMenu(shouldStick) {
    const { dispatch } = this.props

    return dispatch(toggleProfileMenu(shouldStick))
  }

  handleWaypointEvent() {
    const { menu } = this.props

    return this.dispatchStickyMenu(!menu.isSticky)
  }

  render() {
    const {
      basePath,
      currPath,
      menu,
      shouldPlay,
      user
    } = this.props

    if (!Object.keys(user).length) {
      return <Loader className="loader--top" />
    }

    const {
      avatar_url,
      city,
      country,
      followers_count,
      followings_count,
      full_name,
      permalink_url,
      track_count,
      username,
      website
    } = user

    const gradientColors = [
      { offset: 0, color: '#1D2B64' },
      { offset: 1, color: '#F8CDDA' }
    ]

    const statsData = [
      {
        title: 'Followers',
        value: followers_count,
        pathname: `${basePath}/followers`
      },
      {
        title: 'Following',
        value: followings_count,
        pathname: `${basePath}/following`
      },
      {
        title: 'Tracks',
        value: track_count,
        pathname: `${basePath}/tracks`
      }
    ]

    const avatarUrl = getCover(avatar_url).large

    const getUserLocation = () => {
      if (city || country) {
        return city && country ? `${city}, ${country}` : country || city
      }

      return 'Somewhere...'
    }

    const renderMenuItems = () => {
      const itemList = [
        { text: 'Bio',
          icon: 'fa-pencil-square-o',
          path: `${basePath}` },

        { text: 'Tracks',
          icon: 'fa-caret-square-o-right',
          path: `${basePath}/tracks` },

        { text: 'Playlists',
          icon: 'fa-list',
          path: `${basePath}/playlists` },

        { text: 'Favorites',
          icon: 'fa-heart',
          path: `${basePath}/favorites` }
      ]

      return itemList.map((item, index) => {
        const isActive = classNames('menu__link menu__link--profile', {
          'menu__link--active': currPath === item.path
        })

        const shouldShowData = classNames('menu__item menu__item--profile menu__data-content', {
          'menu__data-content--active': currPath === item.path
        })

        return (
          <li
            className={ shouldShowData }
            key={`menu__${item.text}_${index}`}
            data-content={ item.text }
          >
            <LinkItem
              className={ isActive }
              to={ item.path }
            >
              <i className={`menu__icon fa ${item.icon}`} />
              <span className="menu__text">{ item.text }</span>
            </LinkItem>
          </li>
        )
      })
    }

    const renderWebIcons = () => {
      if (!user.web_profiles || !user.web_profiles.length) {
        return <hr className="invis" />
      }

      const { web_profiles } = user
      const webIcons = web_profiles.map((item, index) => {
        const { service, url, id } = item
        let icon

        switch (service) {
          case 'facebook':
            icon = 'fa-facebook-square'
            break
          case 'instagram':
            icon = 'fa-instagram'
            break
          case 'youtube':
            icon = 'fa-youtube-square'
            break
          case 'twitter':
            icon = 'fa-twitter-square'
            break
          default:
            return null
        }

        return (
          <WebIcon
            href={ url }
            iconClassName={ `fa ${icon}` }
            itemClassName="web-icon__list--item"
            key={`web_profile__${index}_${id}`}
            linkClassName="web-icon__link"
          />
        )
      })

      return (
        <ul className="interact-bar interact-bar--shark web-icon__list">
          { webIcons }
        </ul>
      )
    }

    return (
      <Main shouldPush={ shouldPlay }>

        <div className="canvas-container">

          <CanvasGradient
            className="canvas canvas--translucent"
            colors={ gradientColors }
          />

          <div className="profile">

            <ProfileCover
              anchorClassName="profile__cover avatar"
              fallback={ IMG_FALLBACK.AVATAR.LARGE }
              href={ website || permalink_url }
              imgClassName="avatar__img"
              src={ avatarUrl }
            />

            <section className="profile__section profile__section--details">

              <article className="profile__info">
                <h2 className="profile__info--primary">
                  { full_name || username }
                </h2>
                <h4 className="profile__info--secondary">
                  { username }
                </h4>
                <h5 className="profile__info--tertiary">
                  <i className="profile__info--icon fa fa-map-marker" />
                  { getUserLocation() }
                </h5>
              </article>

              <hr className="invis" />

              <StatsTable tableData={ statsData } />

            </section>

            {/* Web Icons */}
            { renderWebIcons() }

            <a
              className="interact-bar interact-bar__link-to-sc"
              href={ permalink_url }
              target="_blank"
            >
              <i className="interact-bar__icon fa fa-soundcloud" />
              <strong className="interact-bar__text">{" SOUNDCLOUD"}</strong>
            </a>

          </div>
        </div>

        <Menu
          innerClassName="menu__inner--profile"
          isSticky={ menu.isSticky }
          outerClassName="menu--profile"
        >
          {/* Menu Items */}
          { renderMenuItems() }
        </Menu>

        <div className="menu__sibling main__container main__container--main">
          <Waypoint
            className="waypoint"
            onEnter={ this.handleWaypointEvent }
            onLeave={ this.handleWaypointEvent }
            triggerFrom="above"
          />
          { this.props.children }
        </div>
      </Main>
    )
  }
}

User.propTypes = {
  basePath: PropTypes.string.isRequired,
  children: PropTypes.node,
  currPath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  shouldPlay: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
