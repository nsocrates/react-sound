import React, { PropTypes } from 'react'

import GlobalEvents from 'constants/GlobalEvents'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.handleExit = this.handleExit.bind(this)
    this.listenForClose = this.listenForClose.bind(this)
  }

  componentDidMount() {
    this.props.componentDidMount()
    return this.hideBodyOverflow(true)
  }

  componentWillUnmount() {
    this.props.componentWillUnmount()
    return this.hideBodyOverflow(false)
  }

  handleExit() {
    this.props.handleExit()
    this.hideBodyOverflow(false)
  }

  listenForClose(e) {
    const { key, keyCode } = e

    if (key === 'Escape' || keyCode === 27) {
      this.props.handleExit()
    }
  }

  hideBodyOverflow(shouldHide) {
    return GlobalEvents.emit('hideBodyOverflow', shouldHide)
                       // .emit('blurBody', shouldHide)
  }

  render() {
    const { children, className } = this.props

    return (
      <aside
        className={ className }
        onClick={ this.handleExit }
        onKeyDown={ this.listenForClose }
      >
        { children }
      </aside>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  componentDidMount: PropTypes.func,
  componentWillUnmount: PropTypes.func,
  handleExit: PropTypes.func
}

Modal.defaultProps = {
  className: 'modal',
  componentDidMount() {},
  componentWillUnmount() {},
  handleExit() {}
}
