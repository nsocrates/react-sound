export function fetchComponentDataBeforeRender(dispatch, components, locals) {
  const needs = components.reduce((prev, current) => (
    (current.needs || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
      .concat(prev)
    ), [])

  const promises = needs.map(need => dispatch(need(locals)))
  return Promise.all(promises)
}

export function fetchNeeds(needs, dispatch, ...theArgs) {
  return needs.map(need => dispatch(need(...theArgs)))
}
