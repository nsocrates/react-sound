import React from 'react'
import Main from 'components/Main'
import LinkItem from 'components/LinkItem'

export default function NotFound() {
  return (
    <Main className="main main__container">
      <div className="error404">

        <h1 className="error404__light">
          { "404 | Not Found" }
        </h1>

        <h3 className="error404__light">
          { "Sorry, this page does not exist." }
        </h3>

        <p>
          { "It appears you may have followed an outdated or broken link.\u00A0" }
          <LinkItem
            className="error404__link"
            to={{ pathname: '/genre', query: { q: 'Trance' } }}
          >
            { "Go back to ReactSound." }
          </LinkItem>
        </p>

      </div>
    </Main>
  )
}
