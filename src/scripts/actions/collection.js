import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { loadTag } from 'actions/tag'

export function loadCollection(path, query, force = false) {
  switch (path) {
    case '#genre':
      return loadGenre(query, force)
    case '#search':
      return loadSearch(query, force)
    case '#tag':
      return loadTag(query, force)
    default:
      return null
  }
}

export function loadCached(args) {
  return Object.assign({}, args, {
    response: {
      result: [],
      next_href: args.next_href || null
    }
  })
}
