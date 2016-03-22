import React, { PropTypes } from 'react'

import MediaCards from 'components/MediaCards'
import Loader from 'components/Loader'

export default function AuthCollection(props) {
  const {
    entities,
    dispatch,
    audioIsPlaying,
    streamTrackId,
    auth: { collection, result }
  } = props

  if (result.isAuthorizing) {
    return <Loader className="loader--top" />
  }

  const renderCardCollection = kind => {
    let isPlaylist = false
    let mediaEntity = entities.tracks
    let ids = collection.tracks.ids

    if (kind === 'playlists') {
      isPlaylist = true
      mediaEntity = entities.playlists
      ids = collection.playlists.ids
    }

    return (
      <MediaCards
        className="cards"
        collectionIds={ ids }
        dispatch={ dispatch }
        ids={ ids }
        isPlaying={ audioIsPlaying }
        isPlaylist={ isPlaylist }
        maxCards={ 6 }
        maxTags={ 5 }
        mediaEntity={ mediaEntity }
        streamTrackId={ streamTrackId }
        userEntity={ entities.users }
      />
    )
  }

  return (
    <div className="collections">

      <section className="collection">
        <h5 className="collection__head">{ "Tracks" }</h5>
        { renderCardCollection('tracks') }
      </section>

      <section className="collection">
        <h5 className="collection__head">{ "Playlists" }</h5>
        { renderCardCollection('playlists')}
      </section>

      <section className="collection">
        <h5 className="collection__head">{ "Followings" }</h5>
      </section>

    </div>
  )
}

AuthCollection.propTypes = {
  audioIsPlaying: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  streamTrackId: PropTypes.number.isRequired
}
