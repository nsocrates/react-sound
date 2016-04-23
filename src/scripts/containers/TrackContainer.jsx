import React, { PropTypes } from 'react'

import ArticleContent from 'components/ArticleContent'
import Body from 'components/Body'
import CanvasGradient from 'components/CanvasGradient'
import TurncateView from 'components/TurncateView'
import Comment from 'components/Comment'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import Pagination from 'components/Pagination'
import PaginationIndex from 'components/PaginationIndex'
import ProfileCover from 'components/ProfileCover'
import StatsList from 'components/StatsList'
import Taglist from 'components/Taglist'

import classNames from 'classnames'
import { updateMyTracks, updateMyFollowings } from 'actions/collection'
import { connect } from 'react-redux'
import { loadTrack, loadTrackComments } from 'actions/track'
import { requestStream } from 'actions/stream'
import { addTrack } from 'actions/player'

import mediaFactory from 'utils/mediaFactory'
import timeFactory from 'utils/timeFactory'
import { constructUrlFromEndpoint } from 'utils/urlUtils'
import { formatCover, dtFormatter, markNumber } from 'utils/formatUtils'
import { fetchNeeds } from 'utils/fetchComponentData'

const needs = [loadTrack]

class TrackContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickStream = this.handleClickStream.bind(this)
    this.handleClickFav = this.handleClickFav.bind(this)
    this.handleClickFollow = this.handleClickFollow.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    return fetchNeeds(needs, dispatch, { params })
  }

  handleClickAdd(e) {
    e.preventDefault()
    const { dispatch, params } = this.props
    return dispatch(addTrack(params.id))
  }

  handleClickFav(e) {
    e.preventDefault()
    const { dispatch, params } = this.props
    return dispatch(updateMyTracks(params.id, this.trackName))
  }

  handleClickFollow(e) {
    e.preventDefault()
    const { dispatch, userEntity, trackObject } = this.props
    const { [trackObject.user_id]: userObject } = userEntity
    const { id, username } = userObject
    return dispatch(updateMyFollowings(id, username))
  }

  handleClickStream(e) {
    e.preventDefault()
    const { dispatch, params } = this.props
    return dispatch(requestStream(params.id))
  }

  render() {
    const {
      trackCollection,
      userCollection,
      userEntity,
      params,
      shouldPlay,
      trackObject,
      dispatch,
      trackComments,
      pagination
    } = this.props

    if (!Object.keys(trackObject).length) {
      return <Loader className="loader--top" />
    }

    const { [trackObject.user_id]: userObject } = userEntity
    const mediaFactoryArgs = {
      userObject,
      mediaObject: trackObject
    }

    const mediaData = mediaFactory(mediaFactoryArgs)
    const userAvatar = formatCover(userObject.avatar_url)

    this.trackName = mediaData.media.name

    const statsListItems = [
      {
        text: mediaData.createdAt
      }, {
        icon: 'heart',
        value: mediaData.stats.favorites
      }, {
        icon: 'headphones',
        value: mediaData.stats.plays
      }, {
        icon: 'comments',
        value: mediaData.stats.comments
      }
    ]

    const gradientColors = [
      { offset: 0, color: '#e55d87' },
      { offset: 1, color: '#5fc3e4' }
    ]

    const isFavorite = classNames('artwork__fav-icon artwork__fav-icon--profile fa fa-heart', {
      'artwork__fav-icon--is-fav': trackCollection.ids.indexOf(trackObject.id) !== -1
    })

    const isFollowing = classNames('article__follow btn btn--sm', {
      'btn__follow btn__follow--light': userCollection.ids.indexOf(userObject.id) === -1,
      'btn__following btn__following--light': userCollection.ids.indexOf(userObject.id) !== -1
    })

    const articleContent = ref => (this._articleContent = ref)

    const renderComments = () => {
      const _isReady = () => {
        const hasLength = Object.keys(trackComments).length
        const notFetching = !trackComments.isFetching
        const isSynced = pagination.id === trackObject.id
        return !!(hasLength && notFetching && isSynced)
      }

      if (!_isReady()) {
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

        const avatar = formatCover(user.avatar_url)
        const createdAt = dtFormatter(comment.created_at)
        const timestamp = timeFactory(comment.timestamp / 1000).getFormatted()

        return (
          <Comment
            at={ createdAt }
            avatar={ avatar.badge }
            body={ comment.body }
            by={ user.username }
            index={ index }
            key={ comment.id }
            timestamp={ timestamp }
            userId={ user.id }
          />
        )
      })
    }

    const shouldRenderPagination = () => {
      const _shouldRender = () => {
        const hasMore = mediaData.stats.comments > 24
        const hasIds = trackComments.ids && trackComments.ids.length
        return !!(hasMore && hasIds)
      }

      if (_shouldRender()) {
        const { offset, next_href } = trackComments
        const endpoint = `/tracks/${params.id}/comments?`
        const pages = Math.ceil(mediaData.stats.comments / 24)

        const nextOffset = offset + 24
        const prevOffset = offset - 24
        const prevHref = prevOffset > 0
                      ? constructUrlFromEndpoint(endpoint, { offset: prevOffset })
                      : null

        const handleToNext = e => {
          e.preventDefault()

          return dispatch(loadTrackComments(params.id, nextOffset))
        }

        const handleToPrev = e => {
          e.preventDefault()

          return dispatch(loadTrackComments(params.id, prevOffset, prevHref))
        }

        const _renderPaginationIndexs = () => {
          const offsets = []
          for (let i = 1; i <= pages; i++) {
            offsets.push(i * 24)
          }

          return offsets.map((value, index) => {
            const href = constructUrlFromEndpoint(endpoint, { offset: value })
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
                <PaginationIndex
                  page={ page }
                  isCurrent={ isCurrent }
                  key={ value }
                  onClick={ _handleClick }
                />
              )
            }

            // Beginning; Do not show left ellipsis for first 6 pages
            if (page < 11 && currentPage < 6) {
              return (
                <PaginationIndex
                  ellipsis={[10]}
                  page={ page }
                  isCurrent={ isCurrent }
                  key={ value }
                  onClick={ _handleClick }
                />
              )
            }

            // Ending; Do now show right ellipsis for last 6 pages
            if (page > lastPage - 10 && currentPage > lastPage - 5) {
              return (
                <PaginationIndex
                  ellipsis={[lastPage - 9]}
                  page={ page }
                  isCurrent={ isCurrent }
                  key={ value }
                  onClick={ _handleClick }
                />
              )
            }

            // Center; show +-5 indexes from current page
            if (currentPage < page + 5 && currentPage > page - 5) {
              return (
                <PaginationIndex
                  ellipsis={[currentPage - 4, currentPage + 4]}
                  page={ page }
                  isCurrent={ isCurrent }
                  key={ value }
                  onClick={ _handleClick }
                />
              )
            }

            return null
          })
        }

        return (
          <Pagination
            next={ !!next_href }
            onNext={ handleToNext }
            onPrev={ handleToPrev }
            prev={ !!prevHref }
          >
            { _renderPaginationIndexs() }
          </Pagination>
        )
      }

      return null
    }

    return (
      <Main shouldPush={ shouldPlay }>

        <div className="canvas-container">
          <CanvasGradient className="canvas" colors={ gradientColors } />
          <div className="waveform">
            <img className="waveform__img" src={ trackObject.waveform_url } />
          </div>

          <div className="profile">

            <ProfileCover
              className="profile__cover artwork artwork__wrapper"
              imgClassName="artwork__img"
              src={ mediaData.artwork.large }
              Type="div"
            >
            <button
              className="artwork__fav artwork__fav--profile"
              onClick={ this.handleClickFav }
            >
              <i className={ isFavorite } />
            </button>
            <button
              className="artwork__add"
              onClick={ this.handleClickAdd }
            >
              <i className="artwork__add-icon fa fa-plus" />
            </button>
              <button
                className="fa artwork__filter artwork__filter--profile"
                onClick={ this.handleClickStream }
              />
            </ProfileCover>

            <section className="profile__section profile__section--details">
              <article className="profile__info">
                <h2 className="profile__info--primary">
                  { mediaData.media.name }
                </h2>
                <h4 className="profile__info--secondary">
                  <LinkItem to={`/user/${mediaData.user.id}`}>
                    { mediaData.user.name }
                  </LinkItem>
                </h4>
              </article>
              <hr className="invis" />

              <StatsList
                listItems={ statsListItems }
                hashTags={ mediaData.genre }
                pathname="/genre"
              />

              <hr className="invis" />
              <Taglist modifier="profile" tags={ mediaData.tags } max={ 8 } />
            </section>

          </div>
        </div>

        <div className="main__container main__container--main">

          <TurncateView
            className="article article--push"
            initHeight={ 200 }
            target={ this._articleContent }
            targetClassName="article-wrap"
          >

            <div className="article__user">
              <LinkItem className="article__avatar" to={`/user/${mediaData.user.id}`}>
                <img className=" article__avatar--img avatar__img" src={ userAvatar.default } />
              </LinkItem>
              <button
                className={ isFollowing }
                onClick={ this.handleFollow }
              />
            </div>

            <ArticleContent
              ref={ articleContent }
              content={ trackObject.description }
              initHeight="200px"
              missing="TRACK DOES NOT HAVE A DESCRIPTION."
              missingClassName="article__none article__none--track"
              wrapperClassName="article-wrap article-wrap--fill"
            />
          </TurncateView>

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
  dispatch: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  shouldPlay: PropTypes.bool.isRequired,
  streamTrackId: PropTypes.number.isRequired,
  trackCollection: PropTypes.object.isRequired,
  trackComments: PropTypes.object.isRequired,
  trackObject: PropTypes.object.isRequired,
  userCollection: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    app: {
      pagination,
      auth: { likes },
      partition: { commentsByTrack },
      entities: { users, tracks },
      media: {
        stream: { trackId, shouldPlay },
        player: {
          audio: { isPlaying }
        }
      }
    }
  } = state
  const { id } = ownProps.params

  return {
    pagination,
    isPlaying,
    shouldPlay,
    trackCollection: likes.tracks,
    trackComments: commentsByTrack[id] || {},
    userCollection: likes.followings,
    userEntity: users,
    streamTrackId: trackId,
    trackObject: tracks[id] || {}
  }
}

const TrackWrap = connect(mapStateToProps)(TrackContainer)
TrackWrap.needs = needs

export default TrackWrap
