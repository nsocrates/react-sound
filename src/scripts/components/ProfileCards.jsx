import React, { PropTypes } from 'react'
import End from 'components/End'
import ProfileCardItem from 'components/ProfileCardItem'
import { connect } from 'react-redux'
import { formatCover } from 'utils/formatUtils'
import { getUserLocation } from 'utils/mutationUtils'
import { updateMyFollowings } from 'actions/collection'

function ProfileCards(props) {
  const {
    collectionIds = [],
    dispatch,
    endMsg,
    hasLoaded = false,
    ids = [],
    maxCards = undefined,
    userEntity = {}
  } = props

  if (!ids.length && hasLoaded) {
    return (
      <article className="end-wrapper">
        <End className="end--bottom" text={ endMsg } />
      </article>
    )
  }

  const cardItems = ids.slice(0, maxCards).map((id, index) => {
    if (!userEntity.hasOwnProperty(id)) {
      return null
    }

    const isFollowing = collectionIds.indexOf(id) !== -1
    const { avatar_url, full_name, username, city, country } = userEntity[id]
    const handleFollowings = () => dispatch(updateMyFollowings(id, username))

    return (
      <ProfileCardItem
        avatar={ formatCover(avatar_url).large }
        fullname={ full_name }
        isFollowing={ isFollowing }
        key={`${id}_${index}`}
        location={ getUserLocation(city, country) }
        onClickFollow={ handleFollowings }
        profilePath={`/user/${id}`}
        username={ username }
      />
    )
  })

  return (
    <section className="p-cards">
      { cardItems }
    </section>
  )
}

ProfileCards.propTypes = {
  collectionIds: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  endMsg: PropTypes.string,
  hasLoaded: PropTypes.bool,
  ids: PropTypes.array,
  maxCards: PropTypes.number,
  userEntity: PropTypes.object.isRequired
}

export default connect()(ProfileCards)
