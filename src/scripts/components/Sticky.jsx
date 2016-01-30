import React from 'react'

export default class Sticky extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('Sticky.componentDidMount')
  }

  render() {
    const { children } = this.props
    return (
      <div>
        { children }
      </div>
    )
  }
}

Sticky.propTypes = {
  children: React.PropTypes.node
}

Sticky.defaultProps = {
  children: null
}
