import 'isomorphic-fetch'
import constructRoutes from 'routes/routes'
import headconfig from 'components/Meta'
import makeStore from 'store/store'
import React from 'react'
import { fetchComponentDataBeforeRender } from 'utils/fetchComponentData'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'

// Template to serve
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

    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>

    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
  </body>
  </html>
`)

// Exported function to be used by Express
export default function render(req, res) {
  const initialState = {}
  const history = createMemoryHistory()
  const store = makeStore(initialState, history)
  const routes = constructRoutes(store)

  // Pass arguments from Express to router function
  // If a route matches, generate a new Redux Store
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
        const { components, params, location } = renderProps
        const { pathname, query } = location
        const locals = {
          pathname,
          query,
          params
        }

        fetchComponentDataBeforeRender(store.dispatch, components, locals)
          .then(() => {
            const componentHTML = renderToString(InitialView)
            const state = store.getState()

            // Initial state is sent to client
            // Can be accessed through "window.__INITIAL_STATE__"
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
