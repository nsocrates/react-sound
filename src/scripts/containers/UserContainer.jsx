// import Waypoint from 'components/Waypoint'
// import { bindActionCreators } from 'redux'
// import Button from 'components/Button'
import Loader from 'components/Loader'
import End from 'components/End'
import Canvas from 'components/Canvas'
import Main from 'components/Main'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { IMG_FORMAT } from 'constants/ItemLists'
import { loadUser } from 'actions/user'
import MediaItem from 'components/MediaItem'
import Card from 'components/Card'
import { trackFactory } from 'utils/Utils'
import Tag from 'components/Tag'

class UserContainer extends React.Component {

  componentDidMount() {
    const { dispatch, location } = this.props

    dispatch(loadUser(location.query.q))
  }

  render() {
    const { location, userEntity, trackEntity, tracksByUser } = this.props
    const user = userEntity[location.query.q]

    if (!user) {
      return <Loader className="loader--center" />
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

    const renderWebIcons = () => {
      if (user.web_profiles) {
        const { web_profiles } = user
        return web_profiles.map((item, index) => {
          const { service, url, id } = item
          let icon

          switch (service) {
            case 'facebook':
              icon = 'fa-facebook-official'
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

    const renderCards = () => {
      if (tracksByUser[user.id]) {
        const tracks = tracksByUser[user.id]
        const { ids } = tracks

        return ids.map((item, index) => {
          const obj = {
            userEntity,
            trackEntity,
            trackId: item
          }
          const trackData = trackFactory(obj)

          const renderTags = () => {
            if (trackData.tags) {
              return trackData.tags.map((tag, idx) => {
                if (idx < 10) {
                  return (
                    <Tag
                      key={`tag__${idx}_${tag}`}
                      text={ tag }
                    />
                  )
                }
              })
            }
          }

          return (
            <Card
              byline={ trackData.user.name }
              imgUrl={ trackData.getArtwork(IMG_FORMAT.XLARGE) }
              key={ `user_card__${index}_${item}` }
              title={ trackData.track.name }
            >
              <ul className="tags">
                { renderTags() }
              </ul>
            </Card>
          )
        })
      }
    }

    return (
      <Main className="main--user">

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
                        <h3 className="user__stats--value">{ followers_count }</h3>
                      </a>
                    </td>
                    <td className="user__stats--td">
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Following"}</h6>
                        <h3 className="user__stats--value">{ followings_count }</h3>
                      </a>
                    </td>
                    <td className="user__stats--td">
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Tracks"}</h6>
                        <h3 className="user__stats--value">{ track_count }</h3>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

            </section>{/*-- !User Info --*/}
            {/*-- User Social Media --*/}
            <ul className="user__social-media">
              { renderWebIcons() }
            </ul>{/*-- !User Social Media --*/}
          </div>{/*-- !Profile --*/}
        </div>{/*-- !Banner --*/}

        {/*-- Page Container --*/}
        <div className="user__container">

          {/*-- Menu --*/}
          <section className="menu menu--profile">
            <ul className="menu__inner menu__inner--profile">

              <li className="menu__item menu__item--profile">
                <a className="menu__link menu__link--active" href="#">
                  <i className="menu__icon fa fa-eye" />
                  <span className="menu__text">{"View All"}</span>
                </a>
              </li>

              <li className="menu__item">
                <a className="menu__link" href="#">
                  <i className="menu__icon fa fa-caret-square-o-right" />
                  <span className="menu__text">{"Tracks"}</span>
                </a>
              </li>

              <li className="menu__item">
                <a className="menu__link" href="#">
                  <i className="menu__icon fa fa-list" />
                  <span className="menu__text">{"Playlists"}</span>
                </a>
              </li>

              <li className="menu__item">
                <a className="menu__link" href="#">
                  <i className="menu__icon fa fa-heart" />
                  <span className="menu__text">{"Favorites"}</span>
                </a>
              </li>
            </ul>
          </section>{/*-- !Menu --*/}

          {/*-- Card --*/}
          <section className="card">

            { renderCards() }

          </section>{/*-- !Card --*/}
{/*          <Loader className="loader--end" />
          <End className="rw__end rw__end--gallery" />*/}
        </div>{/*-- !Page Container --*/}
      </Main>
    )
  }
}

UserContainer.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
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
    router: { location },
    app: {
      requested,
      partition: { tracksByUser },
      entities: { users, tracks }
    }
  } = state

  return {
    location,
    requested,
    tracksByUser,
    userEntity: users,
    trackEntity: tracks
  }
}

export default connect(mapStateToProps)(UserContainer)
