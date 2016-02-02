import React from 'react'
import MenuItem from './MenuItem'
import SearchForm from './SearchForm'
import Button from './Button'
import classNames from 'classnames'
import Overlay from './Overlay'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { _search: { _input }, props: { apiActions }} = this
    apiActions.loadSearch(_input.value, false)
  }

  render() {
    const {
      apiActions,
      uiActions,
      genre,
      genreList,
      searchModal,
      navbar
    } = this.props

    const shouldExpandOverlay = classNames('modal__overlay', {
      'modal__overlay--open': searchModal.isOpen
    })
    const shouldStick = classNames('nav', {
      'nav--sticky': navbar.isSticky
    })
    const refNavbar = ref => this._navbar = ref
    const search = ref => this._search = ref

    const menuItems = genreList.map((item, index) => {
      const active = classNames('nav__link', { 'nav__link--active': genre === item })

      return (
        <li
          className="nav__item"
          key={ `nav__${index}_${item}` }
        >
          <MenuItem
            componentClass={ active ? active : null }
            genre={ item }
            loadGenre={ apiActions.loadGenre }
          >
            { item }
          </MenuItem>
        </li>
      )
    })

    return (
      <nav
        className={ shouldStick }
        ref={ refNavbar }
      >
        <div className="nav__container">
          <ul className="nav__section nav__section--menu">
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
  apiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genre: React.PropTypes.string,
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  navbar: React.PropTypes.shape({
    isSticky: React.PropTypes.bool.isRequired
  }),
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
