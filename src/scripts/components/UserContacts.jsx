import React, { PropTypes } from 'react'

import ContactList from 'components/ContactList'
import Modal from 'components/Modal'
import WaypointLoader from 'components/WaypointLoader'

export default function UserContacts(props) {
  const {
    userCollection,
    userEntity,
    payload,
    handleExit,
    handlePropagation,
    handleWaypoint
  } = props
  const { currentPath, username, partition, count } = payload
  const wProps = {
    end: {
      className: 'contact contact--end',
      text: 'NO MORE USERS TO DISPLAY.'
    },
    loader: {
      className: 'contact contact--loader',
      iconClassName: 'contact__loader-icon'
    },
    waypoint: {
      className: 'contact contact--waypoint'
    }
  }

  return (
    <Modal handleExit={ handleExit }>
      <div className="modal__scroll-wrapper">

        <button className="modal__close">
          <i className="fa fa-times" />
          <span className="reader">{"Close"}</span>
        </button>

        <div className="modal__content-wrapper">
          <section
            onClick={ handlePropagation }
            className="modal__content"
          >

            <h5 className="modal__head">
              { `${username} has ${count} ${currentPath}` }
            </h5>

            <ContactList
              className="modal__body"
              hasLoaded={ partition.offset > 0 }
              ids={ partition.ids }
              userCollection={ userCollection }
              userEntity={ userEntity }
            >
              <WaypointLoader
                endProps={ wProps.end }
                hasMore={ !!partition.next_href && partition.offset > 0 }
                isFetching={ partition.isFetching }
                loaderProps={ wProps.loader }
                onEnter={ handleWaypoint }
                Type="li"
                waypointProps={ wProps.waypoint }
              />
            </ContactList>

          </section>
        </div>
      </div>
    </Modal>
  )
}

UserContacts.propTypes = {
  handleExit: PropTypes.func.isRequired,
  handlePropagation: PropTypes.func.isRequired,
  handleWaypoint: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
  userCollection: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired
}
