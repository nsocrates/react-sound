import React, { PropTypes } from 'react'

import ArticleContent from 'components/ArticleContent'
import Body from 'components/Body'
import CanvasBlur from 'components/CanvasBlur'
import CollapseView from 'components/CollapseView'
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
import { extractStreamable, timeFactory, trackFactory, getCover, markNumber, extractNumber } from 'utils/Utils'
import { loadPlaylist } from 'actions/playlist'
import { paginateCollection, loadPagination } from 'actions/collection'

class PlaylistContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props
    return dispatch(loadPlaylist(params.id))
  }

  handleEnter() {
    const { dispatch, playlistObject, pagination } = this.props
    const ids = playlistObject.tracks.slice(0, pagination.result.length + 15)

    dispatch(loadPagination())
    setTimeout(() => {
      dispatch(paginateCollection(playlistObject.id, ids))
    }, 200)
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

    const articleContent = ref => this._articleContent = ref

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
        <div className="canvas-container">
          <CanvasBlur src={ mediaData.artwork.large } />
          {/* -- Profile -- */}
          <div className="profile">

            <ProfileCover
              anchorClassName="profile__cover artwork artwork__wrapper"
              imgClassName="artwork__img"
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

              <Taglist modifier="profile" tags={ mediaData.tags } />

            </section>{/* -- !Track Info -- */}
          </div>{/* -- !Profile -- */}
        </div>{/* -- !Banner -- */}

        {/* -- Content -- */}
        <div className="main__container main__container--main">

          {/* -- Track Description -- */}
          <CollapseView
            className="article article--push"
            initHeight={ 200 }
            target={ this._articleContent }
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
          </CollapseView>{/* -- !Track Description -- */}

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
  location: PropTypes.object,
  menu: PropTypes.object,
  pagination: PropTypes.object,
  params: PropTypes.object,
  playlistObject: PropTypes.object,
  shouldPlay: PropTypes.bool,
  trackEntity: PropTypes.object,
  trackId: PropTypes.number,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    router: { location: { pathname } },
    app: {
      pagination,
      partition: { commentsByTrack },
      entities: { users, playlists, tracks },
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
    trackId,
    trackEntity: tracks,
    userEntity: users,
    playlistObject: playlists[extractNumber(pathname)]
  }
}

export default connect(mapStateToProps)(PlaylistContainer)
