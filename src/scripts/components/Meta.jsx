import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'

import config from '../helmConfig.js'

function Meta() {
  return (
    <Helmet
      title={ config.title }
      meta={ config.meta }
      link={ config.link }
    />
  )
}

ReactDOMServer.renderToString(<Meta />)
const header = Helmet.rewind()

export default header
