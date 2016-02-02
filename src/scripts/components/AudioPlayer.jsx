import classNames from 'classnames'
import GlobalEvents from 'utils/GlobalEvents'
import React from 'react'
import { IMG_FORMAT } from 'constants/ItemLists'
import { timeFactory, coordinatesFactory } from 'utils/Utils'

import PlayerArtwork from './PlayerArtwork'
import PlayerDetails from './PlayerDetails'
import PlayerProgressBar from './PlayerProgressBar'
import PlayerTimer from './PlayerTimer'
import PlayerVolume from './PlayerVolume'
import PlayerVolumeControl from './PlayerVolumeControl'
import PlayerButton from './PlayerButton'

export default class AudioPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.handleMute = this.handleMute.bind(this)
    this.handlePlayPause = this.handlePlayPause.bind(this)
    this.handleProgressMouseDown = this.handleProgressMouseDown.bind(this)
    this.handleProgressMouseMove = this.handleProgressMouseMove.bind(this)
    this.handleProgressMouseUp = this.handleProgressMouseUp.bind(this)
    this.handleVolumeEnter = this.handleVolumeEnter.bind(this)
    this.handleVolumeLeave = this.handleVolumeLeave.bind(this)
    this.handleVolumeMouseDown = this.handleVolumeMouseDown.bind(this)
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this)
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this)
  }

  componentDidMount() {
    GlobalEvents.emit('padBottom', true)
  }

  componentWillUnmount() {
    GlobalEvents.emit('padBottom', false)
  }

  handlePlayPause() {
    const { player: { audio }, audioRef: { _audio }} = this.props
    return audio.isPlaying ? _audio.pause() : _audio.play()
  }

  handleMute() {
    const { player: { volume }, audioRef: { _audio }} = this.props

    _audio.muted = !volume.isMuted
  }

  handleProgressMouseDown(e) {
    e.preventDefault()
    const {
      _progress: { _position },
      props: {
        playerActions,
        player: { audio }
      }
    } = this

    const coordinates = coordinatesFactory(e)
    const value = coordinates.getValueX(_position)
    const position = value * audio.duration

    this.bindEventListeners()
    playerActions.seekPosition(true, position)
  }

  handleProgressMouseMove(e) {
    e.preventDefault()
    const {
      _progress: { _position },
      props: {
        playerActions,
        player: { audio }
      }
    } = this

    if (!audio.isSeeking) {
      return
    }

    const coordinates = coordinatesFactory(e)
    const value = coordinates.getValueX(_position)
    const position = coordinates.clip(value, 0, audio.duration)

    playerActions.seekPosition(true, position)
  }

  handleProgressMouseUp(e) {
    e.preventDefault()
    const {
      _progress: { _position },
      props: {
        playerActions,
        player: { audio },
        audioRef: { _audio }
      }
    } = this

    const coordinates = coordinatesFactory(e)
    const value = coordinates.getValueX(_position)
    const position = coordinates.clip(value, 0, audio.duration)

    _audio.currentTime = position
    this.unbindEventListeners()
    playerActions.seekPosition(false, position)
  }

  handleVolumeEnter() {
    const { playerActions } = this.props
    playerActions.expandVolume(true)
  }

  handleVolumeLeave() {
    const { playerActions } = this.props
    playerActions.expandVolume(false)
  }

  handleVolumeMouseDown(e) {
    e.preventDefault()
    const {
      _volume: { _range },
      props: {
        playerActions,
        audioRef: { _audio }
      }
    } = this

    const coordinates = coordinatesFactory(e)
    const value = coordinates.getValueY(_range)

    _audio.volume = coordinates.clip(value)
    _audio.muted = false

    this.bindEventListeners('volume')
    playerActions.dragVolume(true)
  }

  handleVolumeMouseMove(e) {
    e.preventDefault()
    const {
      _volume: { _range },
      props: {
        player: { volume },
        audioRef: { _audio }
      }
    } = this

    if (!volume.isDragging) {
      return
    }

    const coordinates = coordinatesFactory(e)
    const value = coordinates.getValueY(_range)

    _audio.volume = coordinates.clip(value)
  }

  handleVolumeMouseUp(e) {
    const {
      _volume: { _range },
      props: {
        playerActions,
        audioRef: { _audio }
      }
    } = this

    const coordinates = coordinatesFactory(e)
    const value = coordinates.getValueY(_range)

    _audio.volume = coordinates.clip(value)
    this.unbindEventListeners()
    playerActions.dragVolume(false)
  }

  bindEventListeners(listener) {
    const body = document.body

    if (listener === 'volume') {
      body.addEventListener('mousemove', this.handleVolumeMouseMove)
      body.addEventListener('mouseup', this.handleVolumeMouseUp)
    } else {
      body.addEventListener('mousemove', this.handleProgressMouseMove)
      body.addEventListener('mouseup', this.handleProgressMouseUp)
    }
  }

  unbindEventListeners() {
    const body = document.body

    body.removeEventListener('mousemove', this.handleVolumeMouseMove)
    body.removeEventListener('mouseup', this.handleVolumeMouseUp)
    body.removeEventListener('mousemove', this.handleProgressMouseMove)
    body.removeEventListener('mouseup', this.handleProgressMouseUp)
  }

  render() {
    const {
      trackData,
      uiActions,
      player: {
        volume: {
          shouldExpand,
          isDragging,
          isMuted,
          level
        },
        audio: {
          isPlaying,
          position,
          duration
        }
      }
    } = this.props

    const shouldFocus = classNames('player__btn player__btn--volume', {
      'player__btn--focus': shouldExpand || isDragging
    })
    const isPlayOrPause = classNames('player__icon player__icon--playpause fa', {
      'fa-pause': isPlaying,
      'fa-play': !isPlaying
    })

    // Keep volume expanded as long as isDragging === true
    const shouldVolumeExpand = classNames('player__volume--control', {
      'player__volume--expand': isDragging || shouldExpand
    })

    // Multiply by 100 to get percentage
    const sliderPosition = `${level * 1e2}%`
    const sliderStyle = {
      backgroundColor: isMuted ? '#e09cc1' : '#f7379f',
      height: sliderPosition
    }
    // Sets artwork for current track:
    const imgUrl = trackData.getArtwork(IMG_FORMAT.BADGE)
    const artworkStyle = {
      backgroundImage: `url(${imgUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }

    // Set position percentage
    const barPosition = `${position / duration * 1e2}%`
    const progressStyle = {
      width: barPosition
    }

    const renderVolumeIcon = () => {
      const volumeLevel = classNames('player__icon fa', {
        'fa-volume-off': !level,
        'fa-volume-down': level < 0.5 && level,
        'fa-volume-up': level >= 0.5
      })
      if (isMuted) {
        return (
          <span className="player__volume--mute">
            <i className="player__icon fa fa-volume-off" />
            <i className="player__icon player__icon--times fa fa-times" />
          </span>
        )
      }

      return <i className={ volumeLevel } />
    }
    const currentTime = timeFactory(position).getFormated()
    const endTime = timeFactory(duration - position).getFormated()

    const volumeRef = ref => this._volume = ref
    const progressRef = ref => this._progress = ref

    return (
      <div className="player">
        <PlayerArtwork
          className="player__artwork"
          style={ artworkStyle }
        />

        <ul className="player__container">
          <PlayerButton
            btnClassName="player__btn player__btn--playpause"
            btnOnClick={ this.handlePlayPause }
            className="player__ctrl player__playpause"
            iconClassName={ isPlayOrPause }
          />

          <PlayerDetails
            songName={ trackData.songName }
            userName={ trackData.userName }
          />

          <PlayerTimer componentClassName="player__ctrl player__current">
            <small>
             { currentTime }
            </small>
          </PlayerTimer>

          <PlayerProgressBar
            componentMouseDown={ this.handleProgressMouseDown }
            componentMouseMove={ this.handleProgressMouseMove }
            componentMouseUp={ this.handleProgressMouseUp }
            componentStyle={ progressStyle }
            ref={ progressRef }
          />

          <PlayerTimer componentClassName="player__ctrl player__remaining">
            <small>
             { endTime }
            </small>
          </PlayerTimer>

          <PlayerButton
            btnClassName="player__btn player__btn--list"
            btnOnClick={ uiActions.toggleTracklist }
            className="player__ctrl player__tracklist"
            iconClassName="player__icon fa fa-list"
          />

          <PlayerVolume
            btnClassName={ shouldFocus }
            btnOnClick={ this.handleMute }
            componentMouseEnter={ this.handleVolumeEnter }
            componentMouseLeave={ this.handleVolumeLeave }
            volumeIcon={ renderVolumeIcon() }
          >
            <PlayerVolumeControl
              componentClassName={ shouldVolumeExpand }
              componentMouseDown={ this.handleVolumeMouseDown }
              componentMouseMove={ this.handleVolumeMouseMove }
              componentMouseUp={ this.handleVolumeMouseUp }
              componentStyle={ sliderStyle }
              ref={ volumeRef }
            />
          </PlayerVolume>
        </ul>
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  audioRef: React.PropTypes.shape({
    _audio: React.PropTypes.object.isRequired
  }),
  player: React.PropTypes.shape({
    volume: React.PropTypes.object.isRequired
  }),
  playerActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  shouldPlay: React.PropTypes.bool,
  trackData: React.PropTypes.shape({
    getArtWork: React.PropTypes.func,
    songName: React.PropTypes.string,
    userName: React.PropTypes.string
  }),
  uiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}
