// import Waypoint from 'components/Waypoint'
// import { bindActionCreators } from 'redux'
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
              <a className="user__avatar--link" href="#">
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
                <h3 className="user__details--username">
                  {"UserName"}
                </h3>
                <h5 className="user__details--country">
                  <i className="user__icon user__icon--map-marker fa fa-map-marker" />
                  {"Country"}
                </h5>
              </article>

              <table className="user__stats">
                <tbody>
                  <tr>
                    <td className="user__stats--td">
                      <h5 className="user__stats--title">{"Followers"}</h5>
                      <h5 className="user__stats--value">{"24"}</h5>
                    </td>
                    <td className="user__stats--td">
                      <h5 className="user__stats--title">{"Following"}</h5>
                      <h5 className="user__stats--value">{"12"}</h5>
                    </td>
                    <td className="user__stats--td">
                      <h5 className="user__stats--title">{"Tracks"}</h5>
                      <h5 className="user__stats--value">{"7"}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>

              <ul className="user__social-media">
                <li className="user__social-media--item user__social-media--facebook">
                  <a className="user__social-media--link" href="#">
                    <i className="user__icon user__icon--facebook fa fa-facebook-official" />
                  </a>
                </li>
                <li className="user__social-media--item user__social-media--twitter">
                  <a className="user__social-media--link" href="#">
                    <i className="user__icon user__icon--twitter fa fa-twitter-square" />
                  </a>
                </li>
                <li className="user__social-media--item user__social-media--instagram">
                  <a className="user__social-media--link" href="#">
                    <i className="user__icon user__icon--instagram fa fa-instagram" />
                  </a>
                </li>
                <li className="user__social-media--item user__social-media--youtube">
                  <a className="user__social-media--link" href="#">
                    <i className="user__icon user__icon--youtube fa fa-youtube-square" />
                  </a>
                </li>
              </ul>

            </section>{/*-- !User Info --*/}
          </div>{/*-- !Profile --*/}
        </div>{/*-- !Banner --*/}
        <div className="user__container" />
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
