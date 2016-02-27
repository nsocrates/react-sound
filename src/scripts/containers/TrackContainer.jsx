import React, { PropTypes } from 'react'

import Canvas from 'components/Canvas'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { IMG_FORMAT, IMG_FALLBACK } from 'constants/ItemLists'
import { loadTrackComments, loadTrack } from 'actions/track'
import { timeFactory, trackFactory, getCover, kFormatter, dtFormatter } from 'utils/Utils'
import { requestStream } from 'actions/stream'
import Tag from 'components/Tag'
import Comment from 'components/Comment'
import Article from 'components/Article'

class TrackContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleError_img = this.handleError_img.bind(this)
    this.handleClick_stream = this.handleClick_stream.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props

    dispatch(loadTrack(params.id))
    dispatch(loadTrackComments(params.id))
  }

  handleClick_stream(e) {
    e.preventDefault()

    const { dispatch, params } = this.props
    return dispatch(requestStream(params.id))
  }

  handleError_img(e) {
    const { currentTarget } = e
    currentTarget.src = IMG_FALLBACK.PLACEHOLDER.LARGE

    return currentTarget
  }

  render() {
    const {
      userEntity,
      trackEntity,
      params,
      shouldPlay,
      routes
    } = this.props

    if (!trackEntity[params.id] || !trackEntity[params.id].comments) {
      return <Loader className="loader--top" />
    }

    const track = trackEntity[params.id]
    const trackFactoryArgs = {
      userEntity,
      mediaEntity: trackEntity,
      id: params.id
    }
    const mediaData = trackFactory(trackFactoryArgs)
    const userAvatar = getCover(userEntity[track.user_id].avatar_url)

    const renderHashTags = () => (
      mediaData.genre.map((genre, index) => {
        const location = {
          pathname: '#genre',
          query: {
            q: genre
          }
        }

        return (
          <li
            className="stats__item"
            key={`hashtag__${index}_${genre}`}
          >
            <LinkItem
              className="stats__link stats__link--hashtag"
              location={ location }
              to={"#genre"}
            >
              <i className="stats__icon fa fa-hashtag"/>
              { mediaData.genre }
            </LinkItem>
          </li>
        )
      })
    )

    const renderTags = () => (
      mediaData.tags.map((tag, idx) => (
        <Tag
          key={`tag__${idx}_${tag}`}
          modifier="profile"
          text={ tag }
        />
      ))
    )

    const renderComments = () => {
      const { comments } = track

      return comments.map((comment, index) => {
        const avatar = getCover(comment.user.avatar_url)
        const createdAt = dtFormatter(comment.created_at)
        const timestamp = timeFactory(comment.timestamp / 1000).getFormatted()

        return (
          <Comment
            at={ createdAt }
            avatar={ avatar.badge }
            body={ comment.body }
            by={ comment.user.username }
            key={`track_comment__${comment.id}_${index}`}
            timestamp={ timestamp }
            userId={ comment.user.id }
          />
        )
      })
    }

    const gradientColors = [
      { offset: 0, color: '#C9FFBF' },
      { offset: 1, color: '#FFAFBD' }
    ]

    return (
      <Main
        className="main__track"
        shouldPush={ shouldPlay }
      >
        {/*-- Banner --*/}
        <div className="canvas-container">

          <Canvas
            className="canvas canvas--track"
            gradientColors={ gradientColors }
            // imgSrc={ track.waveform_url }
          />

          {/*-- Profile --*/}
          <div className="profile">

            <section className="profile__section profile__section--cover">
              <a
                className="profile__cover artwork artwork__wrapper"
                href="#"
                onClick={ this.handleClick_stream }
              >
                <img
                  className="artwork__img"
                  onError={ this.handleError_img }
                  src={ mediaData.artwork.large }
                />
                <aside className="artwork__filter" />
              </a>
            </section>

            {/*-- Track Info --*/}
            <section className="profile__section profile__section--data">
              <article className="profile__textarea">
                <h2 className="profile__text--headline">
                  { mediaData.media.name }
                </h2>
                <h4 className="profile__text--lead">
                  <LinkItem to={`#user/${mediaData.user.id}`}>
                    { mediaData.user.name }
                  </LinkItem>
                </h4>
              </article>
              <hr className="invis" />

              <ul className="stats">
                <li className="stats__item">{ mediaData.createdAt }</li>
                <li className="stats__item">
                  <i className="stats__icon fa fa-heart"/>
                  { kFormatter(mediaData.stats.favorites) }
                </li>
                <li className="stats__item">
                  <i className="stats__icon fa fa-play"/>
                  { kFormatter(mediaData.stats.plays) }
                </li>
                <li className="stats__item">
                  <i className="stats__icon fa fa-comments"/>
                  { kFormatter(mediaData.stats.comments) }
                </li>
                { renderHashTags() }
              </ul>
              <hr className="invis" />

              <ul className="tags">
                { renderTags() }
              </ul>
            </section>

          </div>{/*-- !Profile --*/}
        </div>{/*-- !Banner --*/}

        <div className="user__container">

          <section className="track">
{/*            <a className="track__cover avatar" href="#">
              <img className="avatar__img" src={ userAvatar.default } />
            </a>*/}
            <div className="track__data">
              <Article
                article={ track.description }
                missing="Track does not have a description."
                wrapperClassName="track__article"
              />
            </div>
          </section>

          <section className="comment-wrapper">
            { renderComments() }
          </section>
        </div>
      </Main>
    )
  }
}

TrackContainer.propTypes = {
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

export default connect(mapStateToProps)(TrackContainer)
