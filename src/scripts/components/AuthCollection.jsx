import React, { PropTypes } from 'react'
import Card from 'components/Card'
import Loader from 'components/Loader'

export default function AuthCollection(props) {
  const { auth } = props

  if (auth.result.isAuthorizing) {
    return <Loader className="loader--top" />
  }

  return (
    <div className="collections">
      <section className="collection">
        <h5 className="collection__head">{ "Tracks" }</h5>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
      <section className="collection">
        <h5 className="collection__head">{ "Playlists" }</h5>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
      <section className="collection">
        <h5 className="collection__head">{ "Favorites" }</h5>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  )
}

AuthCollection.propTypes = {
  auth: PropTypes.object.isRequired
}
