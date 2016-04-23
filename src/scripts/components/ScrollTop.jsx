import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default class ScrollTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: false }
    this.handleButtonVisibility = this.handleButtonVisibility.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (!this.findWindow()) {
      return
    }

    this.handleButtonVisibility()
    window.addEventListener('scroll', this.handleButtonVisibility)
  }

  componentDidUpdate() {
    if (!this.findWindow()) {
      return
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleButtonVisibility)
  }

  handleButtonVisibility() {
    return window.pageYOffset > 600
      ? this.setState({ isVisible: true })
      : this.setState({ isVisible: false })
  }

  handleClick() {
    return window.scrollTo(0, 0)
  }

  findWindow() {
    return window !== 'undefined' && window
  }

  render() {
    const { shouldPush } = this.props
    const { isVisible } = this.state
    const cVisible = classNames('scroll-top', {
      'scroll-top--isVisible': isVisible
    })
    const buttonClassName = classNames(cVisible, {
      'scroll-top--push': shouldPush
    })

    return (
      <button
        className={ buttonClassName }
        onClick={ this.handleClick }
      >
        <i className="scroll-top__arrow fa fa-arrow-up" />
      </button>
    )
  }
}

ScrollTop.propTypes = {
  shouldPush: PropTypes.bool
}
