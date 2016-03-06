import React, { PropTypes } from 'react'

export default class CollapseView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hasInit: false,
      shouldRenderButtons: false,
      isCollapsed: null
    }
    this.handleCollapse = this.handleCollapse.bind(this)
    this.handleUncollapse = this.handleUncollapse.bind(this)
  }

  componentWillReceiveProps(newProps) {
    return this.state.hasInit ? null : this.init(newProps)
  }

  init(newProps) {
    const { target } = newProps
    const { initHeight } = this.props

    if (target._ref.offsetHeight > initHeight) {
      target._ref.style.maxHeight = `${initHeight}px`
      return this.setState({
        hasInit: true,
        shouldRenderButtons: true,
        isCollapsed: true
      })
    }

    return this.setState({ hasInit: true })
  }

  handleCollapse() {
    const { target, initHeight } = this.props
    target._ref.style.maxHeight = `${initHeight}px`

    this.setState({ isCollapsed: true })
  }

  handleUncollapse() {
    const { target } = this.props
    target._ref.style.maxHeight = ''

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
            className="btn btn--hint"
            onClick={ this.handleUncollapse }
          >
            {"Show More"}
          </button>
        )
      }

      return (
        <button
          className="btn btn--hint"
          onClick={ this.handleCollapse }
        >
          {"Show Less"}
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

CollapseView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  initHeight: PropTypes.number.isRequired,
  target: PropTypes.instanceOf(React.Component)
}
