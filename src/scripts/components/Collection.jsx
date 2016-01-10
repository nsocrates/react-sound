import React from 'react'

export default class Collection extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { loadStream, trackId } = this.props
    e.preventDefault()

    loadStream(trackId)
  }

  render() {
    const { className, style } = this.props

    return (
      <a
        className={ className }
        href="#"
        onClick={ this.handleClick }
        style={ style }
      />
    )
  }
}

Collection.propTypes = {
  className: React.PropTypes.string,
  loadStream: React.PropTypes.func.isRequired,
  style: React.PropTypes.objectOf(React.PropTypes.string),
  trackId: React.PropTypes.number
}
