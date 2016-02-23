import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'

export function loadCollection(path, query, force = false) {
  if (path === '#genre') {
    return loadGenre(query, force)
  } else if (path === '#search') {
    return loadSearch(query, force)
  }
}
