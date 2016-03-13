import React, { PropTypes } from 'react'

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
import { connect } from 'react-redux'
import { IMG_FORMAT, IMG_FALLBACK } from 'constants/ItemLists'
import { loadUser, resolveUser } from 'actions/user'
import { triggerStickyMenu } from 'actions/ui'

class UserContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleError_img = this.handleError_img.bind(this)
    this.handleWaypointEvent = this.handleWaypointEvent.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  componentWillUnmount() {
    return this.dispatchStickyMenu(false)
  }

  updateComponent() {
    const { dispatch, params } = this.props

    return /^\d+$/.test(params.id)
      ? dispatch(loadUser(params.id))
      : dispatch(resolveUser(params.id))
  }

  dispatchStickyMenu(shouldStick) {
    const { dispatch } = this.props

    return dispatch(triggerStickyMenu(shouldStick))
  }

  handleWaypointEvent() {
    const { menu } = this.props

    return this.dispatchStickyMenu(!menu.isSticky)
  }

  handleError_img(e) {
    const { currentTarget } = e
    currentTarget.src = IMG_FALLBACK.AVATAR.LARGE

    return currentTarget
  }

  render() {
    const {
      user,
      params,
      shouldPlay,
      menu,
      currPath
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
        pathname: `#user/${params.id}/followers`
      },
      {
        title: 'Following',
        value: followings_count,
        pathname: `#user/${params.id}/following`
      },
      {
        title: 'Tracks',
        value: track_count,
        pathname: `#user/${params.id}/tracks`
      }
    ]

    const avatarUrl = avatar_url
                        ? avatar_url.replace(/large/, IMG_FORMAT.LARGE)
                        : IMG_FALLBACK.AVATAR.LARGE

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
          path: `#user/${params.id}` },

        { text: 'Tracks',
          icon: 'fa-caret-square-o-right',
          path: `#user/${params.id}/tracks` },

        { text: 'Playlists',
          icon: 'fa-list',
          path: `#user/${params.id}/playlists` },

        { text: 'Favorites',
          icon: 'fa-heart',
          path: `#user/${params.id}/favorites` }
      ]

      return itemList.map((item, index) => {
        const isActive = classNames('menu__link menu__link--profile', {
          'menu__link--active': currPath === item.text.toLowerCase()
        })

        return (
          <li
            className="menu__item menu__item--profile"
            key={`menu__${item.text}_${index}`}
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

        {/* -- Banner --*/}
        <div className="canvas-container">

          <CanvasGradient
            className="canvas canvas--translucent"
            colors={ gradientColors }
          />

          {/* -- Profile --*/}
          <div className="profile">

            <ProfileCover
              anchorClassName="profile__cover avatar"
              href={ website || permalink_url }
              imgClassName="avatar__img"
              src={ avatarUrl }
            />

            {/* -- User Info --*/}
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

            </section>{/* -- !User Info --*/}

            {/* -- User Social Media --*/}
            { renderWebIcons() }
            {/* -- !User Social Media --*/}

            <a
              className="interact-bar interact-bar__link-to-sc"
              href={ permalink_url }
              target="_blank"
            >
              <i className="interact-bar__icon fa fa-soundcloud" />
              <strong className="interact-bar__text">{" SOUNDCLOUD"}</strong>
            </a>

          </div>{/* -- !Profile --*/}
        </div>{/* -- !Banner --*/}

        {/* -- Menu --*/}
        <Menu
          innerClassName="menu__inner--profile"
          isSticky={ menu.isSticky }
          outerClassName="menu--profile"
        >
          { renderMenuItems() }
        </Menu>{/* -- !Menu --*/}

        {/* -- Page Container --*/}
        <div className="menu__sibling main__container main__container--main">
          <Waypoint
            className="waypoint"
            onEnter={ this.handleWaypointEvent }
            onLeave={ this.handleWaypointEvent }
            triggerFrom="above"
          />
          { this.props.children }
        </div>{/* -- !Page Container --*/}
      </Main>
    )
  }
}

UserContainer.propTypes = {
  children: PropTypes.node.isRequired,
  currPath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  menu: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  shouldPlay: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    app: {
      entities: { users },
      media: {
        stream: { shouldPlay },
        player: {
          audio: { isPlaying }
        }
      },
      ui: { menu }
    }
  } = state
  const { routes, params: { id } } = ownProps

  return {
    isPlaying,
    menu,
    shouldPlay,
    user: users[id] || {},
    currPath: routes[routes.length - 1].path || 'bio'
  }
}

export default connect(mapStateToProps)(UserContainer)
