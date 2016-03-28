import React, { PropTypes } from 'react'

import Loader from 'components/Loader'
import ArticleContent from 'components/ArticleContent'
import WebProfile from 'components/WebProfile'

export default function UserDescription({
  description = '',
  missing = 'USER DOES NOT HAVE A DESCRIPTION.',
  permaLink = '',
  webProfiles = []
}) {
  if (description === undefined) {
    return <Loader className="loader--bottom" />
  }

  const getService = service => {
    switch (service) {
      case 'facebook':
        return 'fa-facebook'
      case 'instagram':
        return 'fa-instagram'
      case 'youtube':
        return 'fa-youtube'
      case 'twitter':
        return 'fa-twitter'
      default:
        return null
    }
  }

  const renderWebProfiles = () => {
    const profiles = webProfiles.map((item, index) => {
      const { service, url, id } = item
      const icon = getService(service)

      if (!icon) {
        return null
      }

      return (
        <WebProfile
          href={ url }
          iconClassName={ `web-profile__icon fa ${icon}` }
          itemClassName="web-profile__item"
          key={`${id}${index}`}
          linkClassName="web-profile__link"
          text={ service }
          textClassName="web-profile__text"
        />
      )
    }).filter(n => !!n).slice(0, 4)

    return (
      <ul className="web-profiles">
        { profiles }
        <WebProfile
          href={ permaLink }
          iconClassName="web-profile__icon web-profile__icon--soundcloud fa fa-soundcloud"
          itemClassName="web-profile__item"
          linkClassName="web-profile__link"
          text="soundcloud"
          textClassName="web-profile__text"
        />
      </ul>
    )
  }

  return (
    <section className="article article--lg">
      { renderWebProfiles() }
      <ArticleContent
        content={ description }
        missing={ missing }
        wrapperClassName={ "article-wrap" }
      />
    </section>
  )
}

UserDescription.propTypes = {
  description: PropTypes.string,
  missing: PropTypes.string,
  permaLink: PropTypes.string,
  webProfiles: PropTypes.array
}
