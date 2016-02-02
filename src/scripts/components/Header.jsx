import React from 'react'

export default class Header extends React.Component {

  render() {
    const { children } = this.props
    return (
      <header className="header">
        <div className="header__container">

          <ul className="header__section header__section--main">
            <li className="header__item">
              <i className="header__item--music fa fa-music" />
            </li>

            <li className="header__item">
              <a className="header__item--link" href="#">{ "reactSOUND" }</a>
            </li>
          </ul>

          <ul className="header__section header__section--login">
            <li className="header__item">
              <a className="header__item--link" href="#">
                <i className="fa fa-user" />
              </a>
            </li>
          </ul>

        </div>
        { children }
      </header>
    )
  }
}

Header.propTypes = {
  children: React.PropTypes.node
}

Header.defaultProps = {
  children: null
}
