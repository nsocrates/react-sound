import React, { PropTypes } from 'react'

import Main from 'components/Main'
import Loader from 'components/Loader'
import LinkItem from 'components/LinkItem'
import Article from 'components/Article'
import Taglist from 'components/Taglist'
import Body from 'components/Body'
import CanvasBanner from 'components/CanvasBanner'
import ProfileCover from 'components/ProfileCover'
import Tracklist from 'components/Tracklist'
import { connect } from 'react-redux'
import { loadPlaylist } from 'actions/playlist'
import { timeFactory, trackFactory, getCover, kFormatter, dtFormatter, markNumber } from 'utils/Utils'

class PlaylistContainer extends React.Component {

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props
    return dispatch(loadPlaylist(params.id))
  }

  render() {
    const {
      dispatch,
      isPlaying,
      trackEntity,
      trackId,
      shouldPlay,
      userEntity,
      playlistObject
    } = this.props

    if (!playlistObject) {
      return <Loader className="loader--top" />
    }

    const gradientColors = [
      { offset: 0, color: '#C9FFBF' },
      { offset: 1, color: '#FFAFBD' }
    ]

    const trackFactoryArgs = {
      userEntity,
      mediaObject: playlistObject
    }
    const mediaData = trackFactory(trackFactoryArgs)
    const userAvatar = getCover(userEntity[playlistObject.user_id].avatar_url)

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

              <Taglist modifier="profile" tags={ mediaData.tags } />

            </section>{/* -- !Track Info -- */}
          </div>{/* -- !Profile -- */}
        </CanvasBanner>{/* -- !Banner -- */}

        {/* -- Content -- */}
        <div className="main__container main__container--main">

          {/* -- Track Description -- */}
          <section className="article article--push">
            <LinkItem className="article__avatar avatar" to={`#user/${mediaData.user.id}`}>
              <img className="article__avatar--img avatar__img" src={ userAvatar.default } />
            </LinkItem>
            <Article
              article={ playlistObject.description }
              missing="PLAYLIST DOES NOT HAVE A DESCRIPTION."
              missingClassName="article__none article__none--track"
              wrapperClassName="article-wrap article-wrap--fill"
            />
          </section>{/* -- !Track Description -- */}

          <Body
            headIconClassName="fa fa-list"
            headText={`${markNumber(mediaData.tracklist.count)} TRACKS`}
          >
            <Tracklist
              dispatch={ dispatch }
              isPlaying={ isPlaying }
              trackEntity={ trackEntity }
              trackId={ trackId }
              ids={ mediaData.tracklist.ids }
              userEntity={ userEntity }
              modifier="set"
            />
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
      comments,
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
    comments,
    isPlaying,
    location,
    menu,
    shouldPlay,
    commentsByTrack,
    trackId,
    trackEntity: tracks,
    userEntity: users,
    playlistObject: playlists[pathname.split('/')[1]]
  }
}

export default connect(mapStateToProps)(PlaylistContainer)
