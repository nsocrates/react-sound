import React, { PropTypes } from 'react'

import ArticleContent from 'components/ArticleContent'
import Body from 'components/Body'
import CanvasGradient from 'components/CanvasGradient'
import CollapseView from 'components/CollapseView'
import Comment from 'components/Comment'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import Pagination from 'components/Pagination'
import PaginationItem from 'components/PaginationItem'
import ProfileCover from 'components/ProfileCover'
import StatsList from 'components/StatsList'
import Taglist from 'components/Taglist'
import { connect } from 'react-redux'
import { IMG_FALLBACK } from 'constants/ItemLists'
import { loadTrack, loadTrackComments } from 'actions/track'
import { requestStream } from 'actions/stream'
import { timeFactory, trackFactory, getCover, dtFormatter, markNumber, constructUrl } from 'utils/Utils'

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
      dispatch,
      commentsByTrack
    } = this.props

    if (!trackObject) {
      return <Loader className="loader--top" />
    }

    const trackFactoryArgs = {
      userObject: userEntity[trackObject.user_id],
      mediaObject: trackObject
    }
    const mediaData = trackFactory(trackFactoryArgs)
    const userAvatar = getCover(userEntity[trackObject.user_id].avatar_url)
    const trackComments = commentsByTrack[params.id]
    const statsListItems = [
      {
        text: mediaData.createdAt
      }, {
        icon: 'fa fa-heart',
        value: mediaData.stats.favorites
      }, {
        icon: 'fa fa-play',
        value: mediaData.stats.plays
      }, {
        icon: 'fa fa-comments',
        value: mediaData.stats.comments
      }
    ]

    const gradientColors = [
      { offset: 0, color: '#e55d87' },
      { offset: 1, color: '#5fc3e4' }
    ]

    const articleContent = ref => this._articleContent = ref
    const renderComments = () => {
      const { pagination } = this.props

      if (!trackComments || trackComments.isFetching || pagination.id !== trackObject.id) {
        return <Loader className="loader--bottom" />
      }

      if (!trackComments.ids.length || !pagination.result.length) {
        return (
        <p className="article__none">
          { "NO COMMENTS TO DISPLAY." }
        </p>
        )
      }

      return pagination.result.map((id, index) => {
        const { comments: { [id]: comment } } = trackObject
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
            index={ index }
            key={`track__comment--${comment.id}_${index}`}
            timestamp={ timestamp }
            userId={ user.id }
          />
        )
      })
    }

    const shouldRenderPagination = () => {
      if (mediaData.stats.comments > 24 && trackComments && !!trackComments.ids.length) {
        const { offset } = commentsByTrack[params.id]
        const endpoint = `/tracks/${params.id}/comments?`
        const url = trackComments.next_href || `${constructUrl(endpoint)}&offset=${offset + 24}`
        const pages = Math.ceil(mediaData.stats.comments / 24)
        const re = /(&offset=)(\d*)/i
        const nextOffset = parseInt(re.exec(url)[2], 10)
        const prevOffset = nextOffset - 48
        const prevHref = nextOffset - 48 >= 0
                      ? url.replace(re, `$1${prevOffset}`)
                      : null

        const handleToNext = e => {
          e.preventDefault()

          return dispatch(loadTrackComments(params.id, nextOffset))
        }

        const handleToPrev = e => {
          e.preventDefault()

          return dispatch(loadTrackComments(params.id, prevOffset, prevHref))
        }

        const _renderPaginationItems = () => {
          const offsets = []
          for (let i = 0; i <= pages; i++) {
            offsets.push(i * 24)
          }

          return offsets.map((value, index) => {
            const href = url.replace(re, `$1${value}`)
            const isCurrent = value === offset
            const page = index + 1
            const currentPage = offset / 24 + 1
            const lastPage = offsets.length

            const _handleClick = e => {
              e.preventDefault()
              return dispatch(loadTrackComments(params.id, value, href))
            }

            // Always show first and last index
            if (page === 1 || page === lastPage) {
              return (
                <PaginationItem
                  page={ page }
                  isCurrent={ isCurrent }
                  key={`pagination__${value}_${page}`}
                  onClick={ _handleClick }
                />
              )
            }

            // Beginning; Do not show left ellipsis for first 6 pages
            if (page < 11 && currentPage < 6) {
              return (
                <PaginationItem
                  ellipsis={[10]}
                  page={ page }
                  isCurrent={ isCurrent }
                  key={`pagination__${value}_${page}`}
                  onClick={ _handleClick }
                />
              )
            }

            // Ending; Do now show right ellipsis for last 6 pages
            if (page > lastPage - 10 && currentPage > lastPage - 5) {
              return (
                <PaginationItem
                  ellipsis={[lastPage - 9]}
                  page={ page }
                  isCurrent={ isCurrent }
                  key={`pagination__${value}_${page}`}
                  onClick={ _handleClick }
                />
              )
            }

            // Center; show +-5 indexes from current page
            if (currentPage < page + 5 && currentPage > page - 5) {
              return (
                <PaginationItem
                  ellipsis={[currentPage - 4, currentPage + 4]}
                  page={ page }
                  isCurrent={ isCurrent }
                  key={`pagination__${value}_${page}`}
                  onClick={ _handleClick }
                />
              )
            }

            return null
          })
        }

        return (
          <Pagination
            next={ !!trackComments.next_href }
            onNext={ handleToNext }
            onPrev={ handleToPrev }
            prev={ !!prevHref }
          >
            { _renderPaginationItems() }
          </Pagination>
        )
      }

      return null
    }

    return (
      <Main shouldPush={ shouldPlay }>

        <div className="canvas-container">
          <CanvasGradient className="canvas canvas--o_secondary" colors={ gradientColors } />
          <div className="waveform">
            <img className="waveform__img" src={ trackObject.waveform_url } />
          </div>

          <div className="profile">

            <ProfileCover
              anchorClassName="profile__cover artwork artwork__wrapper"
              imgClassName="artwork__img"
              onClick={ this.handleClick_stream }
              src={ mediaData.artwork.large }
            >
              <aside className="artwork__filter" />
            </ProfileCover>

            <section className="profile__section profile__section--details">
              <article className="profile__info">
                <h2 className="profile__info--primary">
                  { mediaData.media.name }
                </h2>
                <h4 className="profile__info--secondary">
                  <LinkItem to={`#user/${mediaData.user.id}`}>
                    { mediaData.user.name }
                  </LinkItem>
                </h4>
              </article>
              <hr className="invis" />

              <StatsList
                listItems={ statsListItems }
                hashTags={ mediaData.genre }
                pathname="#genre"
              />

              <hr className="invis" />
              <Taglist modifier="profile" tags={ mediaData.tags } max={ 10 } />
            </section>

          </div>
        </div>

        <div className="main__container main__container--main">

          <CollapseView
            className="article article--push"
            initHeight={ 200 }
            target={ this._articleContent }
          >
            <LinkItem className="article__avatar avatar" to={`#user/${mediaData.user.id}`}>
              <img className=" article__avatar--img avatar__img" src={ userAvatar.default } />
            </LinkItem>
            <ArticleContent
              ref={ articleContent }
              content={ trackObject.description }
              initHeight="200px"
              missing="TRACK DOES NOT HAVE A DESCRIPTION."
              missingClassName="article__none article__none--track"
              wrapperClassName="article-wrap article-wrap--fill"
            />
          </CollapseView>

          <Body
            headIconClassName="fa fa-comment-o"
            headText={ `${markNumber(mediaData.stats.comments)} COMMENTS` }
          >

            { renderComments() }
            { shouldRenderPagination() }

          </Body>

        </div>
      </Main>
    )
  }
}

TrackContainer.propTypes = {
  commentsByTrack: PropTypes.object,
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  menu: PropTypes.object,
  pagination: PropTypes.object,
  params: PropTypes.object,
  shouldPlay: PropTypes.bool,
  streamTrackId: PropTypes.number,
  trackObject: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    router: { location: { pathname } },
    app: {
      pagination,
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
    pagination,
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
