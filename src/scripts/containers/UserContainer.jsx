// import Waypoint from 'components/Waypoint'
// import { bindActionCreators } from 'redux'
import Button from 'components/Button'
import Main from 'components/Main'
import React from 'react'
import { connect } from 'react-redux'
import { IMG_FORMAT, IMG_FALLBACK } from 'constants/ItemLists'
import { loadUser } from 'actions/user'

class UserContainer extends React.Component {

  componentDidMount() {
    const { dispatch, location } = this.props

    this.drawCanvas()
    dispatch(loadUser(location.query.q))
  }

  drawCanvas() {
    const { _canvas } = this
    const { width, height } = _canvas
    const ctx = _canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, height, 0)
    gradient.addColorStop(0,'rgba(38, 39, 40, 0.5)')
    gradient.addColorStop(1,'rgba(255, 255, 255, 0.5)')

    ctx.fillStyle = gradient
    return ctx.fillRect(0, 0, width, height)
  }

  render() {
    const { location, userEntity } = this.props
    // const avatarUrl = userEntity[location.query.q].avatar_url.replace(/large/, IMG_FORMAT.LARGE)
    const canvasRef = ref => this._canvas = ref

    return (
      <Main className="user">

        {/*-- Banner --*/}
        <div className="user__splash">

          <div className="user__canvas">
            <canvas
              className="user__canvas--inner"
              height="100%"
              ref={ canvasRef }
              width="100%"
            />
          </div>

          {/*-- Profile --*/}
          <div className="user__profile">

            <section className="user__avatar">
              <a className="user__link user__link--avatar" href="#">
                <img
                  className="user__avatar--img"
                  src={ IMG_FALLBACK.LARGE }
                  // src={ avatarUrl }
                />
              </a>
            </section>

            {/*-- User Info --*/}
            <section className="user__info">

              <article className="user__details">
                <h1 className="user__details--fullname">
                  {"Full Name"}
                </h1>
                <h4 className="user__details--username">
                  {"UserName"}
                </h4>
                <h5 className="user__details--country">
                  <i className="user__icon user__icon--map-marker fa fa-map-marker" />
                  {"Country"}
                </h5>
              </article>

              <table className="user__stats">
                <tbody>
                  <tr>
                    <td className="user__stats--td">
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Followers"}</h6>
                        <h3 className="user__stats--value">{"24"}</h3>
                      </a>
                    </td>
                    <td className="user__stats--td">
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Following"}</h6>
                        <h3 className="user__stats--value">{"12"}</h3>
                      </a>
                    </td>
                    <td className="user__stats--td">
                      <a className="user__link user__link--stats" href="#">
                        <h6 className="user__stats--title">{"Tracks"}</h6>
                        <h3 className="user__stats--value">{"7"}</h3>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

            </section>{/*-- !User Info --*/}

            {/*-- User Social Media --*/}
            <ul className="user__social-media">

              <li className="user__social-media--item user__social-media--facebook">
                <a className="user__link user__link--social-media" href="#">
                  <i className="user__icon user__icon--facebook fa fa-facebook-official" />
                </a>
              </li>

              <li className="user__social-media--item user__social-media--twitter">
                <a className="user__link user__link--social-media" href="#">
                  <i className="user__icon user__icon--twitter fa fa-twitter-square" />
                </a>
              </li>

              <li className="user__social-media--item user__social-media--instagram">
                <a className="user__link user__link--social-media" href="#">
                  <i className="user__icon user__icon--instagram fa fa-instagram" />
                </a>
              </li>

              <li className="user__social-media--item user__social-media--youtube">
                <a className="user__link user__link--social-media" href="#">
                  <i className="user__icon user__icon--youtube fa fa-youtube-square" />
                </a>
              </li>

            </ul>{/*-- !User Social Media --*/}
          </div>{/*-- !Profile --*/}
        </div>{/*-- !Banner --*/}

        {/*-- Page Container --*/}
        <div className="user__container">

          {/*-- Menu --*/}
          <section className="menu">
            <ul className="menu__inner">

              <li className="menu__item">
                <a className="menu__link" href="#">
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

            <article className="card__item">
              <div className="card__cover">
                <a className="card__cover--link" href="#">
                  <img
                    className="card__cover--img"
                    src={ IMG_FALLBACK.LARGE }
                  />
                </a>
              </div>
              <div className="card__content">
                <h5>{"Article Title"}</h5>
              </div>
            </article>

            <article className="card__item">
              <div className="card__cover">
                <a className="card__cover--link" href="#">
                  <img
                    className="card__cover--img"
                    src={ IMG_FALLBACK.LARGE }
                  />
                </a>
              </div>
              <div className="card__content">
                <h5>{"Article Title"}</h5>
              </div>
            </article>

            <article className="card__item">
              <div className="card__cover">
                <a className="card__cover--link" href="#">
                  <img
                    className="card__cover--img"
                    src={ IMG_FALLBACK.LARGE }
                  />
                </a>
              </div>
              <div className="card__content">
                <h5>{"Article Title"}</h5>
              </div>
            </article>

            <article className="card__item">
              <div className="card__cover">
                <a className="card__cover--link" href="#">
                  <img
                    className="card__cover--img"
                    src={ IMG_FALLBACK.LARGE }
                  />
                </a>
              </div>
              <div className="card__content">
                <h5>{"Article Title"}</h5>
              </div>
            </article>

          </section>{/*-- !Card --*/}
        </div>{/*-- !Page Container --*/}
      </Main>
    )
  }
}

UserContainer.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({
//       triggerSticky
//     }, dispatch)
//   }
// }

function mapStateToProps(state) {
  const { router: { location }, app: { requested, entities: { users, tracks }}} = state

  return {
    location,
    requested,
    userEntity: users,
    trackEntity: tracks
  }
}

export default connect(mapStateToProps)(UserContainer)
