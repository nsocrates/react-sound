import React, { PropTypes } from 'react'

import GlobalEvents from 'utils/GlobalEvents'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.handleExit = this.handleExit.bind(this)
  }

  componentDidMount() {
    return this.hideBodyOverflow(true)
  }

  componentWillUnmount() {
    return this.hideBodyOverflow(false)
  }

  handleExit() {
    this.props.handleExit()
    this.hideBodyOverflow(false)
  }

  hideBodyOverflow(shouldHide) {
    return GlobalEvents.emit('hideBodyOverflow', shouldHide)
                       // .emit('blurBody', shouldHide)
  }

  render() {
    const { children, modalClassName } = this.props

    return (
      <aside className={ modalClassName } onClick={ this.handleExit }>
        { children }
      </aside>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  handleExit: PropTypes.func,
  modalClassName: PropTypes.string
}

Modal.defaultProps = {
  modalClassName: 'modal',
  handleExit() {}
}
