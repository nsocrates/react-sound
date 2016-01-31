import React from 'react'
import { IMG_FALLBACK } from 'constants/ItemLists'
import classNames from 'classnames'

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="mp-tracks-panel">
        <ul className="mp-track-list">
          <li className="mp-track">
            <img src={ IMG_FALLBACK.SMALL } />
            <div className="mp-track-data">
              <p className="mp-title">{"Concrete Angel (Original Mix)"}</p>
              <p className="mp-user">{"garethemery"}</p>
            </div>
            <div className="mp-track-icons">
              <i className="fa fa-play" />
              <i className="fa fa-heart-o" />
            </div>
          </li>

          <li className="mp-track">
            <img src={ IMG_FALLBACK.SMALL } />
            <div className="mp-track-data">
              <p className="mp-title">{"GBX"}</p>
              <p className="mp-user">{"Stevi Stuksis"}</p>
            </div>
            <div className="mp-track-icons">
              <i className="fa fa-play" />
              <i className="fa fa-heart-o" />
            </div>
          </li>

          <li className="mp-track">
            <img src={ IMG_FALLBACK.SMALL } />
            <div className="mp-track-data">
              <p className="mp-title">{"SpongeBob Travel Time(Original mix)"}</p>
              <p className="mp-user">{"Solis"}</p>
            </div>
            <div className="mp-track-icons">
              <i className="fa fa-play" />
              <i className="fa fa-heart-o" />
            </div>
          </li>

          <li className="mp-track">
            <img src={ IMG_FALLBACK.SMALL } />
            <div className="mp-track-data">
              <p className="mp-title">{"A State Of Trance 2015 (Minimix) [OUT NOW!]"}</p>
              <p className="mp-user">{"Armin van Buuren"}</p>
            </div>
            <div className="mp-track-icons">
              <i className="fa fa-play" />
              <i className="fa fa-heart-o" />
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
