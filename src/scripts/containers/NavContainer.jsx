import React from 'react'
import Nav from 'components/Nav'
import { connect } from 'react-redux'
import { loadGenre } from 'actions/genre'
import { toggleMenu } from 'actions/sideMenu'

class NavContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleLoadGenre = this.handleLoadGenre.bind(this)
    this.handleToggleMenu = this.handleToggleMenu.bind(this)
  }

  componentWillMount() {
    const { genre } = this.props
    this.handleLoadGenre(genre)
  }

  handleLoadGenre(genre) {
    this.props.loadGenre(genre)
  }

  handleToggleMenu() {
    this.props.toggleMenu()
  }

  render() {
    const { genre, isVisible } = this.props

    return (
      <Nav
        genre={ genre }
        isVisible={ isVisible }
        onLoadGenre={ this.handleLoadGenre }
        onToggleMenu={ this.handleToggleMenu }
      />
    )
  }
}

NavContainer.propTypes = {
  genre: React.PropTypes.string.isRequired,
  isVisible: React.PropTypes.bool.isRequired,
  loadGenre: React.PropTypes.func.isRequired,
  toggleMenu: React.PropTypes.func.isRequired
}

const mapDispatchToProps = {
  loadGenre,
  toggleMenu
}

function mapStateToProps(state) {
  const { requested, isVisible } = state.app

  return {
    isVisible,
    genre: requested
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)
