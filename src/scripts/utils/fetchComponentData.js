// Function promises to gather all data and dispatch it
export function fetchComponentDataBeforeRender(dispatch, components, locals) {
  const needs = components.reduce((prev, current) => (
    (current.needs || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
      .concat(prev)
    ), [])

  const promises = needs.map(need => dispatch(need(locals)))
  return Promise.all(promises)
}

// Dispatches a list of actions required by React Components
export function fetchNeeds(needs, dispatch, ...theArgs) {
  return needs.map(need => dispatch(need(...theArgs)))
}
