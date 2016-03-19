import React, { PropTypes } from 'react'

import Loader from 'components/Loader'
import ArticleContent from 'components/ArticleContent'

export default function UserDescription({
  description = '',
  missing = 'USER DOES NOT HAVE A DESCRIPTION.'
}) {
  if (description === undefined) {
    return <Loader className="loader--bottom" />
  }

  return (
    <section className="article article--lg">
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
  missing: PropTypes.string
}
