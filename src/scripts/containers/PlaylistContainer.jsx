import React, { PropTypes } from 'react'

import ArticleContent from 'components/ArticleContent'
import Body from 'components/Body'
import CanvasBlur from 'components/CanvasBlur'
import TurncateView from 'components/TurncateView'
import End from 'components/End'
import LinkItem from 'components/LinkItem'
import Loader from 'components/Loader'
import Main from 'components/Main'
import ProfileCover from 'components/ProfileCover'
import StatsList from 'components/StatsList'
import Taglist from 'components/Taglist'
import Tracklist from 'components/Tracklist'
import Waypoint from 'components/Waypoint'
import { connect } from 'react-redux'
import { extractStreamable, timeFactory, trackFactory, getCover, markNumber } from 'utils/Utils'
import { loadPlaylist } from 'actions/playlist'
import { loadStreamList } from 'actions/stream'
import { delayPagination } from 'actions/collection'

class PlaylistContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleLoadStreamList = this.handleLoadStreamList.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
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

  handleEnter() {
    const { dispatch, playlistObject, pagination } = this.props
    const ids = playlistObject.tracks.slice(0, pagination.result.length + 15)

    return dispatch(delayPagination(playlistObject.id, ids, 250))
  }

  render() {
    const {
      dispatch,
      isPlaying,
      pagination,
      playlistObject,
      shouldPlay,
      trackEntity,
      trackId,
      userEntity
    } = this.props

    if (!playlistObject) {
      return <Loader className="loader--top" />
    }

    const trackFactoryArgs = {
      userObject: userEntity[playlistObject.user_id],
      mediaObject: playlistObject
    }
    const mediaData = trackFactory(trackFactoryArgs)
    const userAvatar = getCover(userEntity[playlistObject.user_id].avatar_url)
    const streamable = extractStreamable(trackEntity, playlistObject.tracks)

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

    const articleContent = ref => (this._articleContent = ref)

    const shouldRenderTracklist = () => {
      if (pagination.id === playlistObject.id && pagination.result.length) {
        return (
          <Tracklist
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
        {/* -- Banner -- */}
        <div className="canvas-container canvas-container--rainbow-grad">
          <CanvasBlur
            className="canvas canvas--ghost"
            src={ mediaData.artwork.large }
          />
          {/* -- Profile -- */}
          <div className="profile">

            <ProfileCover
              anchorClassName="profile__cover artwork artwork__wrapper"
              imgClassName="artwork__img"
              onClick={ this.handleLoadStreamList }
              src={ mediaData.artwork.large }
            >
              <aside className="artwork__filter" />
            </ProfileCover>

            {/* -- Track Info -- */}
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

            </section>{/* -- !Track Info -- */}
          </div>{/* -- !Profile -- */}
        </div>{/* -- !Banner -- */}

        {/* -- Content -- */}
        <div className="main__container main__container--main">

          {/* -- Track Description -- */}
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
          </TurncateView>{/* -- !Track Description -- */}

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

        </div>{/* -- !Content -- */}
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
  playlistObject: PropTypes.object,
  shouldPlay: PropTypes.bool,
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
    trackEntity: tracks,
    userEntity: users,
    playlistObject: playlists[id]
  }
}

export default connect(mapStateToProps)(PlaylistContainer)
