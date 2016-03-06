import React, { PropTypes } from 'react'

import Main from 'components/Main'
import Loader from 'components/Loader'
import LinkItem from 'components/LinkItem'
import ArticleContent from 'components/ArticleContent'
import CollapseView from 'components/CollapseView'
import Taglist from 'components/Taglist'
import Body from 'components/Body'
import StatsList from 'components/StatsList'
import CanvasBanner from 'components/CanvasBanner'
import ProfileCover from 'components/ProfileCover'
import End from 'components/End'
import Tracklist from 'components/Tracklist'
import Waypoint from 'components/Waypoint'
import { paginateCollection, loadPagination } from 'actions/collection'
import { connect } from 'react-redux'
import { loadPlaylist } from 'actions/playlist'
import { extractStreamable, timeFactory, trackFactory, getCover, markNumber, extractNumber } from 'utils/Utils'

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

    const gradientColors = [
      { offset: 0, color: '#70e1f5' },
      { offset: 1, color: '#ffd194' }
    ]

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
        icon: 'fa fa-caret-square-o-right',
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
        <CanvasBanner
          canvasClassName="canvas--track"
          gradientColors={ gradientColors }
        >

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
        </CanvasBanner>{/* -- !Banner -- */}

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
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
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
