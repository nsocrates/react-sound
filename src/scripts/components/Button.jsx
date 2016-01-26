import React from 'react'

const Button = props => (
  <button
    className={ props.btnClass }
    onClick={ props.onBtnClick }
    onMouseEnter={ props.onBtnEnter }
    onMouseLeave={ props.onBtnLeave }
  >
    { props.children }
  </button>
)

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
  onBtnClick() {},
  onBtnEnter() {},
  onBtnLeave() {}
}

export default Button
