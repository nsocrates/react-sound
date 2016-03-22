import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateMyPlaylists } from 'actions/auth'
import { delayPagination } from 'actions/collection'
import { loadPlaylist } from 'actions/playlist'
import { loadStreamList } from 'actions/stream'

import { REQ } from 'constants/Auth'
import { extractStreamable, timeFactory, trackFactory, getCover, markNumber } from 'utils/Utils'

import ArticleContent from 'components/ArticleContent'
import Body from 'components/Body'
import CanvasBlur from 'components/CanvasBlur'
import classNames from 'classnames'
import End from 'components/End'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import ProfileCover from 'components/ProfileCover'
import StatsList from 'components/StatsList'
import Taglist from 'components/Taglist'
import Tracklist from 'components/Tracklist'
import TurncateView from 'components/TurncateView'
import Waypoint from 'components/Waypoint'

class PlaylistContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleLoadStreamList = this.handleLoadStreamList.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleClickFav = this.handleClickFav.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props
    return dispatch(loadPlaylist(params.id))
  }

  handleLoadStreamList(e) {
    e.preventDefault()
    const { dispatch, playlistObject } = this.props
    return dispatch(loadStreamList(playlistObject.tracks))
  }

  handleClickFav(e) {
    e.preventDefault()

    const { dispatch, params, playlistCollection } = this.props
    if (playlistCollection.ids.indexOf(Number(params.id)) !== -1) {
      return dispatch(updateMyPlaylists(REQ.DEL, params.id, this.playlistName))
    }
    return dispatch(updateMyPlaylists(REQ.PUT, params.id, this.playlistName))
  }

  handleEnter() {
    const { dispatch, playlistObject, pagination } = this.props
    const ids = playlistObject.tracks.slice(0, pagination.result.length + 15)

    return dispatch(delayPagination(playlistObject.id, ids, 250))
  }

  render() {
    const {
      trackCollection,
      playlistCollection,
      dispatch,
      isPlaying,
      pagination,
      playlistObject,
      shouldPlay,
      trackEntity,
      trackId,
      userEntity
    } = this.props
    const userObject = playlistObject ? userEntity[playlistObject.user_id] : null

    if (!playlistObject || !userObject) {
      return <Loader className="loader--top" />
    }

    const trackFactoryArgs = {
      userObject,
      mediaObject: playlistObject
    }

    const mediaData = trackFactory(trackFactoryArgs)
    const userAvatar = getCover(userObject.avatar_url)
    const streamable = extractStreamable(trackEntity, playlistObject.tracks)

    this.playlistName = mediaData.media.name

    const statsListItems = [
      { text: mediaData.createdAt },
      {
        icon: 'fa fa-clock-o',
        value: timeFactory(playlistObject.duration / 1000).getFormatted()
      }, {
        icon: 'fa fa-list',
        value: `${mediaData.tracklist.count} tracks`
      }
    ]

    const isFavorite = classNames('artwork__fav-icon artwork__fav-icon--profile fa fa-heart', {
      'artwork__fav-icon--is-fav': playlistCollection.ids.indexOf(playlistObject.id) !== -1
    })

    const articleContent = ref => (this._articleContent = ref)

    const shouldRenderTracklist = () => {
      if (!streamable.length) {
        return <End text={"NO STREAMABLE TRACKS."} />
      }

      if (pagination.id === playlistObject.id && pagination.result.length) {
        return (
          <Tracklist
            trackCollection={ trackCollection.ids }
            dispatch={ dispatch }
            isPlaying={ isPlaying }
            trackEntity={ trackEntity }
            trackId={ trackId }
            ids={ pagination.result }
            userEntity={ userEntity }
            modifier="set"
          />
        )
      }

      return <Loader className="loader--bottom" />
    }

    const shouldRenderWaypoint = () => {
      if (!streamable.length) {
        return null
      }

      if (pagination.isLoading) {
        return <Loader className="loader--bottom" />
      }

      if (pagination.result.length === playlistObject.tracks.length) {
        return <End className="end--bottom" />
      }

      return (
        <Waypoint
          className="waypoint waypoint--bottom"
          onEnter={ this.handleEnter }
        />
      )
    }

    return (
      <Main shouldPush={ shouldPlay }>
        <div className="canvas-container canvas-container--rainbow-grad">
          <CanvasBlur
            blurRadius={ 100 }
            className="canvas canvas--ghost"
            src={ mediaData.artwork.xLarge }
          />
          <div className="profile">

            <ProfileCover
              className="profile__cover artwork artwork__wrapper"
              imgClassName="artwork__img"
              src={ mediaData.artwork.large }
              Type="div"
            >
            <button
              className="artwork__fav"
              onClick={ this.handleClickFav }
            >
              <i className={ isFavorite } />
            </button>
              <button
                className="artwork__filter artwork__filter--profile"
                onClick={ this.handleLoadStreamList }
              />
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

          <TurncateView
            className="article article--push"
            initHeight={ 200 }
            target={ this._articleContent }
            targetClassName="article-wrap"
          >
            <LinkItem className="article__avatar avatar" to={`#user/${mediaData.user.id}`}>
              <img className="article__avatar--img avatar__img" src={ userAvatar.default } />
            </LinkItem>
            <ArticleContent
              ref={ articleContent }
              content={ playlistObject.description }
              missing="PLAYLIST DOES NOT HAVE A DESCRIPTION."
              missingClassName="article__none article__none--track"
              wrapperClassName="article-wrap article-wrap--fill"
            />
          </TurncateView>

          <Body
            headIconClassName="fa fa-list"
            headText={ `${markNumber(mediaData.tracklist.count)} TRACKS` }
            others={
              <small className="body__text--secondary">
                {` (${streamable.length} streamable)`}
              </small>
            }
          >

            { shouldRenderTracklist() }
            { shouldRenderWaypoint() }

          </Body>

        </div>
      </Main>
    )
  }
}

PlaylistContainer.propTypes = {
  commentsByTrack: PropTypes.object,
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  pagination: PropTypes.object,
  params: PropTypes.object,
  playlistCollection: PropTypes.object,
  playlistObject: PropTypes.object,
  shouldPlay: PropTypes.bool,
  trackCollection: PropTypes.object,
  trackEntity: PropTypes.object,
  trackId: PropTypes.number,
  userEntity: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const {
    app: {
      pagination,
      partition: { commentsByTrack },
      entities: { users, playlists, tracks },
      auth: { collection },
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
    commentsByTrack,
    trackId,
    trackCollection: collection.tracks,
    playlistCollection: collection.playlists,
    trackEntity: tracks,
    userEntity: users,
    playlistObject: playlists[id]
  }
}

export default connect(mapStateToProps)(PlaylistContainer)
