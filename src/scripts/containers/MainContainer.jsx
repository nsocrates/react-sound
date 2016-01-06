import React from 'react'
import Main from 'components/Main'

export default class MainContainer extends React.Component {
  render() {
    return (
      <Main {...this.props} />
    )
  }
}
