import React from 'react'

export default class Button extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { btnClass, onBtnClick, onBtnEnter, onBtnLeave, children } = this.props
    return (
      <button
        className={ btnClass }
        onClick={ onBtnClick }
        onMouseEnter={ onBtnEnter }
        onMouseLeave={ onBtnLeave }
      >
        { children }
      </button>
    )
  }
}

Button.propTypes = {
  btnClass: React.PropTypes.string,
  children: React.PropTypes.node,
  onBtnClick: React.PropTypes.func,
  onBtnEnter: React.PropTypes.func,
  onBtnLeave: React.PropTypes.func
}

Button.defaultProps = {
  btnClass: null,
  children: null,
  onBtnClick() { return },
  onBtnEnter() { return },
  onBtnLeave() { return }
}
