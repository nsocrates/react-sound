import React, { PropTypes } from 'react'

import Canvas from 'components/Canvas'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import WebIcon from 'components/WebIcon'
import Menu from 'components/Menu'
import Waypoint from 'components/Waypoint'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { IMG_FORMAT, IMG_FALLBACK } from 'constants/ItemLists'
import { loadUser } from 'actions/user'
import { triggerStickyMenu } from 'actions/ui'
import { kFormatter } from 'utils/Utils'


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

    return dispatch(loadUser(params.id))
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
      userEntity,
      params,
      shouldPlay,
      menu,
      routes
    } = this.props

    const user = userEntity[params.id]

    if (!user) {
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

    const avatarUrl = avatar_url
                        ? avatar_url.replace(/large/, IMG_FORMAT.LARGE)
                        : IMG_FALLBACK.AVATAR.LARGE

    const renderLocation = () => {
      if (city || country) {
        return (
          <h5 className="profile__text--byline">
            <i className="user__icon user__icon--map-marker fa fa-map-marker" />
            { city && country ? `${city}, ${country}` : country || city }
          </h5>
        )
      }

      return <hr className="invis" />
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
        const currPath = routes[routes.length - 1].path
        const isActive = classNames('menu__link menu__link--profile', {
          'menu__link--active': currPath === item.text.toLowerCase()
                                || !currPath && item.text === 'Bio'
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
      if (user.web_profiles) {
        const { web_profiles } = user
        return web_profiles.map((item, index) => {
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
      }
    }

    return (
      <Main
        className="main__user"
        shouldPush={ shouldPlay }
      >

        {/*-- Banner --*/}
        <div className="canvas-container">

          <Canvas
            className="canvas canvas--user"
            gradientColors={ gradientColors }
          />

          {/*-- Profile --*/}
          <div className="profile">

            <section className="profile__section profile__section--cover">
              <a
                className="profile__cover avatar"
                href={ website || permalink_url }
                target="_blank"
              >
                <img
                  className="avatar__img"
                  onError={ this.handleError_img }
                  src={ avatarUrl }
                />
              </a>
            </section>

            {/*-- User Info --*/}
            <section className="profile__section profile__section--data">

              <article className="profile__textarea">
                <h2 className="profile__text--headline">
                  { full_name || username }
                </h2>
                <h4 className="profile__text--lead">
                  { username }
                </h4>
                { renderLocation() }
              </article>
              <hr className="invis" />

              <table className="user__stats">
                <tbody>
                  <tr>
                    <td className="user__stats--td">
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Followers"}</h6>
                        <h3 className="user__stats--value">{ kFormatter(followers_count) }</h3>
                      </a>
                    </td>
                    <td className="user__stats--td">
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Following"}</h6>
                        <h3 className="user__stats--value">{ kFormatter(followings_count) }</h3>
                      </a>
                    </td>
                    <td className="user__stats--td">
                      <LinkItem
                        className="user__link user__link--stats"
                        to={ `#user/${params.id}/tracks` }
                      >
                        <h6 className="user__stats--title">{"Tracks"}</h6>
                        <h3 className="user__stats--value">{ kFormatter(track_count) }</h3>
                      </LinkItem>
                    </td>
                  </tr>
                </tbody>
              </table>

            </section>{/*-- !User Info --*/}

            {/*-- User Social Media --*/}
            <ul className="user__action-bar user__action-bar--social-media web-icon__list">
              { renderWebIcons() }
            </ul>{/*-- !User Social Media --*/}

            <a
              className="user__action-bar user__action-bar--soundcloud"
              href={ permalink_url }
              target="_blank"
            >
              <img className="user__soundcloud--img" src="https://developers.soundcloud.com/assets/logo_white-af5006050dd9cba09b0c48be04feac57.png" />
            </a>

          </div>{/*-- !Profile --*/}
        </div>{/*-- !Banner --*/}

        {/*-- Menu --*/}
        <Menu
          innerClassName="menu__inner--profile"
          isSticky={ menu.isSticky }
          outerClassName="menu--profile"
        >
          { renderMenuItems() }
        </Menu>{/*-- !Menu --*/}

        {/*-- Page Container --*/}
        <div className="menu__sibling user__container">
          <Waypoint
            className="waypoint"
            onEnter={ this.handleWaypointEvent }
            onLeave={ this.handleWaypointEvent }
            triggerFrom="above"
          />
          { this.props.children }
        </div>{/*-- !Page Container --*/}
      </Main>
    )
  }
}

UserContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  menu: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  shouldPlay: PropTypes.bool,
  streamTrackId: PropTypes.number,
  trackEntity: PropTypes.object,
  tracksByUser: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    app: {
      partition: { tracksByUser },
      entities: { users, tracks },
      media: {
        stream: { trackId, shouldPlay },
        player: {
          audio: { isPlaying }
        }
      },
      ui: { menu }
    }
  } = state

  return {
    isPlaying,
    location,
    menu,
    shouldPlay,
    tracksByUser,
    userEntity: users,
    trackEntity: tracks,
    streamTrackId: trackId
  }
}

export default connect(mapStateToProps)(UserContainer)
