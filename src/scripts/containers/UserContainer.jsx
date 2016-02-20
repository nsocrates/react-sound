// import Waypoint from 'components/Waypoint'
// import { bindActionCreators } from 'redux'
// import Button from 'components/Button'
import React, { PropTypes } from 'react'

import Canvas from 'components/Canvas'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import MediaItem from 'components/MediaItem'
import { connect } from 'react-redux'
import { IMG_FORMAT } from 'constants/ItemLists'
import { loadUser } from 'actions/user'
import { push } from 'react-router-redux'
import { kFormatter } from 'utils/Utils'


class UserContainer extends React.Component {

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props

    dispatch(loadUser(params.id))
  }

  render() {
    const {
      userEntity,
      dispatch,
      params,
      shouldPlay
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

    const avatarUrl = avatar_url.replace(/large/, IMG_FORMAT.LARGE)

    const renderLocation = () => {
      if (city || country) {
        return (
          <h5 className="user__details--location">
            <i className="user__icon user__icon--map-marker fa fa-map-marker" />
            { city && country ? `${city}, ${country}` : country || city }
          </h5>
        )
      }
    }

    const renderMenuItems = () => {
      const itemList = [
        { text: 'Description',
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
        const _handleClick = e => {
          e.preventDefault()

          dispatch(push({ pathname: item.path }))
        }

        return (
          <li
            className="menu__item"
            key={`menu__${item.text}_${index}`}
          >
            <LinkItem
              className="menu__link menu__link--profile"
              onClick={ _handleClick }
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
            <MediaItem
              href={ url }
              iconClassName={ `user__icon user__icon--${service} fa ${icon}` }
              key={`web_profile__${index}_${id}`}
              linkClassName="user__link user__link--social-media"
              listClassName="user__social-media--item"
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
        <div className="user__splash">

          <div className="user__canvas">
            <Canvas className="user__canvas--inner" />
          </div>

          {/*-- Profile --*/}
          <div className="user__profile">

            <section className="user__avatar">
              <a
                className="user__link user__link--avatar"
                href={ website || permalink_url }
              >
                <img
                  className="user__avatar--img"
                  src={ avatarUrl }
                />
              </a>
            </section>

            {/*-- User Info --*/}
            <section className="user__info">

              <article className="user__details">
                <h1 className="user__details--fullname">
                  { full_name || username }
                </h1>
                <h4 className="user__details--username">
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
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Tracks"}</h6>
                        <h3 className="user__stats--value">{ kFormatter(track_count) }</h3>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

            </section>{/*-- !User Info --*/}

            {/*-- User Social Media --*/}
            <ul className="user__action user__action--social-media user__social-media">
              { renderWebIcons() }
            </ul>{/*-- !User Social Media --*/}

            <a className="user__action user__action--soundcloud" href={ permalink_url }>
              <img className="user__soundcloud--img" src="https://developers.soundcloud.com/assets/logo_white-af5006050dd9cba09b0c48be04feac57.png" />
            </a>

          </div>{/*-- !Profile --*/}
        </div>{/*-- !Banner --*/}

        {/*-- Page Container --*/}
        <div className="user__container">

          {/*-- Menu --*/}
          <section className="menu menu--profile">
            <ul className="menu__inner menu__inner--profile">
              { renderMenuItems() }
            </ul>
          </section>{/*-- !Menu --*/}

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
  params: PropTypes.object,
  shouldPlay: PropTypes.bool,
  streamTrackId: PropTypes.number,
  trackEntity: PropTypes.object,
  tracksByUser: PropTypes.object,
  userEntity: PropTypes.object
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({
//       triggerSticky
//     }, dispatch)
//   }
// }

function mapStateToProps(state) {
  const {
    app: {
      requested,
      partition: { tracksByUser },
      entities: { users, tracks },
      media: {
        stream: { trackId, shouldPlay },
        player: {
          audio: { isPlaying }
        }
      }
    }
  } = state

  return {
    location,
    requested,
    tracksByUser,
    userEntity: users,
    trackEntity: tracks,
    streamTrackId: trackId,
    shouldPlay,
    isPlaying
  }
}

export default connect(mapStateToProps)(UserContainer)
