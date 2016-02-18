import React from 'react'
import Button from './Button'
import classNames from 'classnames'
import LinkItem from './LinkItem'
import Overlay from './Overlay'
import SearchForm from './SearchForm'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { _search: { _input }, props: { routeActions }} = this
    const location = {
      pathname: '#search',
      query: {
        q: _input.value
      }
    }

    routeActions.push(location)
  }

  render() {
    const {
      uiActions,
      routeActions,
      requested,
      genreList,
      searchModal,
      navbar
    } = this.props

    const shouldExpandOverlay = classNames('modal__overlay', {
      'modal__overlay--open': searchModal.isOpen
    })
    const shouldStick = classNames('nav menu', {
      'nav--sticky': navbar.isSticky
    })
    const refNavbar = ref => this._navbar = ref
    const search = ref => this._search = ref

    const menuItems = genreList.map((item, index) => {
      const active = classNames('menu__link', { 'menu__link--active': requested.query === item })
      const _handleClick = e => {
        e.preventDefault()

        const location = {
          pathname: '#genre',
          query: {
            q: item
          }
        }

        routeActions.push(location)
      }

      return (
        <li
          className="menu__item menu__item--nav"
          key={ `menu--nav__${index}_${item}` }
        >
          <LinkItem
            className={ active ? active : null }
            onClick={ _handleClick }
            to="#genre"
          >
            { item }
          </LinkItem>
        </li>
      )
    })

    return (
      <nav
        className={ shouldStick }
        ref={ refNavbar }
      >
        <div className="nav__container">
          <ul className="menu__inner menu__inner--nav">
            { menuItems }
          </ul>
          <ul className="nav__section nav__section--bars">
            <li className="nav__bars">
              <Button onBtnClick={ uiActions.toggleMenu }>
                <i className="fa fa-bars" />
              </Button>
            </li>
          </ul>
          <ul className="nav__section nav__section--search">
            <li className="nav__search">
              <Button
                btnClass="modal__portal"
                onBtnClick={ uiActions.toggleModal }
              >
                <i className="fa fa-search" />
              </Button>
              <Overlay
                classNames={ shouldExpandOverlay }
                onOverlayClick={ uiActions.toggleModal }
              />
              <SearchForm
                formClassName="nav__form"
                inputClassName="nav__input"
                onFormSubmit={ this.handleSubmit }
                ref={ search }
              >
                <span className="nav__focus-bar" />
                <i className="fa fa-search" />
              </SearchForm>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  navbar: React.PropTypes.shape({
    isSticky: React.PropTypes.bool.isRequired
  }),
  requested: React.PropTypes.object,
  routeActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  searchModal: React.PropTypes.shape({
    isOpen: React.PropTypes.bool
  }),
  uiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

Nav.defaultProps = {
  searchModal: null
}
