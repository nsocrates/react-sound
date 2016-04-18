import React, { PropTypes } from 'react'

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
    return this.props.handleExit()
  }

  hideBodyOverflow(shouldHide) {
    const body = document.body
    return (body.style.overflow = shouldHide ? 'hidden' : '')
  }

  listenForClose(e) {
    const { key, keyCode } = e

    if (key === 'Escape' || keyCode === 27) {
      this.props.handleExit()
    }
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
