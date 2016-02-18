import React from 'react'
import classNames from 'classnames'
import GlobalEvents from 'utils/GlobalEvents'
import LinkItem from './LinkItem'

export default class SideMenu extends React.Component {

  componentWillMount() {
    GlobalEvents.emit('hideBodyOverflow', true)
  }

  componentWillUnmount() {
    GlobalEvents.emit('hideBodyOverflow', false)
  }

  render() {
    const { actions, requested, genreList } = this.props

    const menuItems = genreList.map((item, index) => {
      const active = classNames('side-menu__list--item', {
        'side-menu__list--item--active': requested.query === item
      })

      const _handleClick = e => {
        e.preventDefault()

        const location = {
          pathname: '#genre',
          query: {
            q: item
          }
        }

        actions.push(location)
        actions.toggleMenu()
      }

      return (
        <LinkItem
          className={ active }
          key={ `side-menu__${index}_${item}` }
          onClick={ _handleClick }
          to="#genre"
        >
          { item }
        </LinkItem>
      )
    })

    return (
      <nav
        className="side-menu__nav"
      >
        <button
          className="side-menu__btn"
          onClick={ actions.toggleMenu }
        >
          <i className="fa fa-times" />
        </button>
        <div className="side-menu__list">
          { menuItems }
        </div>
      </nav>
    )
  }
}

SideMenu.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  isVisible: React.PropTypes.bool.isRequired,
  requested: React.PropTypes.object
}
