import React, { PropTypes } from 'react'
import { dtFormatter } from 'utils/formatUtils'

import Collection from 'components/Collection'
import MediaCards from 'components/MediaCards'
import ProfileCards from 'components/ProfileCards'
import WaypointLoader from 'components/WaypointLoader'

export default function CollectionWrapper(props) {
  const {
    entities,
    audioIsPlaying,
    streamTrackId,
    auth,
    handleWaypointEnter,
    pathname
  } = props
  const { likes, stream, playlists } = auth

  function renderStream() {
    return (
      <MediaCards
        className="cards"
        collectionIds={ likes.tracks.ids }
        endMsg="NO STREAMS TO DISPLAY."
        hasLoaded={ stream.offset > 0 }
        ids={ stream.ids }
        isPlaying={ audioIsPlaying }
        maxTags={ 5 }
        mediaEntity={ entities.tracks }
        streamTrackId={ streamTrackId }
        userEntity={ entities.users }
      />
    )
  }

  function appendPlaylists(likedPlaylists) {
    const ownPlaylists = playlists.ids.map(id => {
      const { playlists: playlistEntity } = entities
      return {
        id,
        created_at: playlistEntity[id].created_at
      }
    })
    return likedPlaylists.concat(ownPlaylists)
  }

  function renderCardCollection(kind, maxCards) {
    let mediaEntity = entities.tracks
    let coll = likes.tracks
    let endMsg = 'NO TRACKS IN COLLECTION.'
    let ids = likes.tracks.e1

    if (kind === 'playlists') {
      mediaEntity = entities.playlists
      coll = likes.playlists
      endMsg = 'NO PLAYLISTS IN COLLECTION.'
      ids = appendPlaylists(likes.playlists.e1)
    }

    const idsWithHead = ids.map(item => {
      const date = dtFormatter(item.created_at)
      const head = (
        <section className="card__head">
          <h6 className="card__data">{`Added on ${date}`}</h6>
        </section>
      )

      return Object.assign({}, item, { head })
    })

    return (
      <MediaCards
        className="cards"
        collectionIds={ coll.ids }
        endMsg={ endMsg }
        hasLoaded={ coll.offset > 0 }
        ids={ idsWithHead }
        isPlaying={ audioIsPlaying }
        maxCards={ maxCards }
        maxTags={ 5 }
        mediaEntity={ mediaEntity }
        streamTrackId={ streamTrackId }
        userEntity={ entities.users }
      />
    )
  }

  function renderWaypointLoader(kind) {
    const common = {
      endProps: { className: 'end--bottom' },
      loaderProps: { classname: 'loader--bottom' },
      waypointProps: { className: 'waypoint' }
    }
    const list = likes[kind] || stream
    return (
      !!list.ids.length &&
      <WaypointLoader
        { ...common }
        key={ `${kind}__wp` }
        hasMore={ !!list.next_href }
        isFetching={ list.isFetching }
        onEnter={ handleWaypointEnter }
      />
    )
  }

  function renderComponent() {
    const pcProps = {
      collectionIds: likes.followings.ids,
      endMsg: 'NO FOLLOWINGS IN COLLECTION.',
      hasLoaded: !!likes.followings.offset,
      ids: likes.followings.ids,
      userEntity: entities.users
    }

    switch (pathname) {
      case '/me/stream':
        return ([
          <Collection title="Stream" key={ "stream_wp" }>
            { renderStream() }
          </Collection>,
          renderWaypointLoader('stream')
        ])

      case '/me/tracks':
        return ([
          <Collection title="Tracks" key={ "tracks_wp" }>
            { renderCardCollection('tracks') }
          </Collection>,
          renderWaypointLoader('tracks')
        ])

      case '/me/playlists':
        return ([
          <Collection title="Playlists" key={ "playlists_wp" }>
            { renderCardCollection('playlists') }
          </Collection>,
          renderWaypointLoader('playlists')
        ])

      case '/me/followings':
        return ([
          <Collection title="Followings" key={ "followings_wp" }>
            <ProfileCards { ...pcProps } />
          </Collection>,
          renderWaypointLoader('followings')
        ])

      case '/me/collection':
        return ([
          <Collection title="Tracks" key={ "tracks_collection" }>
            { renderCardCollection('tracks', 6) }
          </Collection>,

          <Collection title="Playlists" key={ "playlists_collection" }>
            { renderCardCollection('playlists', 6)}
          </Collection>,

          <Collection title="Followings" key={ "followings_collection" }>
            <ProfileCards
              { ...pcProps }
              maxCards={ 6 }
            />
          </Collection>
        ])

      default:
        throw new Error(`Invalid pathname: ${pathname}`)
    }
  }

  return (
    <div className="collections">
      { renderComponent() }
    </div>
  )
}

CollectionWrapper.propTypes = {
  audioIsPlaying: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  handleWaypointEnter: PropTypes.func.isRequired,
  pathname: PropTypes.string,
  streamTrackId: PropTypes.number.isRequired
}
