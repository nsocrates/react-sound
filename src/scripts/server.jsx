import constructRoutes from 'routes/routes'
import headconfig from 'components/Meta'
import makeStore from 'store/store'
import React from 'react'
import { fetchComponentDataBeforeRender } from 'middleware/fetchComponentDataBeforeRender'
import { normalize } from 'normalizr'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { Schemas } from 'constants/Schemas'

const renderFullPage = (appContent, initialState, head) => (`
  <!DOCTYPE html>
  <html>
  <head>
    ${head.title}

    ${head.meta}

    ${head.link}
  </head>
  <body>
    <div id="root">${appContent}</div>

    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>

    <script type="text/javascript" charset="utf-8" src="assets/bundle.js"></script>
  </body>
  </html>
`)

function stateFactory({ accessToken, userId, profile }) {
  const myProfile = normalize(profile, Schemas.USER).entities.users

  const constructAuthState = () => ({
    auth: {
      user: {
        accessToken,
        userId,
        error: null,
        isAuthenticated: !!accessToken,
        isAuthenticating: false
      }
    }
  })

  const constructEntityState = () => ({
    entities: {
      playlists: {},
      tracks: {},
      users: myProfile
    }
  })

  return {
    app: Object.assign({}, constructAuthState(), constructEntityState())
  }
}

export default function render(req, res, me) {
  const initialState = me.accessToken ? stateFactory(me) : {}
  const history = createMemoryHistory()
  const store = makeStore(initialState, history)
  const routes = constructRoutes(store)

  match({ routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const InitialView = (
          <Provider store={ store }>
            <RouterContext { ...renderProps } />
          </Provider>
        )

        fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
          .then(() => {
            const componentHTML = renderToString(InitialView)
            const state = store.getState()

            res.status(200).end(renderFullPage(componentHTML, state, {
              title: headconfig.title,
              meta: headconfig.meta,
              link: headconfig.link
            }))
          })
          .catch(() => res.end(renderFullPage('', {})))
      } else {
        res.status(404).send('Not Found')
      }
    })
}
