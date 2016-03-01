import React, { PropTypes } from 'react'

import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import Main from 'components/Main'
import Loader from 'components/Loader'
import Canvas from 'components/Canvas'
import LinkItem from 'components/LinkItem'
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
            <img className="waveform__img" src={ playlistObject.waveform_url} />
          </div>

          {/*-- Profile --*/}
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
            </section>
          </div>
        </div>
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
