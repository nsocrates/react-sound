import React, { PropTypes } from 'react'

export default class TurncateView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hasInitialized: false,
      shouldRenderButtons: false,
      isCollapsed: false
    }
    this.handleTurncate = this.handleTurncate.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.target._ref) {
      return this.state.hasInitialized ? null : this.initialize(newProps)
    }

    return null
  }

  initialize(newProps) {
    const { target } = newProps
    const { initHeight, targetClassName } = this.props

    if (target._ref.offsetHeight > initHeight) {
      target._ref.style.maxHeight = `${initHeight}px`
      target._ref.classList.add(`${targetClassName}--is-collapsed`)
      return this.setState({
        hasInitialized: true,
        shouldRenderButtons: true,
        isCollapsed: true
      })
    }

    return this.setState({ hasInitialized: true })
  }

  handleTurncate() {
    const { initHeight, target, targetClassName } = this.props
    target._ref.style.maxHeight = `${initHeight}px`
    target._ref.classList.add(`${targetClassName}--is-collapsed`)

    this.setState({ isCollapsed: true })
  }

  handleExpand() {
    const { target, targetClassName } = this.props
    target._ref.style.maxHeight = ''
    target._ref.classList.remove(`${targetClassName}--is-collapsed`)

    this.setState({ isCollapsed: false })
  }

  render() {
    const {
      className = '',
      children = null
    } = this.props

    const shouldRenderButtons = () => {
      const { state } = this

      if (!state.shouldRenderButtons) {
        return null
      }

      if (state.isCollapsed) {
        return (
          <button
            className="btn btn--sm btn--basic"
            onClick={ this.handleExpand }
          >
            {"Show More "}
            <i className="btn__icon--right fa fa-caret-down" />
          </button>
        )
      }

      return (
        <button
          className="btn btn--sm btn--basic"
          onClick={ this.handleTurncate }
        >
          {"Show Less "}
          <i className="btn__icon--right fa fa-caret-up" />
        </button>
      )
    }

    return (
      <section className={ className } >
        { children }
        { shouldRenderButtons() }
      </section>
    )
  }
}

TurncateView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  initHeight: PropTypes.number.isRequired,
  target: PropTypes.instanceOf(React.Component),
  targetClassName: PropTypes.string
}
