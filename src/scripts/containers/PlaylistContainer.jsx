import React, { PropTypes } from 'react'

import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import Main from 'components/Main'
import Loader from 'components/Loader'
import Canvas from 'components/Canvas'
import LinkItem from 'components/LinkItem'
import Article from 'components/Article'
import Tag from 'components/Tag'
import { connect } from 'react-redux'
import { loadPlaylist } from 'actions/playlist'
import { timeFactory, trackFactory, getCover, kFormatter, dtFormatter, markNumber, constructUrl } from 'utils/Utils'

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

    const renderTags = () => (
      mediaData.tags.map((tag, idx) => (
        <Tag
          key={`tag__${idx}_${tag}`}
          modifier="profile"
          text={ tag }
        />
      ))
    )

    return (
      <Main
        className="main__track"
        shouldPush={ shouldPlay }
      >
        {/* -- Banner -- */}
        <div className="canvas-container">

          <Canvas
            className="canvas canvas--track"
            gradientColors={ gradientColors }
          />

          <div className="waveform">
            <img className="waveform__img" src={ playlistObject.waveform_url} />
          </div>

          {/* -- Profile -- */}
          <div className="profile">

            <section className="profile__section profile__section--cover">
              <a
                className="profile__cover artwork artwork__wrapper"
                href="#"
                // onClick={ this.handleClick_stream }
              >
                <img
                  className="artwork__img"
                  // onError={ this.handleError_img }
                  src={ mediaData.artwork.large }
                />
                <aside className="artwork__filter" />
              </a>
            </section>

            {/* -- Track Info -- */}
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

              <ul className="tags">
                { renderTags() }
              </ul>
            </section>{/* -- !Track Info -- */}
          </div>{/* -- !Profile -- */}
        </div>{/* -- !Banner -- */}

        {/* -- Content -- */}
        <div className="user__container">

          {/* -- Track Description -- */}
          <section className="track">
            <LinkItem className="track__cover avatar" to={`#user/${mediaData.user.id}`}>
              <img className="avatar__img" src={ userAvatar.default } />
            </LinkItem>
            <div className="track__data">
              <Article
                article={ playlistObject.description }
                missing="TRACK DOES NOT HAVE A DESCRIPTION."
                missingClassName="article__none article__none--track"
                wrapperClassName="track__article"
              />
            </div>
          </section>{/* -- !Track Description -- */}

          <section className="comment-wrapper">
            <div className="comment__head">
              <h6>
                <i className="fa fa-list" />
                {" 20 TRACKS"}
              </h6>
            </div>
          </section>

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
    router: { location: { pathname }},
    app: {
      comments,
      partition: { commentsByTrack },
      entities: { users, playlists },
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
    userEntity: users,
    streamTrackId: trackId,
    playlistObject: playlists[pathname.split('/')[1]]
  }
}

export default connect(mapStateToProps)(PlaylistContainer)
