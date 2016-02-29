import React, { PropTypes } from 'react'

import Canvas from 'components/Canvas'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { IMG_FALLBACK } from 'constants/ItemLists'
import { loadTrack, loadTrackComments } from 'actions/track'
import { timeFactory, trackFactory, getCover, kFormatter, dtFormatter, markNumber } from 'utils/Utils'
import { requestStream } from 'actions/stream'
import Tag from 'components/Tag'
import Comment from 'components/Comment'
import Article from 'components/Article'
import Pagination from 'components/Pagination'
import PaginationItem from 'components/PaginationItem'

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
    return dispatch(loadTrack(params.id))
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
      params,
      shouldPlay,
      trackObject,
      routes,
      dispatch,
      commentsByTrack
    } = this.props

    if (!trackObject) {
      return <Loader className="loader--top" />
    }

    const trackFactoryArgs = {
      userEntity,
      mediaObject: trackObject
    }
    const mediaData = trackFactory(trackFactoryArgs)
    const userAvatar = getCover(userEntity[trackObject.user_id].avatar_url)
    const trackComments = commentsByTrack[params.id]

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
      if (!trackComments) {
        return <Loader className="loader--bottom" />
      }

      if (!trackComments.ids.length) {
        return (
        <p className="article__paragraph--none">
          { "NO COMMENTS TO DISPLAY." }
        </p>
        )
      }

      return trackComments.ids.map((id, index) => {
        const { comments } = trackObject
        const comment = comments[id]
        const user = userEntity[comment.user]

        const avatar = getCover(user.avatar_url)
        const createdAt = dtFormatter(comment.created_at)
        const timestamp = timeFactory(comment.timestamp / 1000).getFormatted()

        return (
          <Comment
            at={ createdAt }
            avatar={ avatar.badge }
            body={ comment.body }
            by={ user.username }
            key={`track_comment__${comment.id}_${index}`}
            timestamp={ timestamp }
            userId={ user.id }
          />
        )
      })
    }

    const shouldRenderPagination = () => {
      if (mediaData.stats.comments > 24 && trackComments && !!trackComments.ids.length) {
        const pages = Math.ceil(mediaData.stats.comments / 24)
        const re = /(&offset=)(\d*)/i
        const nextOffset = parseInt(re.exec(trackComments.next_href)[2], 10)
        const hasPrev = nextOffset - 48 >= 0
                      ? trackComments.next_href.replace(re, `$1${nextOffset - 48}`)
                      : null
        // const offsets = []
        // for (let i = 1; i <= pages; i++) {
        //   offsets.push(i * 24)
        // }
// 'https://api.soundcloud.com/tracks/176405526/comments?client_id=178cca51f2fb0a81487dc7aafafb4787&limit=24&linked_partitioning=1&offset=24'
        const handleToNext = e => {
          e.preventDefault()

          return dispatch(loadTrackComments(params.id))
        }

        const handleToPrev = e => {
          e.preventDefault()

          return dispatch(loadTrackComments(params.id, hasPrev))
        }

        const _renderPaginationItems = () => {
          const offsets = []
          for (let i = 0; i <= pages; i++) {
            offsets.push(i * 24)
          }
console.log(offsets)
          return offsets.map((offset, index) => {
            const endpoint = trackComments.next_href.replace(re, `$1${offset}`)
            const isCurrent = offset === nextOffset - 24

            const _handleClick = e => {
              e.preventDefault()
              return dispatch(loadTrackComments(params.id, endpoint))
            }

            if (index < 9) {
              return (
                <PaginationItem
                  index={ index + 1 }
                  isCurrent={ isCurrent }
                  key={`pagination__${offset}_${index + 1}`}
                  onClick={ _handleClick }
                />
              )
            }

            if (index === 9) {
              return (
                <PaginationItem
                  index={ index + 1 }
                  isCurrent={ isCurrent }
                  isEllipsis
                  key={`pagination__${offset}_${index}`}
                  onClick={ _handleClick }
                />
              )
            }

            if (index === offsets.length - 1) {
              return (
                <PaginationItem
                  index={ index + 1 }
                  isCurrent={ isCurrent }
                  key={`pagination__${offset}_${index}`}
                  onClick={ _handleClick }
                />
              )
            }
          })
        }

        return (
          <Pagination
            next={ !!trackComments.next_href }
            onNext={ handleToNext }
            onPrev={ handleToPrev }
            prev={ hasPrev }
          >
            { _renderPaginationItems() }
          </Pagination>
        )
      }
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
          />

          <div className="waveform">
            <img className="waveform__img" src={ trackObject.waveform_url} />
          </div>

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

        {/*-- Content --*/}
        <div className="user__container">

          {/*-- Track Description --*/}
          <section className="track">
            <LinkItem className="track__cover avatar" to={`#user/${mediaData.user.id}`}>
              <img className="avatar__img" src={ userAvatar.default } />
            </LinkItem>
            <div className="track__data">
              <Article
                article={ trackObject.description }
                missing="TRACK DOES NOT HAVE A DESCRIPTION."
                missingClassName="article__none article__none--track"
                wrapperClassName="track__article"
              />
            </div>
          </section>{/*-- !Track Description --*/}

          {/*-- Comments --*/}
          <section className="comment-wrapper">
            <div className="comment__head">
              <h6>
                <i className="fa fa-comment-o"/>
                {` ${markNumber(mediaData.stats.comments)} COMMENTS`}
              </h6>
            </div>
            { renderComments() }

            {/*-- Pagination --*/}
            { shouldRenderPagination() }

          </section>{/*-- !Comments --*/}

        </div>{/*-- !Content --*/}
      </Main>
    )
  }
}

TrackContainer.propTypes = {
  commentsByTrack: PropTypes.object,
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  menu: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  shouldPlay: PropTypes.bool,
  streamTrackId: PropTypes.number,
  trackObject: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    router: { location: { pathname }},
    app: {
      partition: { commentsByTrack },
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
    commentsByTrack,
    userEntity: users,
    streamTrackId: trackId,
    trackObject: tracks[pathname.split('/')[1]]
  }
}

export default connect(mapStateToProps)(TrackContainer)
