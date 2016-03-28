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
    let coll = collection.tracks
    let endMsg = 'YOU DO NOT HAVE ANY FAVORITED TRACKS.'

    if (kind === 'playlists') {
      isPlaylist = true
      mediaEntity = entities.playlists
      coll = collection.playlists
      endMsg = 'YOU DO NOT HAVE ANY FAVORITED PLAYLISTS.'
    }

    return (
      <MediaCards
        className="cards"
        collectionIds={ coll.ids }
        dispatch={ dispatch }
        endMsg={ endMsg }
        hasHead
        ids={ coll.payload }
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
        <h3 className="collection__head">{ "Tracks" }</h3>
        { renderCardCollection('tracks') }
      </section>

      <section className="collection">
        <h3 className="collection__head">{ "Playlists" }</h3>
        { renderCardCollection('playlists')}
      </section>

      <section className="collection">
        <h3 className="collection__head">{ "Followings" }</h3>
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
