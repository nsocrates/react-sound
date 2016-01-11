import React from 'react'

export default class Audio extends React.Component {

  constructor(props) {
    super(props)
    this.handleCanPlay = this.handleCanPlay.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  componentDidMount() {
    const { _audio } = this

    _audio.addEventListener('canplay', this.handleCanPlay)
    _audio.addEventListener('play', this.handlePlay)
    _audio.addEventListener('pause', this.handlePause)
  }

  handleCanPlay() {
    console.log('canplay triggered...broadcasting action: streamCanPlay')
    const { _audio, props: { actions }} = this
    actions.streamCanPlay()
    _audio.play()
  }

  handlePlay() {
    console.log('play event triggered...broadcasting toggle ON')
    const { actions } = this.props
    actions.toggleStream(true)
  }

  handlePause() {
    console.log('pause event triggered...broadcasting toggle OFF')
    const { actions } = this.props
    actions.toggleStream(false)
  }

  render() {
    const { src } = this.props
    const audio = ref => this._audio = ref

    return (
      <audio
        id="audio"
        ref={ audio }
        src={ src }
      />
    )
  }
}

Audio.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  src: React.PropTypes.string
}

Audio.defaultProps = {
  src: null
}
