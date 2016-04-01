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

  const wProps = {
    end: {
      className: 'contact contact--end',
      Type: 'li'
    },
    loader: {
      className: 'contact contact--loader',
      iconClassName: 'contact__loader-icon',
      Type: 'li'
    },
    waypoint: {
      className: 'contact contact--waypoint',
      Type: 'li'
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
              { `${payload.count} ${payload.currentPath}` }
            </h5>

            <ContactList
              className="modal__body"
              hasLoaded={ payload.partition.offset !== -1 }
              ids={ payload.partition.ids }
              userCollection={ userCollection }
              userEntity={ userEntity }
            >
              <WaypointLoader
                endProps={ wProps.end }
                hasMore={ !!payload.partition.next_href }
                isFetching={ payload.partition.isFetching }
                loaderProps={ wProps.loader }
                onEnter={ handleWaypoint }
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
