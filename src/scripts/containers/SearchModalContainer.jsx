import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SearchModal from 'components/SearchModal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleModal } from 'actions/ui'
import { loadSearch } from 'actions/search'

export class SearchModalContainer extends React.Component {
  render() {
    const { actions, searchModal } = this.props

    const shouldRenderModal = () => {
      if (searchModal.isOpen) {
        return (
          <SearchModal actions={ actions }/>
        )
      }
    }

    return (
      <ReactCSSTransitionGroup
        className="modal"
        component="aside"
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionName="modal"
      >
        { shouldRenderModal() }
      </ReactCSSTransitionGroup>
    )
  }
}

SearchModalContainer.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  searchModal: React.PropTypes.shape({
    isOpen: React.PropTypes.bool.isRequired
  })
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleModal,
      loadSearch
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { searchModal } = state.app.ui

  return {
    searchModal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModalContainer)
