import React, { PropTypes } from 'react'

import { FALLBACK } from 'constants/ImageConstants'
import { REQ } from 'constants/Auth'

import { formatCover } from 'utils/formatUtils'
import classNames from 'classnames'

import { toggleProfileMenu } from 'actions/toggle'
import { updateMyFollowings } from 'actions/auth'

import CanvasGradient from 'components/CanvasGradient'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import Menu from 'components/Menu'
import ProfileCover from 'components/ProfileCover'
import StatsTable from 'components/StatsTable'
import Waypoint from 'components/Waypoint'

export default class User extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEvent = this.handleWaypointEvent.bind(this)
    this.handleFollow = this.handleFollow.bind(this)
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

  handleFollow(e) {
    e.preventDefault()

    const { dispatch, user, userCollection } = this.props

    if (userCollection.ids.indexOf(user.id) !== -1) {
      return dispatch(updateMyFollowings(REQ.DEL, user.id, user.username))
    }
    return dispatch(updateMyFollowings(REQ.PUT, user.id, user.username))
  }

  render() {
    const {
      basePath,
      currPath,
      menu,
      shouldPlay,
      user,
      userCollection
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
      { offset: 0, color: '#94719a' },
      { offset: 1, color: '#3ac5c9' }
    ]

    const statsData = [{
      title: 'Followers',
      value: followers_count,
      to: {
        pathname: `${basePath}/followers`,
        state: { isModal: true, returnPath: currPath }
      }
    }, {
      title: 'Following',
      value: followings_count,
      to: {
        pathname: `${basePath}/followings`,
        state: { isModal: true, returnPath: currPath }
      }
    }, {
      title: 'Tracks',
      value: track_count,
      to: {
        pathname: `${basePath}/tracks`
      }
    }]

    const avatarUrl = formatCover(avatar_url).large

    const getUserLocation = () => {
      if (city || country) {
        return city && country ? `${city}, ${country}` : country || city
      }

      return 'Unspecified'
    }

    const shouldFollow = classNames('profile__cta btn btn--lg', {
      'btn__follow btn__follow--cta': userCollection.ids.indexOf(user.id) === -1,
      'btn__following btn__following--cta': userCollection.ids.indexOf(user.id) !== -1
    })

    const renderMenuItems = () => {
      const itemList = [
        { text: 'Profile',
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

      return itemList.map(item => {
        const isActive = classNames('menu__link menu__link--profile', {
          'menu__link--active': currPath === item.path
        })

        const shouldShowData = classNames('menu__item menu__item--profile menu__data-content', {
          'menu__data-content--active': currPath === item.path
        })

        return (
          <li
            className={ shouldShowData }
            key={`${item.text}`}
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

    return (
      <Main shouldPush={ shouldPlay }>

        <div className="canvas-container">

          <CanvasGradient
            className="canvas"
            colors={ gradientColors }
          />

          <div className="profile">

            <ProfileCover
              className="profile__cover avatar"
              fallback={ FALLBACK.AVATAR.LARGE }
              href={ website || permalink_url }
              imgClassName="avatar__img"
              src={ avatarUrl }
            />

            <section className="profile__section profile__section--details">

              <article className="profile__info">
                <h2 className="profile__info--primary">
                  { full_name || username || user.id }
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

              <hr className="invis" />

              <div className="profile__cta-wrap">
                <button
                  className={ shouldFollow }
                  onClick={ this.handleFollow }
                />
              </div>

            </section>

          </div>
        </div>

        <Menu
          innerClassName="menu__inner--profile"
          isSticky={ menu.isSticky }
          outerClassName="menu--profile"
        >
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
  user: PropTypes.object.isRequired,
  userCollection: PropTypes.object.isRequired
}
